---
title: pytest命令向测试文件传递自定义参数
date: 2018/10/20 13:46:25
categories: 软件测试
tags: [pytest, 参数]
---

摘要：测试时往往有多个环境，脚本往往会把域名信息进行参数化，这个参数需要我们通过命令行传递，从而确定我们要测试哪个环境。

<!-- more -->

## conftest.py

首先我们需要在测试脚本所在的目录添加`conftest.py`文件，该文件类在`pytest`中似于`unittest`中的`setup`函数，也可以理解为python中的`__init__.py`文件：

```python
import pytest


def pytest_addoption(parser):
    parser.addoption("--vue", action="store", default="0.0.0.0",
                     help="运行环境")
    parser.addoption("--file", action="store", default="xls",
                     help="基础数据")

```

## 测试文件

test_tmp.py主要内容:

```python
@pytest.mark.flaky(reruns=2)
    def test_reruns(self):
        allure.attach('测试环境', pytest.config.getoption("--vue"))
        allure.attach('建模数据', pytest.config.getoption("--file"))
        self.assertEquals(1, 2)
```

## 执行

`python -m pytest ./TestCases/TmpTest --vue=http://192.168.138.191:9080 --file=baseData-191.xls --alluredir ./Reports/test_201_tmp`

## 查看报告

![report](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181017145403.png)

如上图，我们获取到了自定义参数的内容，那么在jenkins中就可以直接通过参数来确定我们要自动构建并测试哪个环境。