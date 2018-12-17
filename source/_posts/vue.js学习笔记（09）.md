---
title: vue.js学习笔记（09）
date: 2018/12/17 09:19:00
categories: [前端, vue.js]
tags: [vue.js]
---

路由

<!-- more -->

# 安装

```powershell
cnpm install vue-router --save
```

# 引入

在`main.js`中增加

```js
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

# 配置

1. 创建并引入组件

   ```js
   import HelloWorld from './components/HelloWorld.vue'
   import Test2 from './components/Test2.vue'
   import Test5 from './components/Test5.vue'
   import Test6 from './components/Test6.vue'
   import Test7 from './components/Test7.vue'
   import Test10 from './components/Test10.vue'
   import Test11 from './components/Test11.vue'
   import Test12 from './components/Test12.vue'
   import Test14 from './components/Test14.vue'
   import Test15 from './components/Test15.vue'
   ```

2. 定义路由：

   ```js
   const routes = [
     { path: '/', component: HelloWorld },
     { path: '/class2', component: Test2 },
     { path: '/class5', component: Test5 },
     { path: '/class6', component: Test6 },
     { path: '/class7', component: Test7 },
     { path: '/class10', component: Test10 },
     { path: '/class11', component: Test11 },
     { path: '/class12', component: Test12 },
     { path: '/class14', component: Test14 },
     { path: '/class15', component: Test15 }
   ];
   ```

3. 创建router实例

   ```js
   const router = new VueRouter({
     routes // (缩写) 相当于 routes: routes
   })
   ```

4. 创建和挂载根实例

   ```js
   new Vue({
     el: '#app',
     router,
     render: h => h(App)
   });
   ```

# 使用

   在根组件`app.vue`增加：

   ```vue
   <router-view></router-view>	# 固定写法
   ```

   在需要跳转的位置新增：

 `<router-link to='路由'></router-link>`

   ```
   <table class="tab">
         <tr>
           <td><router-link to="/">index</router-link></td>
           <td><router-link to="/class2/">class2</router-link></td>
           <td><router-link to="/class5">class5</router-link></td>
           <td><router-link to="/class6">class6</router-link></td>
           <td><router-link to="/class7">class7</router-link></td>
           <td><router-link to="/class10">class10</router-link></td>
           <td><router-link to="/class11">class11</router-link></td>
           <td><router-link to="/class12">class12</router-link></td>
           <td><router-link to="/class14">class14</router-link></td>
           <td><router-link to="/class15">class15</router-link></td>
         </tr>
       </table>
   ```
