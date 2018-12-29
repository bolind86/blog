---
title: vue.js学习笔记（11）
date: 2018/12/26 11:06:00
categories: [前端, vue.js]
tags: [vue.js]
---

嵌套路由

<!-- more -->

路由配置

```js
{ path: '/class21',
      name: 'Test21',
      component: Test21,
      props: {msg: '嵌套路由'},
      children: [
        { path: 'class2', name: 'Test2', component: Test2, props: {msg: '绑定数据 绑定对象 循环数组渲染数据 绑定属性 绑定Html  绑定class  绑定style'} },
        { path: 'class5', name: 'Test5', component: Test5, props: {msg: '双向数据绑定 Vue事件介绍 以及Vue中的ref获取dom节点'} }
      ]
    }
```

页面

```vue
<template>
  <div class="test20">
    <hr>
    <h1>{{msg}}</h1>
    <div class="left">
      <p>左</p>
      <ul>
        <li><router-link to="/class21/class2">class2</router-link></li>
        <li><router-link to="/class21/class5">class5</router-link></li>
      </ul>
    </div>
    <div class="right">
      <p>右</p>
      <router-view> </router-view>
    </div>
  </div>
</template>
```

