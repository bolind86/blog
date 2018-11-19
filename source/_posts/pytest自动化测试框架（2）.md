---
title: pytest自动化测试框架（2）-用例形式
date: 2018/10/20 13:46:25
categories: 软件测试
tags: [pytest, 自动化测试]

---

**摘要：**介绍pytest的初步使用，用例形式

<!-- more -->

## pytest用例查找规则

- 文件名以`test_`开头的`py`文件；

- 以`Test`开头的类；

- 以`test_`开头的方法

  **注意:**所有的目录都需要有`__init__.py`文件

## pytest运行方式

### 执行单独py文件里的用例

```python
pytest test.py
```

### 执行目录下的所有用例

```python
pytest test/
```

### 执行单个用例

```python
pytest test.py::test_a			# 以函数形式
pytest test.py::Test::test_b	# 以类形式
```

## pytest测试框架

pytest支持xUnit形式的测试模型（setUp，tearDown），但是与python自带的unittest仍有差别：

- 模块形式：setup_module/teardown_module
- 函数形式：setup_function/teardown_function
- 类形式：    setup_class/teardown_class
- 方法形式：setup_method/teardown_method

### 函数形式的测试用例

test.py:

```python
from __future__ import print_function


def setup_module(module):
    print('\nsetup_module')


def teardown_module(module):
    print('\nteardown_module')


def setup_function(function):
    print('\nsetup_function')


def teardown_function(function):
    print('\nteardown_funtion')



def test_1():
    print('- test_1')


def test_2():
    print('- test_2')
```

执行`pytest -s test.py`，输出结果如下：

[![iJP9fI.md.png](http://img.qizhenjun.com/TIM截图20180928182003.png)](https://imgchr.com/i/iJP9fI)

可以看出：

`setup_module()`和`teardown_module()`只会在开始测试及测试结束时各运行一次

`setup_function()`和`teardwon_function()`会在每个用例开始前及结束后各运行一次

### 类形式的测试用例

test2.py:

```python
from __future__ import print_function


class TestClass:
    @classmethod
    def setup_class(cls):
        print('\nsetup_class')

    @classmethod
    def teardown_class(cls):
        print('teardown_class')

    def setup_method(self, method):
        print('\nsetup_method()')

    def teardown_method(self, method):
        print('\nteardown_method')

    def test_3(self):
        print('- test_3')

    def test_4(self):
        print('- test_4')

```

执行`pytest -s test2.py`，结果如下：

[![iJPkX8.md.png](http://img.qizhenjun.com/TIM截图20180928183008.png)](https://imgchr.com/i/iJPkX8)

`setup_class`和`teardown_class`只会在类调用前及结束后各运行一次；

`setup_method`和`teardown_method`会在每个用例时都会运行。

**以类形式运行时，类里的用例执行顺序是不会变的**，unittest随机（差评）

### 运行unittest框架模式的用例

pytest也可以直接运行unittest模式的用例：

test3.py:

```python
import unittest


class Test3(unittest.TestCase):

    def delf(self, a):
        print(a)

    @classmethod
    def set_resource(self):
        bb = 'set_resource'
        print(bb)

    @classmethod
    def setUpClass(cls):
        print('\nsetUpclass')
        cls.set_resource()

    def setUp(self):
        print("\nthis is setUp")

    def test_1(self):
        print("test_1")

    def tearDown(self):
        print('this is tearDown')

    def test_2(self):
        print("test_2")

    def test_3(self):
        print("test_3")

    @classmethod
    def tearDownClass(cls):
        print("\ntearDownClass")

```

执行结果如下：

[![iJPF6f.md.png](http://img.qizhenjun.com/TIM截图20180928184708.png)](https://imgchr.com/i/iJPF6f)

