---
title: postman参数设置及引用
categories: 软件测试
tags: [postman]
---

摘要：本文介绍如何在postman中设置参数以及如何如何引用参数。

<!-- more -->

## 参数设置

### 固定参数

进入`manage environments`：

![enviroment](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181020091411.png)

如下图：

![list](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181020091901.png)

`Globals`顾名思义就是所有的`environments`都能使用，即全局变量。

`Add`会添加环境变量：

![add](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181020092129.png)

### 动态参数

![dtr](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181020092335.png)

如上图，发送一个请求后我们需要将这个`token`值设置为参数，

进入`Tests`tab页：

![test](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181020092703.png)

旁边会有很多方法，具体的可以查看说明，

添加如下代码：

```javascript
// 把responseBody转为json字符串
var content = JSON.parse(responseBody);
// 设置环境变量token，供后面的接口引用
pm.environment.set("token", content.data.token);
```

这样，我们就设置了一个名叫`token`的参数，值就是我们要得到的json串中的值：

![p](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181020093050.png)

## 参数引用

参数设置成功后，即在`environments quick look`中能找到该参数，那么那么我们就可以使用

`${参数名}`来引用。