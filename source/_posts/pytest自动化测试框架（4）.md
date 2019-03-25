---
title: pytest自动化测试框架（4）-报告
date: 2018/10/22 13:46:25
categories: [软件测试, 自动化测试]
tags: [pytest]

---

**摘要：**介绍pytest生成html报告。

<!-- more -->

test5.py：

```python
class Test(object):
    def test_1(self):
        assert 'a' in 'about'

    def test_2(self):
        assert 1 == 1

    def test_3(self):
        assert [0, 1, 2] == [0, 1, 3]

    def test_e4(self):
        assert [1, 2] == [1, 2, 3]
```

## 文本格式的报告

第一篇已经介绍，`--result-log`能够把报告保存到本地：

执行`pytest test5.py --result-log=log.txt`:

[![iJPmkj.md.png](http://img.qizhenjun.com/TIM截图20180929150209.png)](https://imgchr.com/i/iJPmkj)

## JUnitXml格式报告

执行`pytest test5.py --junitxml=log.xml`:

[![iJPZ7Q.md.png](http://img.qizhenjun.com/TIM截图20180929151032.png)](https://imgchr.com/i/iJPZ7Q)

## 将测试报告发送到pastebin服务器

```python
pytest test5.py --pastebin=all       # 上传所有报告
pytest test5.py --pastebin=failed    # 上传错误报告
```



## 生成Html格式报告

安装插件：`pytest-html`

执行：`pytest test5.py --html=log.html`:

[![iJPV0g.md.png](http://img.qizhenjun.com/TIM截图20180929154526.png)](https://imgchr.com/i/iJPV0g)

`--self-contained-html`能够将`css`和`js`文件整合进html。

如果执行报如下错误：

```python
pytest: error: unrecognized arguments: --html=log.html
```

可能是装有多个版本的python引起的。