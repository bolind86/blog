---

title: pytest自动化测试框架（5）-Allure生成漂亮的HTML图形化测试报告
date: 2018/10/23 13:46:25
categories: 软件测试
tags: [pytest, 自动化测试]

---

**摘要：**

- 将Allure与Pytest测试框架相结合； 

- 执行测试之后，生成Allure格式的测试报告。

<!-- more -->

# pytest框架集成Allure

## 安装Allure Pytest Adaptor

Allure Pytest Adaptor是pytest的一个插件，只需执行

`pip install pytest-allure-adaptor`

即可安装。

## 使用Allure Pytest Adaptor改造基于Pytest的测试用例

test_1.py:

```python
import allure

@allure.feature('比较')
class TestCases(object):

    @allure.story('整形比较')
    def test_1(self):
        assert 1 == 1

    @allure.story('字符串比较')
    def test_2(self):
        assert '1' == '1'

    @allure.story('列表比较')
    def test_3(self):
        assert [1, 2, 3] == [1, 2]

    @allure.story('元组比较')
    def test_4(self):
        assert (1, 2) in (1, 2, 3)

```
- @allure.severity("critical")               # 优先级，包含blocker, critical, normal, minor, trivial 几个不同的等级

- @allure.feature("测试模块_demo1")           # 功能块，feature功能分块时比story大,即同时存在feature和story时,feature为父节点

- @allure.story("测试模块_demo2")             # 功能块，具有相同feature或story的用例将规整到相同模块下,执行时可用于筛选

- @allure.issue("BUG号：123")                 # 问题表识，关联标识已有的问题，可为一个url链接地址

- @allure.testcase("用例名：测试字符串相等")      # 用例标识，关联标识用例，可为一个url链接地址

- @pytest.mark.parametrize("para_one, para_two",              # 用例参数

  [("hello world", "hello world"),   # 用例参数的参数化数据

  (4, 4),

  ("中文", "中文")],

  ids=["test ASCII string",          # 对应用例参数化数据的用例名

  "test digital string",

  "test unicode string"])

- with allure.step # 用于将一个测试用例，分成几个步骤在报告中输出

- allure.attach # 用于向测试报告中输入一些附加的信息，通常是一些测试数据信息

- @pytest.allure.step # 用于将一些通用的函数作为测试步骤输出到报告，调用此函数的地方会向报告中输出步骤




> 注意：文件名一定要以`test_`开头，否则后续执行的时候会找不到用例，本人在此处踩坑了。

## 生成报告

执行：`pytest 用例目录 --alluredir 报告目录`

在报告目录下会生成`xml`格式的报告：

![iJPMpq.png](http://img.qizhenjun.com/TIM截图20180929180542.png)

生成`html`格式的报告，需要下载[allure-command](https://github.com/allure-framework/allure1/releases/download/allure-core-1.5.2/allure-commandline.zip)工具，解压后将bin目录加入环境变量Path，此处省略，然后在命令行执行：

```python
allure generate report目录 -o html目录
```

之后在html目录下会生成html报告相关的文件，

1. 使用pycharm：open in browser打开index.html:

[![iJPnts.md.png](http://img.qizhenjun.com/TIM截图20180929181214.png)](https://imgchr.com/i/iJPnts)

2. 使用命令打开报告：

   `allure serve ./report/`生成报告的步骤可以省略，只需要运行测试生成了xml文件即可直接打开。

