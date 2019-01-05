---
title: element表格格式化时间
date: 2019/01/02 10:18:00
categories: [前端, vue.js]
tags: [vue.js, 时间格式化]
---

```vue
<el-table-column
          label="创建时间"
          :formatter="formatter"
          prop="version_createTime">
        </el-table-column>
```

```js
    formatter (row) {
      return new Date(row.version_createTime).toLocaleString()
    },

```

![1](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20190102102032.png)