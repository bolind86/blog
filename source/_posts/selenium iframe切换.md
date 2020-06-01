---
title: selenium iframe切换
date: 2018/11/19 14:39:00
categories: [Python]
tags: [selenium]
---

```python
from selenium import webdriver

driver = webdriver.Chrome()
```

```python
driver.switch_to.frame(id/name属性)
```

```python
element = driver.find_element_by_xpath('......')
driver.switch_to.frame(element)
```

```python
driver.switch_to.parent_frame()	# 返回最外层页面
```

