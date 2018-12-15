---
title: vue.js学习笔记（08）
date: 2018/12/15 16:59:00
categories: [前端, vue.js]
tags: [vue.js]
---

父子组件传值

<!-- more -->

# 父组件向子组件传值

1. 在引用子组件时绑定动态属性；

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

2. 在子组件中接收及引用：

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
       props: ['title', 'run', 'test14']		# 接收父组件数据
   ```


# 父组件主动获取子组件数据和方法

使用`ref`

父组件：

```vue
<button @click="getSon()">获取子组件数据和方法</button>
<son15 ref="son15"></son15>
```

```js
data() {
      return {
        title:'Test15.vue'
      }
    },
    methods: {
      parentRun: function () {
        alert('Test15-function');
      },
      getSon: function () {
        alert('子组件数据：'+this.$refs.son15.title);
        this.$refs.son15.sonRun();
      }
    }
```

子组件：

```js
data() {
      return {
        title: 'Son15'
      }
    },
    methods: {
      sonRun: function() {
        alert('son15-function')
      }
    }
```





# 子组件主动获取父组件数据和方法

`this.$parent.`

```js
methods: {
      getParent: function () {
        alert('父组件数据'+this.$parent.title);
        this.$parent.parentRun();
      }
```

