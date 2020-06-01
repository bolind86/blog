---
title: python中函数和方法的区别
date: 2018/11/01 13:46:25
categories: [Python]
tags: [Python]
---

**摘要：**

<!-- more -->

funcAndMethod.py:

```python
from types import FunctionType, MethodType


class Foo(object):

    def func(self):
        pass

# 实例化
obj = Foo()

# 执行方式一:调用的func是方法
obj.func()

# 执行方式二：调用的func是函数
Foo.func(123)

print('\n', isinstance(obj.func, MethodType))  # True
print(isinstance(Foo.func, FunctionType))     #True
```

**类对象调用func是方法，类调用func是函数**

最大的区别是参数的传递参数，方法是自动传参self，函数是主动传参。