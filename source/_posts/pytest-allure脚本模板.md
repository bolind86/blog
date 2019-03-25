---
title: pytest框架集成allure报告的脚本模板
date: 2018/11/21 15:12:00
categories: [软件测试, 自动化测试]
tags: [allure]
---

```python
# -*- coding:utf-8 -*-

import pytest
import allure
import unittest


@allure.feature('')
class Test(unittest.TestCase):
    @pytest.fixture(scope='module')
    def setUp(self):
        pass

    @allure.story('')
    def test_(self):
        with allure.step(''):
            pass
```

