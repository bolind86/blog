---
title: vue.js学习笔记（06）
date: 2018/12/15 09:29:00
categories: [前端, vue.js]
tags: [vue.js]
---

Vue中创建单文件组件 注册组件  以及组件的使用

<!-- more -->

# 创建单文件组件 注册组件  以及组件的使用

1. 组件存放在`src-components`目录下；

2. 组件名称建议首字母大写；

3. 组件内容：
   1. 模板：`<template></template>`，模板内容必须有一个根节点`<div></div>`
   2. 业务逻辑：`<script></script>`
   3. 样式：`<style></style>`

4. 引入组件：在`script`中引入，`import 组件文件名 from '相对路径（带文件）'`

5. 挂载组件：

   ```vue
   export default {
       data() {
           return {
           }
       }
   	components: {
       	组件别名: 组件文件名 # 别名不能和HTML标签冲突
   	}
   }
   ```

6. 使用组件：

   ```vue
   <template>
       <div>
   		<组件别名></组件别名>
       </div>
   </template>
   ```

7. style作用域：

   ```scss
   <style lang="scss" scoped>	
   <!-- scoped局部作用域 -->
   </style>
   ```


# 组件的生命周期函数

组件挂载、更新、销毁时触发的一系列的方法。

Header.vue

```vue
<template>
  <div class="header">
    <hr>
    <h1>我来组成头部</h1>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      msg: String
    },
    data() {
      return {
      }
    },
    methods: {},
    beforeDestroy: function () {
      console.log('beforeDestroy')
    },
    destroyed: function () {
      console.log('destroyed')
    }
  }
</script>

<style lang="scss" scoped>

</style>

```

Home.vue:

```vue
<template>
  <div class="home">
    <hr>
    <Header v-if="flag"></Header>
    <h2>{{title}}</h2>
    <button @click="update()">update</button>
    <button @click="flag=!flag">加载/卸载头部</button>
  </div>
</template>

<script>
  import Header from './Header.vue'
  export default {
    components: {
      Header
    },
    data() {
      return {
        flag: true,
        title: '生命周期演示'
      }
    },
    methods: {
      update: function () {
        this.msg = Date()
      }
    },
    beforeCreate: function () {
      console.log('beforeCreate')
    },
    created: function () {
      console.log('created')
    },
    beforeMount: function () {
      console.log('beforeMount')
    },
    mounted: function () {
      //请求数据、DOM操作
      console.log('mounted')
    },
    beforeUpdate: function () {
      console.log('beforeUpdate')
    },
    updated: function () {
      console.log('updated')
    },
    beforeDestroy: function () {
      console.log('beforeDestroy')
    },
    destroyed: function () {
      console.log('destroyed')
    }
  }
</script>

<style lang="scss" scoped>

</style>

```

