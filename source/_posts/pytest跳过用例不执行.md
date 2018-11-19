---
title: pytest跳过用例不执行
date: 2018/11/11 13:46:25
categories: [软件测试, 自动化测试]
tags: [pytest, 自动化测试]
---

`pytest`可以通过`mark`标记，然后通过命令行参数来确定哪些用例执行，还有另一种不需要命令行带参数的方法。

<!-- more -->

## skip

```python
@pytest.mark.skip(reason='该版本不考虑')
@allure.feature('逆向无限')
class TestSchedule(unittest.TestCase):
    """
    BaseParams: 基础参数
    DispatchingRule: 分派规则
    Calendar: 日历
    CalendarShifts: 日历班次
    Material: 物料对象
    RouteLine: 工艺路线对象
    Operation: 工序对象
    Resource: 资源对象
    OperationResource: 工序资源对象
    OperationWorkRelation: 工序加工关系
    Schedule: 排程对象
    """

    @pytest.fixture(scope="module")
    def setUp(self):
        pass
```

## skipif

```python
@pytest.mark.skipif(sys.version_info < (3,6),
                    reason="requires python3.6 or higher")
def test_function():
    ...
```

放在`class`中就控制整个`class`中的测试用例，放在`def`中就控制单独的测试用例。

