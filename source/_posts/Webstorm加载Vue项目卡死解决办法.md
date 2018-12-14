---
title: Webstorm加载Vue项目卡死解决办法
date: 2018/12/14 11:49:00
categories: [前端, vue.js]
tags: [webstorm]
---

第一步：`File->Setting->Editor->File Types`中`Ignore files and folders`添加`node_modules`;

![1](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20181214134118.png)

第二步：右键`node_modules`选择`Make Directory as->Excluded`

![2](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20181214134207.png)