---
title: pytest自动化测试框架（3）-fixture
categories: 软件测试
tags: [pytest]

---

**摘要：**介绍pytest特有的用例形式：fixture

<!-- more -->

fixture是以装饰器的形式来控制用例：

> @pytest.fixture(scope='module'),

scope参数有4种形式：

- `function`:每条用例执行

- `class`:每个类执行

- `module`:每个模块执行（函数形式的用例）

- `session`:每个session只执行一次，例如登录


test4.py:

```python
import pytest


@pytest.fixture(scope="module")
def foo(request):
    print('\nfoo setup - module fixture')

    def fin():
        print('\nfoo teardown - module fixture')

    request.addfinalizer(fin)


@pytest.fixture()
def bar(request):
    print('\nbar setup - function fixture')

    def fin():
        print('\nbar teardown - function fixture')

    request.addfinalizer(fin)


@pytest.fixture()
def baz(request):
    print('\nbaz setup - function fixture')

    def fin():
        print('\nbaz teardown - function fixture')

    request.addfinalizer(fin)


def test_one(foo, bar, baz):
    print('\nin test_one()')


def test_two(foo, bar, baz):
    print('\nin test_two()')
```

执行`pytest -s -v test4.py`:

[![iJPEnS.md.png](http://img.qizhenjun.com/TIM截图20180929143917.png)](https://imgchr.com/i/iJPEnS)