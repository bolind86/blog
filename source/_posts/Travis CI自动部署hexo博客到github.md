---
title: Travis CI自动部署Hexo博客到GitHub
date: 2018/11/19 09:46:25
categories: hexo
tags: [hexo, 自动部署, Travis CI]
---



网上教程很多，但还是遇到了各种小坑、大坑、巨坑甚至天坑，研究了一天，共实验56次，最后一万匹草泥马奔腾而过，把坑填平了，必须要发泄一下。

<!-- more -->

# 傻瓜指南

## 准备工作

- 本地搭建好了`hexo`博客
- 使用`hexo d -g`推送到了`github`仓库

## 创建分支

该分支的作用是备份博客源码，本人弄得时候，博客源码、博客静态文件傻傻分不清楚，

- 博客源码：执行`hexo d -g`的目录中所有文件；

- 博客静态文件：我们执行`hexo d -g`后在`github`的`master`分支看到的所有文件。

在本地博客根目录执行如下命令：

```shell
git init	# 初始化仓库
git add .	# 添加所有文件到仓库
git commit -m "init"	# 提交
git branch hexo # 创建本地分支
git checkout hexo # 切换分支
git remote add origin git@github.com:用户名/仓库名.git	# 推送分支
git push -u origin hexo	# 提交到github分支

```

执行以上命令后，我们的`github`博客仓库下可以看到新增了一个`hexo`的分支，内容如下：

![branch](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20181119100018.png)

## Travis CI设置

[网址](https://travis-ci.org)，网上资料很多，设置没有啥坑，这里就不做详细说明，主要就是

1. 用`github`账号登录
2. 在`github`中创建`ssh-key`

![setting](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20181119101347.png)

## .travis.yml（天坑）

该文件需要放到博客根目录，直接给出我的配置：

```yml
os:
  - osx

language: node_js
node_js: stable

cache:
  directories:
    - node_modules

before_install:
  - npm i imagemin-mozjpeg@6.0.0

install:
  - npm install

before_script:
  - git submodule update --remote --merge

script:
  - hexo clean
  - hexo g
after_script:
  - cd public
  - git init
  - git config user.name "qizhenjun"
  - git config user.email "15388511@qq.com"
  - git add .
  - git commit -m "Update docs"
  - git push --force "https://${GH_TOKEN}@${GH_REF}" master:master

branches:
  only:
    - hexo
env:
 global:
   - GH_REF: github.com/bolind86/blog.git

# configure notifications (email, IRC, campfire etc)
# please update this section to your needs!
# https://docs.travis-ci.com/user/notifications/
notifications:
  email:
    - 15388511@qq.com
  on_success: change
  on_failure: always
```

`os: - osx`必须加，否则后续自动部署的时候会出现下面的错误：

```shell
FATAL Something's wrong. Maybe you can find the solution here: http://hexo.io/docs/troubleshooting.html
Error: write EPIPE
    at WriteWrap.afterWrite [as oncomplete] (net.js:799:14)
```

如果不加，即为在`ubuntu`系统中执行自动部署过程，而要解决这个错误需要执行`npm i imagemin-mozjpeg@6.0.0`，资料说`ubuntu`不支持这玩意，所以在上面加速`osx`，即在`mac`系统中执行自动部署过程。

## 自动部署

增加一个md博客文件到`_post`目录下，在博客根目录执行(已经切换到了hexo分支)：

```
git add .
git commit -m "new blog"
git push
```

过一会在Travis CI日志中就可以看到构建过程，完成后访问我们的博客网站就可以看到我们本地新写的博客内容。

## 后续

我们如果换电脑想写博客，不用安装`hexo`环境，执行安装`git`，然后`clone`下`hexo`分支的内容，写完博客后提交到分支，`Travis CI`监测到`hexo`分支更新就会自动帮我们部署。

## 问题

自动部署后，所有的文章都是最新的部署时间，这里网上也有解决办法，不做赘述。