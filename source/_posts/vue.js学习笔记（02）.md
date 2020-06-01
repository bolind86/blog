---
title: vue.js学习笔记（02）
date: 2018/12/14 15:06
categories: [前端, Vue]
tags: [Vue]
---

绑定数据 绑定对象 循环数组渲染数据 绑定属性 绑定Html  绑定class  绑定style

<!-- more -->

# 绑定数据

```vue
<template>
  <div id="app">
    <h1>{{pageTitle}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        pageTitle: '学习页面'
      }
    }
  }
</script>

<style>

</style>

```



# 绑定对象及循环数组

```vue
<template>
  <div id="app">
      <table class="tab">
        <tr>
          <th>接口描述</th>
          <th>接口地址</th>
          <th>请求方法</th>
        </tr>
        <tr v-for="item in interfaces">
          <td>{{item.title}}</td>
          <td>{{item.url}}</td>
          <td>{{item.method}}</td>
        </tr>
      </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        interfaces: [
          {
            title: '订单',
            url: '/ime/planOrder',
            method: 'POST'
          },
          {
            title: '工单',
            url: '/ime/workOrder',
            method: 'GET'
          }
        ]
      }
    }
  }
</script>

<style
  .tab {
    margin:auto
  }
</style>

```



# 绑定属性

```vue
<template>
  <div id="app">
    <p v-bind:title="myTitle">绑定属性</p>
      
    <img :src="imgUrl"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        myTitle: Date().toLocaleString(),
        imgUrl: 'http://img.qizhenjun.com/1.gif'
      }
    }
  }
</script>

<style>
  .padTop {
    padding-top: 50px;
  }
  .box {
    height: 100px;
    width: 100px;
    /*margin:auto;*/
    background-color: black;
  }
</style>

```



# 绑定Html

```vue
<template>
  <div id="app">
    <p v-html="myHtml" ></p>
  </div>
</template>

<script>
  export default {
    data() {
      let imgUrl = 'http://img.qizhenjun.com/1.gif';
      return {
        myHtml: "<a href='" + imgUrl + "'>超链接</a>"
      }
    }
  }
</script>

<style>

</style>

```



# 绑定class

```vue
<template>
  <div id="app">
    <div :class="{'padTop': flag}">
      <table class="tab">
        <tr>
          <th>接口描述</th>
          <th>接口地址</th>
          <th>请求方法</th>
        </tr>
        <tr v-for="(item, key) in interfaces"
            v-bind:class="{'red': key===0, 'blue': key===1}"
        >
          <td>{{item.title}}</td>
          <td>{{item.url}}</td>
          <td>{{item.method}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: true,
        interfaces: [
          {
            title: '订单',
            url: '/ime/planOrder',
            method: 'POST'
          },
          {
            title: '工单',
            url: '/ime/workOrder',
            method: 'GET'
          }
        ]
      }
    }
  }
</script>

<style>
  .padTop {
    padding-top: 50px;
  }
  .tab {
    margin:auto
  }
  .red {
    color: red;
  }
  .blue {
    color: blue;
  }
  }
</style>

```



# 绑定style

```vue
<template>
  <div id="app">
    <div class="box" v-bind:style="{width: boxHeight+'px'}"
    >
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        boxWidth: 300,
        boxHeight: 300
      }
    }
  }
</script>

<style>
  .box {
    height: 100px;
    width: 100px;
    margin:auto;
    background-color: black;
  }
</style>

```

