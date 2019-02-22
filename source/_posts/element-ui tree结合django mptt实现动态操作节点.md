---
title: element-ui tree结合django mptt实现动态操作节点
date: 2019/02/22 14:32:00
categories: [前端, vue.js]
tags: [tree, mppt]
---

### models.py

```python
class ModuleTree(MPTTModel, BaseTable):
    class Meta:
        verbose_name = '树'
        db_table = 'ModuleTree'
    project = models.ForeignKey(Project, verbose_name="所属项目", on_delete=models.CASCADE)
    name = models.CharField(max_length=20, verbose_name="节点名称")
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
```

此处需要注意：

1. `MPPTModel`必须放在前面
2. 自关联的字段名必须为`parent`



### views.py

```python
import json
from mptt.templatetags.mptt_tags import cache_tree_children
from django.http.response import JsonResponse
from django.views.decorators.http import require_http_methods
from citest.models import Project, ModuleTree

# Create your views here.


def get_tree_json(project):
    root_nodes = cache_tree_children(ModuleTree.objects.filter(project=Project.objects.get(name=project)))
    dicts = []
    for n in root_nodes:
        dicts.append(recursive_node_to_dict(n))
    return json.dumps(dicts, indent=4, ensure_ascii=False)


def recursive_node_to_dict(node):
    result = {
        'id': node.pk,
        'label': node.name,
    }
    children = [recursive_node_to_dict(c) for c in node.get_children()]
    if children:
        result['children'] = children
    return result


@require_http_methods(['POST'])
def query_tree(request):
    req = json.loads(request.body.decode())
    project = req.get('filters').get('project')
    response = {}
    try:
        tree = get_tree_json(project)
        response['tree'] = tree
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)


@require_http_methods(['POST'])
def add_node(request):
    req = json.loads(request.body.decode())
    project = req.get('project')
    node = req.get('node')
    pid = node.get('pid')
    name = node.get('name')
    if pid is not None:
        parent = ModuleTree.objects.get(pk=pid)
        ModuleTree.objects.create(name=name, parent=parent, project=Project.objects.get(name=project))
    else:
        ModuleTree.objects.create(name=name, project=Project.objects.get(name=project))
    max_id = ModuleTree.objects.latest('create').pk
    response = {}
    try:
        tree = get_tree_json(project)
        response['tree'] = tree
        response['expanded'] = [max_id]
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)


@require_http_methods(['POST'])
def edit_node(request):
    req = json.loads(request.body.decode())
    project = req.get('project')
    node = req.get('node')
    id = node.get('id')
    name = node.get('name')
    mt = ModuleTree.objects.get(pk=id)
    mt.name = name
    mt.save()
    response = {}
    try:
        tree = get_tree_json(project)
        response['tree'] = tree
        response['expanded'] = [id]
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)


@require_http_methods(['POST'])
def del_node(request):
    req = json.loads(request.body.decode())
    project = req.get('project')
    id = req.get('id')
    mt = ModuleTree.objects.get(pk=id)
    if mt.parent is not None:
        pid = mt.parent.pk
    else:
        pid = None
    response = {}
    if mt.is_leaf_node():
        mt.delete()
    else:
        response['msg'] = '包含子节点无法删除'
        response['error_num'] = 1
        return JsonResponse(response)
    try:
        tree = get_tree_json(project)
        response['tree'] = tree
        response['expanded'] = [pid]
        response['msg'] = 'success'
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)

```



### index.vue

```vue
<template>
  <d2-container :filename="filename">
    <template slot="header">
      <el-select v-model="project"
                 @change="queryModTree"
                 clearable
                 filterable
                 placeholder="请选择项目"
                 size="mini"
                 style="width: 80%"
      >
        <el-option
          v-for="(item, index) in this.$store.state.allProject"
          :key="index"
          :lable="item.project_name"
          :value="item.project_name">
        </el-option>
      </el-select>
    </template>
    <el-button
      v-if="this.project !== ''"
      size="mini"
      @click="append">新增顶级节点
    </el-button>
    <el-tree
      :data="treeData"
      show-checkbox
      accordion
      node-key="id"
      :default-expanded-keys="expanded"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.label }}</span>&nbsp;
        <span class="tree-btn">
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)"><i class="el-icon-plus"></i>
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => edit(data)"><i class="el-icon-edit-outline"></i>
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)"><i class="el-icon-delete"></i>
          </el-button>
        </span>
      </span>
    </el-tree>
    <template slot="footer">
    </template>
    <el-dialog title="编辑节点" :visible.sync="dialogVisible">
      <el-input v-model="form.name" size="mini" style="width:200px"></el-input>
      <el-button
        type="primary"
        size="mini"
        @click="submit">保存
      </el-button>
    </el-dialog>
  </d2-container>
</template>

<script>
import { ProjectQuery } from '@/api/project/project/query.js'
import { QueryTree } from '@/api/tool/tree/query'
import { AddNode } from '@/api/tool/tree/add'
import { EditNode } from '../../../api/tool/tree/edit'
import { DelNode } from '../../../api/tool/tree/del'
import store from '@/store/store.js'
export default {
  name: 'tree',
  store,
  data () {
    return {
      filename: __filename,
      project: '',
      value: null,
      form: {
        id: '',
        name: '',
        pid: 0
      },
      treeData: [],
      expanded: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogVisible: false
    }
  },
  methods: {
    ProjectQuery () {
      ProjectQuery({
        filters: {
          pagInfo: this.pagInfo,
          search: this.search
        }
      }).then(res => {
        if (res.msg === 'success') {
          this.$store.state.allProject = res.list
          this.total = res.total
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(err => {
        this.$message({
          message: err,
          type: 'warning'
        })
      })
    },
    queryModTree () {
      if (this.project === '') {
        this.treeData = []
      } else {
        QueryTree({
          filters: {
            project: this.project
          }
        }).then(res => {
          if (res.msg === 'success') {
            this.treeData = JSON.parse(res.tree)
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    append (data) {
      this.form.id = ''
      this.form.name = ''
      this.form.pid = data.id
      this.dialogVisible = true
    },
    edit (data) {
      this.form.id = data.id
      this.form.name = data.name
      this.form.pid = ''
      this.dialogVisible = true
    },
    submit () {
      if (this.form.id === '') {
        AddNode({
          project: this.project,
          node: this.form
        }).then(res => {
          if (res.msg === 'success') {
            this.treeData = JSON.parse(res.tree)
            this.expanded = res.expanded
            this.$message({
              message: '节点增加成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        EditNode({
          project: this.project,
          node: this.form
        }).then(res => {
          if (res.msg === 'success') {
            this.treeData = JSON.parse(res.tree)
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
      this.dialogVisible = false
    },
    remove (node, data) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DelNode({
          project: this.project,
          id: data.id
        }).then(res => {
          if (res.msg === 'success') {
            this.treeData = JSON.parse(res.tree)
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created: function () {
    this.ProjectQuery()
  }
}
</script>
```



部分文件内容省略。