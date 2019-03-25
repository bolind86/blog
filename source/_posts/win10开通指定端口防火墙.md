---
title: win10提供指定端口给其他电脑访问
date: 2018/11/08 13:46:25
categories: windows
tags: [防火墙]
---

本地部署了一个`jenkins`服务，结果只能`localhost`访问，尝试关闭360无效，关闭本机防火墙后OK，那么问题就出在防火墙上。

<!-- more -->

解决：

进入`控制面板-防火墙设置-高级-入站规则`，

![防火墙](http://img.qizhenjun.com/20.gif)