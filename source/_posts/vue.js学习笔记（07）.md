---
title: vue.js学习笔记（07）
date: 2018/12/15 14:47:00
categories: [前端, Vue]
tags: [Vue]
---

vue-resource 请求数据

<!-- more -->

# vue-source

官方vue插件

## 安装

`cnpm install vue-resource –save`

## 引入

在`main.js`中新增:

```js
import VueResource from 'vue-resource';

Vue.use(VueResource);
```

## 使用

```vue
<template>
  <div class="test12">
    <hr>
    <h1>{{msg}}</h1>
    <button @click="getData()">请求数据</button>
    <table>
      <tr>
        <th>标题</th>
        <th>图片</th>
      </tr>
      <tr v-for="item in dataList">
        <td>{{item.title}}</td>
        <td><{{item.pic}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'test12',
    props: {
      msg: String
    },
    data() {
      return {
        dataList: '',
      }
    },
    methods: {
      getData: function () {
        let api = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
        this.$http.get(api).then(
          function (resp) {
            this.dataList = '';
            this.dataList = resp.body.result;
            console.log(this.dataList);
          },
          function (err) {
            console.log(err);
          }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

```



# axios

## 安装

`cnpm install axios --save`

## 引入

哪里用哪里引入

```js
import Axios from 'axios';
```

## 使用

```js
getDataByAxios: function () {
        let api = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=2';
        Axios.get(api).then((resp) => {
          this.dataList = resp.data.result;
        }).catch((err) => {
          console.log(err)
        })
      }
```



# fetch-jsonp

略