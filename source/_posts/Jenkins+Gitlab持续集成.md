---
title: Jenkins+Gitlab持续集成
date: 2018/10/13 13:46:25
categories: [软件测试, jenkins]
tags: [Jenkins]

---

**摘要：**GitLab是一个代码管理仓库，Jenkins是一个自动化服务器，可以运行各种自动化构建、测试或部署任务。所以这两者结合起来，就可以实现自动运行测试、构建和部署的任务。

<!-- more -->

# 将项目同步到GitLab

## 创建项目

![iYyNA1.gif](http://img.qizhenjun.com/7.gif)

创建完成后复制`http`形式的项目地址。

## 拉取项目

![iY6Su4.gif](http://img.qizhenjun.com/8.gif)

## Pycharm设置Version Control

![iY6G28.gif](http://img.qizhenjun.com/9.gif)

后续push操作是需要对应的账号权限的，这里设置的账号在gitlab中必须有push权限，当然我们自己创建的项目默认就有权限。

## Push代码

![iY6Ubj.gif](http://img.qizhenjun.com/10.gif)

查看gitlab项目

![gl](http://img.qizhenjun.com/TIM图片20181010143255.png)

确认我们的代码已经同步到GitLab。

# Jenkins设置

## 安装Git、GitLab插件

![iYcfOg.gif](http://img.qizhenjun.com/11.gif)

部分插件完成后需要重启Jenkins。

## 配置GitLab插件

在gitlab中创建token

![iYgR41.gif](http://img.qizhenjun.com/12.gif)

复制该token值留用，

![iY2iUs.gif](http://img.qizhenjun.com/13.gif)

## 生成访问GitLab的ssh密钥

我们需要在运行脚本的测试服务器创建密钥，访问gitlab拉去最新的脚本时需要，

1. linux创建密钥的方法：

> ```shell
> ssh-keygen -t rsa
> ```

> ```shell
> cat ~/.ssh/id_rsa.pub
> ```

拷贝以上密钥内容

![ssh-key](http://img.qizhenjun.com/TIM截图20181010150900.png)

## Source Code Management

配置源码管理

![iYReJI.gif](http://img.qizhenjun.com/14.gif)

## 安装jenkins  `ssh`插件

![ssh](http://img.qizhenjun.com/TIM截图20181010152143.png)

## 添加凭据

![iYWnAJ.gif](http://img.qizhenjun.com/15.gif)

## 配置ssh remote hosts

![iYWuN9.gif](http://img.qizhenjun.com/16.gif)

## Build设置

![iYWouT.gif](http://img.qizhenjun.com/17.gif)

> 注意：测试服务器即需要拉取项目的机器需要安装git

至此，全部设置完成，可以尝试构建啦！！！