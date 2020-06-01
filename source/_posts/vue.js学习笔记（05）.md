---
title: vue.js学习笔记（05）
date: 2018/12/14 16:07:00
categories: [前端, vVue]
tags: [Vue]
---

事件结合双向数据绑定实现toDoList以及持久化

<!-- more -->

# toDoList实现

```vue
<template>
  <div id="app">
    <label>
      <input type="text"  v-model="toDo" placeholder="请输入内容" @keyup="add($event)"/>
      <button @click="add('add')">添加</button>
    </label>

    <table class="tab create">
      <tr>已创建</tr>
      <tr v-for="(item, key) in toDoList" v-if="!item.checked && item.status === 10">
        <td>
          <label>
            <input type="checkbox" v-model="item.checked"/>
          </label>
        </td>
        <td>{{item.title}}</td>
        <td>
          <button @click="del(key)">删除</button>
        </td>
      </tr>
      <tr><hr></tr>
    </table>
    <table class="tab doing">
      <tr>进行中</tr>
      <tr v-for="(item, key) in toDoList" v-if="item.checked && item.status === 10">
        <td>
          <label>
            <input type="checkbox" v-model="item.checked"/>
          </label>
        </td>
        <td>{{item.title}}</td>
        <td>
          <button @click="finish(key)">完工</button>
          <button @click="del(key)">删除</button>
        </td>
      </tr>
      <tr><hr></tr>
    </table>
    <table class="tab finish">
      <tr>已完成</tr>
      <tr v-for="(item, key) in toDoList" v-if="item.status === 30">
        <td>{{item.title}}</td>
        <td>
          <button @click="reDo(key)">返工</button>
          <button @click="del(key)">删除</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        toDo: '',
        toDoList: [],
      }
    },
    methods: {
      add: function (e) {
        const info = {
          title: this.toDo,
          checked: false,
          status: 10
        };
        if (e.key === 'Enter' || e === 'add'){
          this.toDoList.push(info);
          this.toDo = ''
        }
      },
      del: function (key) {
        // alert(key)
        this.toDoList.splice(key, 1)
      },
      finish: function (key) {
        this.toDoList[key].status = 30;
      },
      reDo: function (key) {
        this.toDoList[key].status = 10;
      }
    }
  }
</script>

<style>
  TABLE
  {
    MARGIN: 1px;
    padding: 0;
    border: 1px solid #92c4f8;
    border-right-width: 0;
    border-bottom-width: 0;
  }
  TD
  {
    MARGIN: 1px;
    padding: 0;
    border: 0 solid #92c4f8;
    border-right-width: 1px;
    border-bottom-width: 1px;
    FONT-FAMILY: Verdana, Geneva, Arial, Helvetica, sans-serif;
    HEIGHT: 27px;
    TEXT-DECORATION: none
  }
  .tab {
    margin:auto
  }
  .create {
    background-color: #f7f7ff;
  }
  .doing {
    background-color: #1be189;
  }
  .finish {
    background-color: grey;
  }

</style>

```

# 持久化及封装

在`src`下新建`model`目录，`model`目录下新建`storage.js`:

```javascript
//封装localStorage
var storage = {
  set: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: function (key) {
    return JSON.parse(localStorage.getItem(key));
  },
  del: function (key) {
    localStorage.removeItem(key);
  }
};

export default storage;

```

修改`vue`文件:

```vue
<template>
  <div id="app">
    <label>
      <input type="text"  v-model="toDo" placeholder="请输入内容" @keyup="add($event)"/>
      <button @click="add('add')">添加</button>
    </label>

    <table class="tab create">
      <tr>已创建</tr>
      <tr v-for="(item, key) in toDoList" v-if="!item.checked && item.status === 10">
        <td>
          <label>
            <input type="checkbox" v-model="item.checked" @change="save()"/>
          </label>
        </td>
        <td>{{item.title}}</td>
        <td>
          <button @click="del(key)">删除</button>
        </td>
      </tr>
      <tr><hr></tr>
    </table>
    <table class="tab doing">
      <tr>进行中</tr>
      <tr v-for="(item, key) in toDoList" v-if="item.checked && item.status === 10" @change="save()">
        <td>
          <label>
            <input type="checkbox" v-model="item.checked"/>
          </label>
        </td>
        <td>{{item.title}}</td>
        <td>
          <button @click="finish(key)">完工</button>
          <button @click="del(key)">删除</button>
        </td>
      </tr>
      <tr><hr></tr>
    </table>
    <table class="tab finish">
      <tr>已完成</tr>
      <tr v-for="(item, key) in toDoList" v-if="item.status === 30" @change="save()">
        <td>{{item.title}}</td>
        <td>
          <button @click="reDo(key)">返工</button>
          <button @click="del(key)">删除</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import storage from '../model/storage.js';
  export default {
    data() {
      return {
        toDo: '',
        toDoList: [],
      }
    },
    methods: {
      add: function (e) {
        const info = {
          title: this.toDo,
          checked: false,
          status: 10
        };
        console.log(this.toDo);
        if ((e.key === 'Enter' || e === 'add') && this.toDo !== ''){
          this.toDoList.push(info);
          this.toDo = ''
        }
        storage.set('info', this.toDoList)
      },
      del: function (key) {
        // alert(key)
        this.toDoList.splice(key, 1);
        storage.set('info', this.toDoList)
      },
      finish: function (key) {
        this.toDoList[key].status = 30;
        storage.set('info', this.toDoList)
      },
      reDo: function (key) {
        this.toDoList[key].status = 10;
        storage.set('info', this.toDoList)
      },
      save: function () {
        storage.set('info', this.toDoList)
      }
    },
    mounted: function () {
      const list = storage.get('info');
      if (list) {
        this.toDoList = list;
      }
    }
  }
</script>

<style>
  TABLE
  {
    MARGIN: 1px;
    padding: 0;
    border: 1px solid #92c4f8;
    border-right-width: 0;
    border-bottom-width: 0;
  }
  TD
  {
    MARGIN: 1px;
    padding: 0;
    border: 0 solid #92c4f8;
    border-right-width: 1px;
    border-bottom-width: 1px;
    FONT-FAMILY: Verdana, Geneva, Arial, Helvetica, sans-serif;
    HEIGHT: 27px;
    TEXT-DECORATION: none
  }
  .tab {
    margin:auto
  }
  .create {
    background-color: #f7f7ff;
  }
  .doing {
    background-color: #1be189;
  }
  .finish {
    background-color: grey;
  }

</style>

```

