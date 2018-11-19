---
title: Linux压缩及解压
date: 2018/10/15 13:46:25
categories: linux
tags: [linux, 压缩, 解压]
---

linux压缩及解压命令。

<!-- more -->

# 压缩

- `tar –cvf jpg.tar *.jpg` 将目录里所有`jpg`文件打包成`tar.jpg`

- `tar –czf jpg.tar.gz *.jpg`将目录里所有`jpg`文件打包成`jpg.tar`后，并且将其用`gzip`压缩，生成一个`gzip`压缩过的包，命名为`jpg.tar.gz`

- `tar –cjf jpg.tar.bz2 *.jpg`将目录里所有`jpg`文件打包成`jpg.tar`后，并且将其用`bzip2`压缩，生成一个`bzip2`压缩过的包，命名为`jpg.tar.bz2`

- `tar –cZf jpg.tar.Z *.jpg`将目录里所有`jpg`文件打包成`jpg.tar`后，并且将其用`compress`压缩，生成一个`umcompress`压缩过的包，命名为`jpg.tar.Z`

# 解压

- `tar –xvf file.tar`解压`tar`包

- `tar -xzvf file.tar.gz`解压`tar.gz`

- `tar -xjvf file.tar.bz2`解压 `tar.bz2`

- `tar –xZvf file.tar.Z`解压`tar.Z`

总结

1. `*.tar`用 `tar –xvf`解压

2. `*.gz` 用 `gzip -d`或者`gunzip`解压

3. `*.tar.gz`和`*.tgz` 用 `tar –xzf` 解压

4. `*.bz2` 用 `bzip2 -d`或者用`bunzip2` 解压

5. `*.tar.bz2`用`tar –xjf `解压

6. `*.Z` 用 `uncompress` 解压

7. `*.tar.Z` 用`tar –xZf` 解压