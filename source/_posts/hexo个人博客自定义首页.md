---
title: hexo个人博客自定义首页
date: 2018/10/08 13:46:25
categories: hexo
tags: [nexT, 首页]

---

**摘要：**我们用自己的域名绑定了hexo+github搭建的个人博客后发现有点浪费我们的一级域名，那么如何自定义一个首页呢？

<!-- more -->

## github新建repository

这里我们起名字叫：blog，然后开启github pages，位置：

setting->GitHub Pages

复制该仓库地址。

## 修改站点配置文件_config.yml

```yml
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://qizhenjun.com/blog					# url后需要加：/刚才创建的仓库名
root: /blog/								   # root修改为：/刚才创建的仓库名/
#permalink: :year/:month/:day/:title/
permalink: :title.html
permalink_defaults:
```

```yml
deploy:
- type: git
  repo: https://github.com/bolind86/blog.git	# 修改为新建的仓库地址
  branch: master
```

## 重新部署

先删除之前绑定域名的`CNAME`文件，否则会解析失败，然后执行：

```shell
hexo d -g
```

这时候取看setting-GitHub Pages会发现访问地址如下：

![url](http://img.qizhenjun.com/TIM%E5%9B%BE%E7%89%8720181012092340.png)

## 自定义首页上传

先重新克隆一份原来仓库的代码：

```shell
git clone http://用户名.github.io.git
```

然后删除所有文件（`CNAME`文件不要删除），复制你的自定义首页及样式到clone的文件夹，然后执行：

```shell
git add
git commit -m "custom index"
git push origin master
```

再次访问我们原来的域名：

![index](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181012093302.png)

博客地址只需要在指定href为：域名/blog即可。