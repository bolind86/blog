---
title: python3操作Excel
categories: python
tags: [python, excel]

---

**摘要:**
1. python操作Excel需要用到两个包：xlrd, xlutils
2. 必须使用xls后缀的文件
<!-- more -->

首先需要导入包：

```python
import xlrd
from xlutils.copy import copy
```

# excel写

```python
def excel_write(fdir, sheetname, i, j, value):
    """
    excel写
    :param fdir: 文件路径
    :param sheetname: 工作薄名称
    :param i: 行
    :param j: 列
    :param value: 值
    :return:
    """
    fileobj = xlrd.open_workbook(fdir)
    sheet = fileobj.sheet_by_name(sheetname)
    sheet.put_cell(i, j, 1, value, 0)
    wb = copy(fileobj)
    wb.save(fdir)
```

# excel读单元格

```python
def excel_read(fdir, sheetname, i, j):
    """
    excel读取单元格
    :param fdir: 文件路径
    :param sheetname: 工作薄名称
    :param i: 行
    :param j: 列
    :return:
    """
    fileobj = xlrd.open_workbook(fdir)
    sheet = fileobj.sheet_by_name(sheetname)
    value = sheet.cell(i, j).value
    return value
```

# excel读取行

```python
def excel_readline(fdir, sheetname, row):
    """
    excel读取行
    :param fdir: 文件路径
    :param sheetname: 工作薄名称
    :param row: 行
    :return:
    """
    fileobj = xlrd.open_workbook(fdir)
    sheet = fileobj.sheet_by_name(sheetname)
    val = sheet.row_values(row)
    return val
```

# 行数据封装为字典

```python
def get_dict(fdir, sheet_name, line):
    """
    excle行数据组装为dict
    :param fdir:
    :param sheet_name:
    :param line:
    :return:
    """
    data = {}

    # 标题行
    fields = excel_readline(fdir, sheet_name, 0)

    # 行数据
    line_data = excel_readline(fdir, sheet_name, line)

    # 循环组装数据
    for i, field in enumerate(fields):
        data.setdefault(field, line_data[i])

    return data
```

# 获取最大行

```python
def excel_getmaxline(fdir, sheetname):
    """
    获取sheet最大行
    :param fdir:
    :param sheetname:
    :return:
    """
    fileobj = xlrd.open_workbook(fdir)
    sheet = fileobj.sheet_by_name(sheetname)
    maxline = sheet.nrows
    return maxline
```

