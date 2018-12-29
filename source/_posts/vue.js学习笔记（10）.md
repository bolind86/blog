---
title: vue.js学习笔记（10）
date: 2018/12/26 10:23:00
categories: [前端, vue.js]
tags: [vue.js]
---

编程式导航以及hash模式

<!-- more -->

# 编程式导航

```js
methods: {
    go_project: function () {
      this.$router.push({path: '/project'})		# path路由跳转
    },
    go_version: function () {
      this.$router.push({name: 'Version'})		# 命名路由跳转，需在路由中设置name属性
    }
  }
```

# hash模式及history模式

默认为hash模式，地址带有#

history模式：

```js
export default new Router({
  mode: 'history',		# 改为history模式
  routes: [
    // CITest
    { path: '*', redirect: '/' }
  ]
})
```

