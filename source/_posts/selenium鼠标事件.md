---
title: Selenium鼠标事件
date: 2018/11/19 13:51:25
categories: [软件测试, 自动化测试, UI自动化]
tags: [selenium, 鼠标事件]
---

```python
# 引入 ActionChains 类
from selenium.webdriver.common.action_chains import ActionChains
```

ActionChains 类提供了鼠标操作的常用方法：

- `perform()`： 执行所有 ActionChains 中存储的行为
- `context_click()`： 右击
- `double_click()`： 双击
- `drag_and_drop()`： 拖动
- `move_to_element()`： 鼠标悬停

```python
# 定位到要悬停的元素
element = driver.find_element_by_link_text("菜单")
```

### 鼠标悬停

```python
# 对定位到的元素执行鼠标悬停操作
ActionChains(driver).move_to_element(element).perform()
```

### 右击

```python
ActionChains(driver).context_click(element)
```

### 双击

```python
ActionChains(driver).double_click(element)
```

### 拖动

```python
ActionChains(driver).drag_and_drop(from, to)
```

