---
title: python selenium中的三种元素等待方式
categories: 软件测试
tags: [selenium]
---

selenium中经常出现`NoSuchElementException: Unable to locate element`的错误，导致的原因要么是定位错误，要么是元素未加载出来，下面介绍三种元素等待的方式。

<!-- more -->

# 强制等待

该种方式简单粗暴，最傻瓜：

```python
from time import sleep
# 进入生产订单列表页面
self.browser.find_element_by_xpath(prod.scgl).click()
sleep(2)
self.browser.find_element_by_xpath(prod.scdd).click()
```

# 隐式等待

指定最长的等待时间，如果时间内元素出现则立即执行，如果元素未出现则抛出异常：

```python
from selenium import webdriver

driver = webdriver.Firefox()
driver.implicitly_wait(30)  # 隐性等待，最长等30秒
driver.get('https://www.baidu.com')
```

# 显示等待

`WebDriverWait`能够根据条件灵活等待，每隔一段时间检查一次元素是否出现，如果出现则继续执行，如果在等待的最大时间未出现则抛出异常：

```python
# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()
driver.implicitly_wait(10)  # 隐性等待和显性同时用，等待的最长时间取两者之中的大者
driver.get('https://www.baidu.com')
locator = (By.LINK_TEXT, '百度贴吧')

try:
    WebDriverWait(driver, 10, 0.5).until(EC.presence_of_element_located(locator))
    driver.find_element_by_link_text('百度贴吧').click()
finally:
    driver.close()
```

