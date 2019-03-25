---
title: allure pytest说明文档
date: 2018/10/04 13:46:25
categories: [软件测试, 自动化测试]
tags: [allure]
---


摘要：allure报告在pytest中的使用说明。

> 原文链接：https://docs.qameta.io/allure/#_pytest

## 6. Python

### 6.1. Pytest

#### 6.1.1. 安装

Pytest可以从PyPI安装，因此建议使用pip安装。要安装最新版本，请从命令行执行:

```shell
$ pip install allure-pytest
```

这将安装`allure-pytest` 和`allure-python-commons` 软件包，以生成与Allure 2兼容的报告数据。如果您正在使用第一版的Allure Report，那么您需要首先卸载它。

#### 6.1.2. 用法

为了使Allure侦听器能够在测试执行过程中收集结果，只需添加`--alluredir`选项并提供结果存储文件夹的路径。 例如：

```shell
$ pytest --alluredir=/tmp/my_allure_results
```

要在测试完成后查看实际的报告，您需要使用Allure命令行实用程序从结果生成报告。

```shell
$ allure serve /tmp/my_allure_results
```

该命令将显示在默认浏览器中生成的报告。

#### 6.1.3. 基础报告

您可以在Allure报告中看到所有默认的pytest状态:只有由于某个断言错误而未成功的测试才会被标记为failed，任何其他异常都会导致测试状态失败。

```python
import pytest

def test_success():
    """this test succeeds"""
    assert True


def test_failure():
    """this test fails"""
    assert False


def test_skip():
    """this test is skipped"""
    pytest.skip('for a reason!')


def test_broken():
    raise Exception('oops')
```

#### 6.1.4. 支持Pytest特性

Allure report支持的一些常见的Pytest特性包括：*xfails*、 *fixtures*、*finalizers*、 *marks*、 *conditional skips* 和*parametrization*.

##### Xfail

这是pytest标记预期为失败的方法: ([Pytest docs](https://docs.pytest.org/en/latest/skipping.html))

```python
@pytest.mark.xfail(condition=lambda: True, reason='this test is expecting failure')
def test_xfail_expected_failure():
    """this test is an xfail that will be marked as expected failure"""
    assert False


@pytest.mark.xfail(condition=lambda: True, reason='this test is expecting failure')
def test_xfail_unexpected_pass():
    """this test is an xfail that will be marked as unexpected success"""
    assert True
```

这将导致跳过测试，并在预期失败时使用特殊标记进行标记。

![Expected xpass failure](https://docs.qameta.io/allure/images/pytest_xpass_expected_failure.png)

特殊标记在描述和特殊标签当它意外地通过。

![Unexpected xpass pass](https://docs.qameta.io/allure/images/pytest_xpass_unexpected_pass.png)

##### 条件标记

在Pytest中，您可以有条件地将测试标记为在某些特定条件下不执行 ([Pytest docs](https://docs.pytest.org/en/latest/skipping.html)):

```python
@pytest.mark.skipif('2 + 2 != 5', reason='This test is skipped by a triggered condition in @pytest.mark.skipif')
def test_skip_by_triggered_condition():
    pass
```

当条件被评估为true时，test将从修饰符接收到报告中的“跳过”状态、标记和描述。

![Conditional skip triggered](https://docs.qameta.io/allure/images/pytest_conditional_skip.png)

##### Fixtures and Finalizers

Fixtures and finalizers 是Pytest分别在测试开始之前和测试结束之后调用的实用函数。 Allure跟踪每个fixture的调用，并详细显示调用了哪些方法和参数，并保留了正确的调用序列。([Pytest docs](https://docs.pytest.org/en/latest/reference.html#id30))

您不需要标记您的fixtures以使它们在报告中可见，它们将自动在不同的范围被检测到。

```python
@pytest.fixture(params=[True, False], ids=['param_true', 'param_false'])
def function_scope_fixture_with_finalizer(request):
    if request.param:
        print('True')
    else:
        print('False')
    def function_scope_finalizer():
        function_scope_step()
    request.addfinalizer(function_scope_finalizer)


@pytest.fixture(scope='class')
def class_scope_fixture_with_finalizer(request):
    def class_finalizer_fixture():
        class_scope_step()
    request.addfinalizer(class_finalizer_fixture)


@pytest.fixture(scope='module')
def module_scope_fixture_with_finalizer(request):
    def module_finalizer_fixture():
        module_scope_step()
    request.addfinalizer(module_finalizer_fixture)


@pytest.fixture(scope='session')
def session_scope_fixture_with_finalizer(request):
    def session_finalizer_fixture():
        session_scope_step()
    request.addfinalizer(session_finalizer_fixture)


class TestClass(object):

    def test_with_scoped_finalizers(self,
                                    function_scope_fixture_with_finalizer,
                                    class_scope_fixture_with_finalizer,
                                    module_scope_fixture_with_finalizer,
                                    session_scope_fixture_with_finalizer):
        step_inside_test_body()
```

![Test with fixtures and finalizers executed within different scopes.](https://docs.qameta.io/allure/images/pytest_skoped_finalizers.png)

根据fixture执行的结果, 依赖于它的测试可能会收到不同的状态。fixture中的异常将使所有依赖测试都被破坏, `pytest.skip()` 调用将跳过所有依赖测试。

```python
import pytest

@pytest.fixture
def skip_fixture():
    pytest.skip()


@pytest.fixture
def fail_fixture():
    assert False


@pytest.fixture
def broken_fixture():
    raise Exception("Sorry, it's broken.")


def test_with_pytest_skip_in_the_fixture(skip_fixture):
    pass


def test_with_failure_in_the_fixture(fail_fixture):
    pass


def test_with_broken_fixture(broken_fixture):
    pass
```

![Fixture execution outcome resulting in different statuses.](https://docs.qameta.io/allure/images/pytest_fixture_effect.png)

##### Parametrization

您可以使用输入参数集来生成许多测试用例 `@pytest.mark.parametrize`. ([Pytest docs](https://docs.pytest.org/en/latest/skipping.html))

所有参数名和值将在报告中捕获，可选的参数名将被 `ids` 替换.

```python
import allure
import pytest


@allure.step
def simple_step(step_param1, step_param2 = None):
    pass


@pytest.mark.parametrize('param1', [True, False], ids=['id explaining value 1', 'id explaining value 2'])
def test_parameterize_with_id(param1):
    simple_step(param1)


@pytest.mark.parametrize('param1', [True, False])
@pytest.mark.parametrize('param2', ['value 1', 'value 2'])
def test_parametrize_with_two_parameters(param1, param2):
    simple_step(param1, param2)


@pytest.mark.parametrize('param1', [True], ids=['boolean parameter id'])
@pytest.mark.parametrize('param2', ['value 1', 'value 2'])
@pytest.mark.parametrize('param3', [1])
def test_parameterize_with_uneven_value_sets(param1, param2, param3):
    simple_step(param1, param3)
    simple_step(param2)
```

使用不同的命名参数集和未命名参数集捕获测试调用的示例。

![Multiple invocations of tests with different parameters.](https://docs.qameta.io/allure/images/pytest_parameterized_tests.png)

使用命名参数的参数化测试的测试执行细节。

![Multiple invocations of tests with different parameters.](https://docs.qameta.io/allure/images/pytest_parameterized_with_id.png)

#### 6.1.5. Allure Features

除Pytest以外，Allure目前几乎支持所有可用的特性。

##### Steps

的第一个可能也是最重要的方面是，它允许对每个测试调用进行非常详细的一步一步的表示。可以通过 `@allure.step` 装饰器向报表添加带注释的方法或函数的调用，并提供参数。

带@step注释的方法可以存储在测试之外，在需要时仅导入。Step方法可以具有任意深度的嵌套结构。

```python
import allure
import pytest

from .steps import imported_step


@allure.step
def passing_step():
    pass


@allure.step
def step_with_nested_steps():
    nested_step()


@allure.step
def nested_step():
    nested_step_with_arguments(1, 'abc')


@allure.step
def nested_step_with_arguments(arg1, arg2):
    pass


def test_with_imported_step():
    passing_step()
    imported_step()


def test_with_nested_steps():
    passing_step()
    step_with_nested_steps()
```

每个步骤的状态都显示在名称右侧的一个小图标中。嵌套的步骤被组织成树状的可折叠结构。

![Nested steps and steps with arguments.](https://docs.qameta.io/allure/images/pytest_nested_steps_and_args.png)

步骤可以有一个描述行，它支持为传递的位置和关键字参数提供占位符。关键字参数的默认参数也将被捕获。

```python
import allure

@allure.step('Step with placeholders in the title, positional: "{0}", keyword: "{key}"')
def step_with_title_placeholders(arg1, key=None):
    pass


def test_steps_with_placeholders():
    step_with_title_placeholders(1, key='something')
    step_with_title_placeholders(2)
    step_with_title_placeholders(3, 'anything')
```

![Nested steps and steps with arguments.](https://docs.qameta.io/allure/images/pytest_step_arguments.png)

fixtures也支持步骤。下面是一个在 `conftest.py`中定义的fixture的测试示例  (即使不直接导入也可以通过Pytest解决):

conftest.py

```python
import allure
import pytest


@allure.step('step in conftest.py')
def conftest_step():
    pass


@pytest.fixture
def fixture_with_conftest_step():
    conftest_step()
import allure

from .steps import imported_step


@allure.step
def passing_step():
    pass


def test_with_step_in_fixture_from_conftest(fixture_with_conftest_step):
    passing_step()
```

fixtures中的步骤显示在单独的树中，用于前置操作和后置操作。

![Step in fixture resolved from conftest.py.](https://docs.qameta.io/allure/images/pytest_step_in_fixture.png)

##### Attachments

报表可以显示许多不同类型的附件，这些附件可以作为测试的补充, step或者fixture结果. 附件可以通过调用`allure.attach(body, name, attachment_type, extension)`:

1. `body` - 要写入文件的原始内容。
2. `name` - 文件名
3. `attachment_type` -  `allure.attachment_type` 中的某一个值
4. `extension` - 提供的内容将用作创建文件的扩展名。

或者 `allure.attach.file(source, name, attachment_type, extension)`:

1. `source` - 包含文件路径的字符串。

(其他参数相同)

```python
import allure
import pytest


@pytest.fixture
def attach_file_in_module_scope_fixture_with_finalizer(request):
    allure.attach('A text attacment in module scope fixture', 'blah blah blah', allure.attachment_type.TEXT)
    def finalizer_module_scope_fixture():
        allure.attach('A text attacment in module scope finalizer', 'blah blah blah blah',
                      allure.attachment_type.TEXT)
    request.addfinalizer(finalizer_module_scope_fixture)


def test_with_attacments_in_fixture_and_finalizer(attach_file_in_module_scope_finalizer):
    pass


def test_multiple_attachments():
    allure.attach.file('./data/totally_open_source_kitten.png', attachment_type=allure.attachment_type.PNG)
    allure.attach('<head></head><body> a page </body>', 'Attach with HTML type', allure.attachment_type.HTML)
```

附件显示在它们所属的测试实体的上下文中。HTML类型的附件被呈现并显示在报表页面上。这是一种方便的方法，可以为您自己的测试结果表示提供一些定制。

![Attachments in the test body.](https://docs.qameta.io/allure/images/pytest_attachments.png)

##### Descriptions

您可以添加测试的详细描述，以便为报表阅读器提供尽可能多的上下文。这可以通过几种方式实现: `@allure.description` 添加一个提供描述字符串的装饰器或者 `@allure.description_html` 提供一些要在测试用例的“描述”部分中呈现的HTML。选择描述将简单地从测试方法的文档字符串中获取。

```python
import allure

@allure.description_html("""
<h1>Test with some complicated html description</h1>
<table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr align="center">
    <td>William</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr align="center">
    <td>Vasya</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table>
""")
def test_html_description():
    assert True


@allure.description("""
Multiline test description.
That comes from the allure.description decorator.

Nothing special about it.
""")
def test_description_from_decorator():
    assert 42 == int(6 * 7)


def test_unicode_in_docstring_description():
    """Unicode in description.

    Этот тест проверяет юникод.

    你好伙计.
    """
    assert 42 == int(6 * 7)
```

描述支持unicode字符串:

![Description from docstring.](https://docs.qameta.io/allure/images/pytest_unicode_description_docstr.png)

从 `description_html`呈现HTML:

![Description from html.](https://docs.qameta.io/allure/images/pytest_html_description.png)

此外，还可以在测试主体内部使用动态更新描述`allure.dynamic.description`.

```python
import allure

@allure.description("""
This description will be replaced at the end of the test.
""")
def test_dynamic_description():
    assert 42 == int(6 * 7)
    allure.dynamic.description('A final description.')
```

##### Titles

测试标题可以通过特殊方式使其更具可读性 `@allure.title` . 标题支持参数占位符，支持动态替换。

```python
import allure
import pytest


@allure.title("This test has a custom title")
def test_with_a_title():
    assert 2 + 2 == 4


@allure.title("This test has a custom title with unicode: Привет!")
def test_with_unicode_title():
    assert 3 + 3 == 6


@allure.title("Parameterized test title: adding {param1} with {param2}")
@pytest.mark.parametrize('param1,param2,expected', [
    (2, 2, 4),
    (1, 2, 5)
])
def test_with_parameterized_title(param1, param2, expected):
    assert param1 + param2 == expected


@allure.title("This title will be replaced in a test body")
def test_with_dynamic_title():
    assert 2 + 2 == 4
    allure.dynamic.title('After a successful test finish, the title was replaced with this line.')
```

![Description from docstring.](https://docs.qameta.io/allure/images/pytest_titles.png)

##### Links

为了将报表与bug跟踪器或测试管理系统集成在一起，Allure已经具备了`@allure.link`, `@allure.issue` and`@allure.testcase` 装饰器。

```python
import allure

TEST_CASE_LINK = 'https://github.com/qameta/allure-integrations/issues/8#issuecomment-268313637'


@allure.link('https://www.youtube.com/watch?v=4YYzUTYZRMU')
def test_with_link():
    pass


@allure.link('https://www.youtube.com/watch?v=Su5p2TqZxKU', name='Click me')
def test_with_named_link():
    pass


@allure.issue('140', 'Pytest-flaky test retries shows like test steps')
def test_with_issue_link():
    pass


@allure.testcase(TEST_CASE_LINK, 'Test case title')
def test_with_testcase_link():
    pass
```

`@allure.link` 将提供一个可点击的链接在 'Links' 部分:

![Description from docstring.](https://docs.qameta.io/allure/images/pytest_test_with_link.png)

`@allure.issue` 将提供一个带有小错误图标的链接。该描述符将测试用例id作为输入参数，并将其与提供的链接模板一起用于发布链接类型。链接模板指定 `--allure-link-pattern` Pytest的配置选项。链接模板和类型必须使用冒号指定:

```shell
$ pytest directory_with_tests/ --alluredir=/tmp/my_allure_report \
 --allure-link-pattern=issue:http://www.mytesttracker.com/issue/{}
```

模板的关键字 `issue`, `link` 以及`test_case` 为相应类型的链接提供模板。

![Test with a link of issue type.](https://docs.qameta.io/allure/images/pytest_test_case_with_issue_link.png)

#### 6.1.6. Retries

Allure允许您聚合关于在单个测试运行期间重新执行测试的信息以及一段时间内测试执行的历史信息。

对于重试，你可以使用 [Pytest rerun failures plugin](https://github.com/pytest-dev/pytest-rerunfailures).

例如，如果我们有一个非常不可靠的步骤方法经常失败，指定 `--reruns=5` 在Pytest启动选项中，我们将看到在重试选项卡上显示的运行此测试的所有失败尝试。

```python
import allure
import random
import time


@allure.step
def passing_step():
    pass


@allure.step
def flaky_broken_step():
    if random.randint(1, 5) != 1:
        raise Exception('Broken!')


def test_broken_with_randomized_time():
    passing_step()
    time.sleep(random.randint(1, 3))
    flaky_broken_step()
```

![Retries tab for a test that was rerun.](https://docs.qameta.io/allure/images/pytest_retry_tab.png)

同样，这样的测试将在执行测试列表中收到“片状”炸弹图标。

![Flaky icon.](https://docs.qameta.io/allure/images/pytest_flaky_icon.png)

#### 6.1.7. Tags

有时候，您希望对要执行的测试具有灵活性。Pytest通过使用标记修饰器允许这样做`@pytest.mark` ([Pytest docs](https://docs.pytest.org/en/latest/example/markers.html)).

Allure允许以类似的方式对您的测试进行标记，有3种标记修饰符允许对报表进行结构化表示:

1. BDD-style markers denoting Epics, Features and Stories
2. Severity labels
3. Custom labels

##### BDD markers

有两个装饰器: `@allure.feature` 和`@allure.story` 根据特定于项目的特性/故事分解来标记测试([for background see BDD article on Wikipedia](https://en.wikipedia.org/wiki/Behavior-driven_development)). 要标记某一特性或故事属于史诗，使用一个以 `epic_` 开头的前缀.

tests.py

```python
import allure


def test_without_any_annotations_that_wont_be_executed():
    pass


@allure.story('epic_1')
def test_with_epic_1():
    pass


@allure.story('story_1')
def test_with_story_1():
    pass

@allure.story('story_2')
def test_with_story_2():
    pass


@allure.feature('feature_2')
@allure.story('story_2')
def test_with_story_2_and_feature_2():
    pass
```

您可以使用以下命令行选项来指定不同的测试集，以执行以逗号分隔的值列表:

1. `--allure-epics`
2. `--allure-features`
3. `--allure-stories`

例如：

```shell
$ pytest tests.py --allure-stories story_1,story_2

collected 5 items

tests.py ...                                                                    [100%]

============================== 3 passed in 0.01 seconds ==============================
$ pytest tests.py --allure-features feature2 --allure-stories story2

collected 5 items

tests.py ...                                                                     [100%]

=============================== 2 passed in 0.01 seconds ==============================
```

##### Severity markers

要根据严重性级别标记您的测试 `@allure.severity` .他带有一个`allure.severity_level` 枚举值参数。

tests.py

```python
import allure


def test_with_no_severity_label():
    pass


@allure.severity(allure.severity_level.TRIVIAL)
def test_with_trivial_severity():
    pass


@allure.severity(allure.severity_level.NORMAL)
def test_with_normal_severity():
    pass


@allure.severity(allure.severity_level.NORMAL)
class TestClassWithNormalSeverity(object):

    def test_inside_the_normal_severity_test_class(self):
        pass

    @allure.severity(allure.severity_level.CRITICAL)
    def test_inside_the_normal_severity_test_class_with_overriding_critical_severity(self):
        pass
```

严重性装饰器可以应用于函数、方法或整个类。

使用 `--allure-severities` 命令行选项，带有逗号分隔的严重级别列表，只有具有相应严重级别的测试才会运行。

```shell
$ pytest tests.py --allure-severities normal,critical

collected 5 items

bdd_annotations_demo/test_severity_labels.py ...                                [100%]

================================ 3 passed in 0.01 seconds ============================
```