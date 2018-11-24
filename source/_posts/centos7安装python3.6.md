---
title: centos7安装python3.6
date: 2018/11/24 09:13:00
categories: [linux, centos]
tags: [centos7, python3.6]
---

网上教程一大把，真是坑了爹，各种问题。

<!-- more -->

### 安装wget

`yum install wget`

### 安装依赖包

```shell
yum install gcc		# 依赖包一定要装，否则编译出错
yum install zlib*
yum install openssl-devel
```

### 下载python3.6

```shell
cd /tmp
wget https://www.python.org/ftp/python/3.6.5/Python-3.6.5.tgz
```

### 解压

`tar -zxvf Python-3.6.5.tgz`

### 安装

```shell
cd Python-3.6.5
./configure --with-ssl	# 参数很重要，不加后面各种问题
make && make install
```

### 建立软链接

```shell
ln -s /usr/local/bin/python3 /usr/bin/python3	# 软链接需要使用绝对路径
ln -s /usr/local/bin/pip3 /usr/bin/pip3	
```

### 升级pip3

`pip3 install --upgrade pip`

完美结束。