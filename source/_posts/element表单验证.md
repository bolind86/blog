---
title: Element UI表单验证
date: 2019/02/18 09:40:00
categories: [前端, vue.js]
tags: [elementUI]
---

模板内容：
```vue
<el-form :model="form" :rules="rules" ref="form" label-position='right' label-width="80px" size="mini">
        <el-form-item label="启用开关">
          <el-switch
            v-model="form.switchButton"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="任务描述" prop="title">
          <el-input v-model="form.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="待测内容" prop="detail.planList">
          <el-select
            style="width: 100%"
            v-model="form.detail.planList"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择测试计划">
            <el-option
              v-for="(item, index) in allPlanList"
              :key="index"
              :label="item.plan_title"
              :value="item.plan_title">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="定时设置" prop="detail.crontab">
          <el-input v-model="form.detail.crontab" clearable placeholder="请输入crontab表达式"></el-input>
        </el-form-item>
      </el-form>
```



验证规则：

```js
rules: {
        title: [
          { type: 'string', required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        detail: {
          planList: [
            { type: 'array', required: true, message: '请选择计划', trigger: 'change' }
          ],
          crontab: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      },
```

data数据：
```js
form: {
        tId: '',
        switchButton: true,
        title: '',
        detail: {
          planList: [],
          crontab: ''
        }
      }
```

需要注意的地方：

`el-form-item`组件`prop`属性的值需要和`el-form`绑定的数据中的结构一致，否则校验会出现问题。

