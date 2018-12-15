---
title: vue.js学习笔记（08）
date: 2018/12/15 16:59:00
categories: [前端, vue.js]
tags: [vue.js]
---

父子组件传值

<!-- more -->

# 方法

1. 在引用子组件时绑定属性；

   ```vue
   <son1 :title="title" :run="run" :test14="this"></son1>
   # 可以绑定参数、方法、已经整个组件对象
   ```

   ```js
   data() {
         return {
           title:'Test14.vue'
         }
       },
       methods: {
         run: function () {
           alert('Test14-run-function');
         }
       }
   ```

2. 在子组件中引用：

   ```vue
       <p>Son1显示父组件参数：{{title}}</p>
       <button @click="run()">Test14方法</button>
       <button @click="getParent()">获取父组件数据和方法</button>
   ```

   ```js
   data() {
         return {
           title: 'Son1'
         }
       },
       methods: {
         getParent: function () {
           alert(this.test14.title);
           this.test14.run();
         }
       },
       props: ['title', 'run', 'test14']		# 引入
   ```
