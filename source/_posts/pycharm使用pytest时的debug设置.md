---
title: pycharm设置使用py.test执行或者调试
date: 2018/11/21 09:47:00
categories: 软件测试
tags: [py.test]
---

`pycharm`默认使用`unittest`进行测试及调试，那么如何设置让`pycharm`默认使用`py.test`模式进行测试呢？

<!-- more -->

依次进入`setting-工具-python integrated tools`，现在项目后有一个`Default test runner`，把`unittest`换成`py.test`，大功告成。

![setting1](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20181121095743.png)



另外，如果我们使用`py.test`带参数该如何设置呢？

先进入运行/调试配置：

![path](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20181121100120.png)

依次进入：`Defaults-Python tests-py.test`

![setting2](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20181121100345.png)

`additional arguments`填入要带的参数就可以了。

<font color='red'>需要注意的是，最下面的`Add content roots to PYTHONPATH`和`Add source roots to PYTHONPATH`要取消勾选，否则程序中或上方的参数中有使用相对路径的话，执行会失败。</font>