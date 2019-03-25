---
title: vue.js学习笔记（12）
date: 2018/12/27 09:34:00
categories: [前端, vue.js]
tags: [vue]
---

vuex，不同组件的数据共享

<!-- more -->

其他解决办法：`localstrage`、`sessionstorate`

# 安装

`cnpm install vuex -S`

# 引入

1. `src`目录下新建`vuex`文件夹

2. 新建`store.js`文件

   ```js
   import Vue from 'vue'
   import Vuex from 'vuex'
   
   Vue.use(Vuex)
   
   let state = {
     count: 1
   }
   let mutations = {
     incCount () {
       state.count++
     }
   }
   
   const store = new Vuex.Store(
     {
       state,
       mutations
     }
   )
   export default store
   
   ```

# 使用

`{{this.$store.state.count}}`获取值

`this.$store.commit('incCount')`触发mutations里的方法

Index.vue

```vue
<template>
  <div class="hello">
    {{this.$store.state.count}}
    <el-button @click="addCount">vuex</el-button>
  </div>
</template>

<script>
import store from '../../vuex/store.js'
export default {
  data () {
    return {}
  },
  methods: {
    addCount: function () {
      this.$store.commit('incCount')
    }
  },
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

```

Test.vue

```vue
<template>
  <div class="">
    {{this.$store.state.count}}
    <el-button @click="addCount">vuex</el-button>
  </div>
</template>

<script>
import store from '../../vuex/store.js'
export default {
  data () {
    return {}
  },
  methods: {
    addCount: function () {
      this.$store.commit('incCount')
    }
  },
  store
}
</script>

<style lang="scss" scoped>

</style>

```

