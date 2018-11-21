---
title: Selenium键盘事件
date: 2018/11/19 14:14:25
categories: [软件测试, 自动化测试, UI自动化]
tags: [selenium, 键盘事件]
---

```python
# 引入 Keys 模块
from selenium.webdriver.common.keys import Keys
```

- `send_keys(Keys.BACK_SPACE)` 删除键（BackSpace）
- `send_keys(Keys.SPACE)` 空格键(Space)
- `send_keys(Keys.TAB)` 制表键(Tab)
- `send_keys(Keys.ESCAPE)` 回退键（Esc）
- `send_keys(Keys.ENTER)` 回车键（Enter）
- `send_keys(Keys.CONTROL,‘a’)` 全选（Ctrl+A）
- `send_keys(Keys.CONTROL,‘c’)` 复制（Ctrl+C）
- `send_keys(Keys.CONTROL,‘x’)` 剪切（Ctrl+X）
- `send_keys(Keys.CONTROL,‘v’)` 粘贴（Ctrl+V）
- `send_keys(Keys.F1)` 键盘 F1
- ……
- `send_keys(Keys.F12)` 键盘 F12