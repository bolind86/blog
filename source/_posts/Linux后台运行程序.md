---
title: linux后台运行程序
date: 2019/03/04 17:40:00
categories: [Linux]
tags: [nohup]
---

```shell
nohup python3 test.py > out.log 2>&1 &
```

out.log需要写权限，否则会报权限错误。

