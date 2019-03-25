---
title: git clone GitHub分支上的代码
date: 2018/11/09 14:25:25
categories: [软件测试, git]
tags: [git]
---

```shell
$ cd 目录
$ git clone git@github.com:用户名/仓库名.git
$ cd 仓库目录
$ git branch -a	# 查看所有分支
$ git checkout -b 分支名 origin/分支名	# 切换分支
```

如此，查看仓库目录下即为分支内容。

