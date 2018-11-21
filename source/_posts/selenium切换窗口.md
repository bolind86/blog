---
title: selenium切换窗口
date: 2018/11/19 14:47:00
categories: [软件测试, 自动化测试, UI自动化]
tags[selenium, 窗口切换]
---

测试过程中如果出现点击一个链接打开了新页面，那么如何定位元素呢？此时便需要用到窗口切换。

```python
from selenium import webdriver
```

```python
# 获得窗口句柄
current_windows = driver.current_window_handle
```

```python
# 获得当前所有打开的窗口的句柄
all_handles = driver.window_handles
```

```python
# 切换窗口
for handle in all_handles:
	driver.switch_to.window(handle)
```

