---
title: el-table数据筛选
date: 2019/02/14 16:16:00
categories: [前端, Vue]
tags: [Vue]
---

`element ui`中`table`数据筛选示例仅能筛选展示出来的数据，如果要通过筛选条件到后台查询需要稍做调整。

<!-- more -->

第一步：在`el-table`标签中添加`@filter-change='***'`

```vue
<el-table
  :data="interfaceList"
  @selection-change="handleSelectionChange"
  @filter-change="filterChange"
  style="width: 100%"
  :row-style="rowClass"
>
```

第二步：在`el-table-column`标签中添加`:column-key="'***'"`，并删除`:filter-method="***"`

```vue
<el-table-column
  label="标签"
  :show-overflow-tooltip="true"
  :filters=this.tags
  :column-key="'tags'"
  width="100"
  prop="tag">
```

第三部：获取筛选数组

```js
filterChange (filters) {
  this.tagFilter = filters.tags	# tags为:column-key绑定的值
  this.interfaceQuery()
},
```