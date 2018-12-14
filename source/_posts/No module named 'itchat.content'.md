---
title: No module named 'itchat.content'
date: 2018/11/24 10:41:00
categories: [软件测试, python]
tags: [itchat]
---

`python`运行脚本报错：

```cmd
Traceback (most recent call last):
File "./itchat.py", line 1, in 
import itchat,sys
File "/data/python/itchat.py", line 2, in 
from itchat.content import *
ModuleNotFoundError: No module named 'itchat.content'; 'itchat' is not a package
```

导致问题的原因：

一：有多个python环境，需要确定用的哪一个

二：脚本不能以itchat命名，目录最好也不要用itchat