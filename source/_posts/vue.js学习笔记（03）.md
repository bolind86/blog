---
title: vue.js学习笔记（03）
date: 2018/12/14 15:36:00
categories: [前端, Vue]
tags: [Vue]
---

双向数据绑定 以及Vue中的ref获取dom节点

<!-- more -->

# 双向数据绑定

```vue
<template>
  <div id="app">
    <label>input1:
      <input type="text" v-model="address" placeholder="请输入内容"/>
    </label>
    <p>{{address}}</p>
    <button v-on:click="getAddress()">获取input1输入框数据</button>
    <button v-on:click="setAddress()">设置input1输入框数据</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        address: ''
      }
    },
    methods: {
      getAddress: function () {
        alert(this.address)
      },
      setAddress: function () {
        this.address = Date()
      }
    }
  }
</script>

<style>
input {
  width: 350px
}
</style>

```

# ref获取dom节点

```vue
<template>
  <div id="app">
    <h2 ref="address">ref获取dom节点</h2>
    <label>input2:
      <input type="text" ref="info"/>
    </label>
    <button v-on:click="getInfo()">ref获取dom节点数据</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      getInfo: function () {
        this.$refs.address.style.background = 'red';
        alert(this.$refs.info.value)
      }
    }
  }
</script>

<style>
input {
  width: 350px
}
</style>

```

