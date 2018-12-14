---
title: itchat命令行二维码
date: 2018/11/24 10:46:00
categories: [软件测试, python]
tags: [itchat]
---

### 命令行二维码

通过以下命令可以在登陆的时候使用命令行显示二维码：

```python
itchat.auto_login(enableCmdQR=True)
```

部分系统可能字幅宽度有出入，可以通过将enableCmdQR赋值为特定的倍数进行调整：

```python
# 如部分的linux系统，块字符的宽度为一个字符（正常应为两字符），故赋值为2
itchat.auto_login(enableCmdQR=2)
```

默认控制台背景色为暗色（黑色），若背景色为浅色（白色），可以将enableCmdQR赋值为负值：

```python
itchat.auto_login(enableCmdQR=-1)
```

