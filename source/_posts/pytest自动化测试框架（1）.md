---
title: pytest自动化测试框架（1）-初探
date: 2018/10/19 13:46:25
categories: [Python]
tags: [pytest]

---

**摘要：**介绍pytest的安装及简单使用

<!-- more -->

## pytest安装

使用pycharm不能再简单：

[![iJCbSx.md.png](http://img.qizhenjun.com/TIM截图20180928161749.png)](https://imgchr.com/i/iJCbSx)

## 最简单的例子

test.py

```python
def func(x):
    return x + 1


def test_ansower():
    assert func(3) == 5
```

执行`pytest test.py`，结果如下：

[![iJCjmD.md.png](http://img.qizhenjun.com/TIM截图20180928162112.png)](https://imgchr.com/i/iJCjmD)

## -k：执行满足条件的用例

表达式使用python语法，匹配范围：文件名、类名、函数名（变量），以上用and进行连接，例如：

test.py:

```python
class Test(object):
    def test_a(self):
        x = 1
        assert x == 2

    def test_b(self):
        m = 'hello world'
        assert 'd' in m
```

执行：`pytest -k "test and Test and not test_a" test.py`，结果如下：

[![iJCOOO.md.png](http://img.qizhenjun.com/TIM截图20180928163122.png)](https://imgchr.com/i/iJCOOO)

## -x：当遇到错误时停止

执行`pytest -x test.py`，结果：

[![iJPi1P.md.png](http://img.qizhenjun.com/TIM截图20180928163453.png)](https://imgchr.com/i/iJPi1P)

## --maxfail：当错误个数达到指定数量时停止

--maxfail=num

## -m：只运行有相应标识的测试用例

该参数需要使用`@pytest.mark.标识`来修饰方法，

test.py:

```python
import pytest


class Test(object):
    def test_a(self):
        x = 1
        assert x == 2

    @pytest.mark.do
    def test_b(self):
        m = 'hello world'
        assert 'd' in m
```

运行结果：

[![iJCxTH.md.png](http://img.qizhenjun.com/TIM截图20180928164419.png)](https://imgchr.com/i/iJCxTH)

**注意**：-m参数后只能带`""`,`''`无法识别。

多标识表达式：

```python
pytest -m "do or run"		#运行有do或run标识的用例
pytest -m "do and run"		#运行有do和run标识的用例
pytest -m "do and not run"	#运行有do并且没有run标识的用例
```

## --pdb：当遇到错误时进入调试模式

项目中一般不用

## -s：输出print信息

[![iJP9fI.md.png](http://img.qizhenjun.com/TIM截图20180928182003.png)](https://imgchr.com/i/iJP9fI)

## -v，--verbose：详细结果

[![iJPSkd.md.png](http://img.qizhenjun.com/TIM截图20180928170414.png)](https://imgchr.com/i/iJPSkd)

## -q，--quiet：极简结果

[![iJPUhR.md.png](http://img.qizhenjun.com/TIM截图20180928170514.png)](https://imgchr.com/i/iJPUhR)

## --junit-xml：输出xml格式的文件

--junit-xml=path

在与jenkins集成时需要用到

## --result-log：将执行结果保存到本地

--result-log=path

## --reruns：失败重试

`pytest test.py --reruns 2`失败重试2次