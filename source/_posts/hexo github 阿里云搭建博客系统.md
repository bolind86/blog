---
title: hexo github 阿里云搭建博客系统
date: 2018/10/07 13:46:25
categories: hexo
tags: [hexo]

---


**摘要：**使用hexo在本地搭建博客系统后上传到github上，再使用github的域名绑定及阿里云的域名解析即可搭建自己的在线博客系统。

<!-- more -->

# hexo安装
## 安装nodejs
省略

## 安装git
省略

## 使用npm安装hexo
```cmd
npm istall -g hexo-cli
```

# 快速开始
## 初始化项目
进入项目存储目录
```cmd
hexo i blog	//i:init	blog:项目名称
cd blog
hexo g	//g:generetor
hexo s 	//s:server
```

打开浏览器输入：localhost:4000
![iJClee.md.png](http://img.qizhenjun.com/TIM截图20180925172055.png)

## 安装next主题
进入站点根目录
```cmd
git clone https://github.com/iissnan/hexo-theme-next themes/next
```

修改根目录下的站点配置文件：_config.yml：
[![iJC3od.png](https://s1.ax1x.com/2018/10/08/iJC3od.png)](https://imgchr.com/i/iJC3od)

清除缓存后重新生成静态文件并部署
```cmd
hexo clean
hexo g
hexo s
```

主题样式
[![iJC1dH.md.png](http://img.qizhenjun.com/TIM截图20180925172819.png)](https://imgchr.com/i/iJC1dH)

## 配置next样式
[![iJCDoj.png](http://img.qizhenjun.com/TIM截图20180925172554.png)](https://imgchr.com/i/iJCDoj)

```cmd
hexo clean
hexo g
hexo s
```

# 博客保存到github
## 注册github账号
略

## 创建新项目
[![iJCGFA.md.png](http://img.qizhenjun.com/TIM截图20180925173441.png)](https://imgchr.com/i/iJCGFA)

项目名称使用:github账号.github.io
[![iJCJJI.md.png](http://img.qizhenjun.com/ROM44FNCBI.png)](https://imgchr.com/i/iJCJJI)

## hexo站点配置文件修改
![iJCYWt.png](http://img.qizhenjun.com/TIM截图20180925173904.png)
安装插件

```cmd
npm install hexo-deployer-git --save
```

上传到github
```cmd
hexo d
```
访问github网站：

[![iJCUQf.md.png](http://img.qizhenjun.com/PY3~GB%V$%6%Z2HJTS`P@FU.png)](https://imgchr.com/i/iJCUQf)

[![iJCNSP.md.png](http://img.qizhenjun.com/MJT0MQ36HB61Z4X.png)](https://imgchr.com/i/iJCNSP)

# 发布博客
## 创建博客
```cmd
hexo new "我的第一篇博客"
```

生成静态页面并部署
```cmd
hexo g -d
```
[![iJCay8.md.png](http://img.qizhenjun.com/TIM截图20180925174701.png)](https://imgchr.com/i/iJCay8)

# 域名解析
## 购买域名
略

## 备案
略

## 解析设置

在source文件夹下创建`CNAME`文件，没有后缀名，内容为自己的域名，执行

```shell
hexo g
hexo d
```

**方式一：**

![iJC0eg.png](http://img.qizhenjun.com/TIM截图20180925174941.png)

**方式二：**

![iJCTYR.png](http://img.qizhenjun.com/TIM图片20180928112727.png)

## github设置
红框处填写购买的域名
[![iJCyYn.md.png](http://img.qizhenjun.com/TIM截图20180925175056.png)](https://imgchr.com/i/iJCyYn)

在`public`目录下创建名为`CNAME`的文件,没有后缀名,内容为上方的域名,执行

```shell
hexo g
hexo d
```



保存后访问域名（解析有延迟）：
[![iJC6Wq.md.png](http://img.qizhenjun.com/TIM截图20180925174701.png)](https://imgchr.com/i/iJC6Wq)

