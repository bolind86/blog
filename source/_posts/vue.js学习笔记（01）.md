---
title: vue.js学习笔记（01）
date: 2018/12/14 11:28:00
categories: [前端, vue.js]
tags: [vue.js]
---

Vue.js是一套构建用户界面的渐进式框架。

Vue 只关注视图层， 采用自底向上增量开发的设计。

<!-- more -->

# 安装vue-cli

> Vue CLI 的包名称由 `vue-cli` 改成了 `@vue/cli`。 如果你已经全局安装了旧版本的 `vue-cli`(1.x 或 2.x)，你需要先通过 `npm uninstall vue-cli -g` 或 `yarn global remove vue-cli` 卸载它。

```powershell
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

```powershell
vue --version	# 查看版本
```

# 创建项目

```powershell
vue init webpack-simple 项目名（推荐）|| vue init webpack 项目名
cd 项目名
npm install || cnpm install		# 安装依赖
npm run dev		# 启动项目
```



