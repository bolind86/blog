---
title: vue.js学习笔记（04）
date: 2018/12/14 16:03:00
categories: [前端, vue.js]
tags: [vue.js]
---

Vue事件 定义方法 执行方法  获取数据 改变数据 执行方法传值 以及事件对象

<!-- more -->

# 事件

```vue
<template>
  <div id="app">
    <ul>
      <ol v-for="(item, key) in list" v-bind:data-oId="key" @click="eventFun($event)">
        索引{{key}}：{{item}}
      </ol>
    </ul>
    <button @click="run('传值')">执行事件</button>

    <h2>事件对象</h2>
    <button data-oId="but2" @click="eventFun($event)">事件对象</button>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: []
      }
    },
    methods: {
      run: function (val) {
        this.list = [];
        alert(val);
        for(let i=0; i<10; i++){
          this.list.push('第' + i + '条')
        }
      },
      eventFun: function (e) {
        console.log(e);
        console.log(e.srcElement.dataset.oid);
        e.srcElement.style.background='red';
      }
    }
  }
</script>

<style>

</style>

```

