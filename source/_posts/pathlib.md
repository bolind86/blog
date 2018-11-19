---
title: python中的pathlib模块
date: 2018/10/17 13:46:25
categories: python
tags: [python, pathlib]
---

| 类/属性/方法                                           | 返回值 | 参数                          | 说明                                               |
| ------------------------------------------------------ | ------ | ----------------------------- | :------------------------------------------------- |
| .Path()                                                | p      | 创建Path对象                  |                                                    |
|                                                        |        | path                          | 路径                                               |
| p.parent                                               | Path   | 返回上一级路径                |                                                    |
| p.parents                                              | iter   | 上一级路径, 上上级路径,   ... |                                                    |
| p.name                                                 | str    | 获取文件名                    |                                                    |
| p.suffix                                               | str    | 获取后缀                      |                                                    |
| p.iterdir()                                            | iter   |                               | 返回一个迭代器, 包含p下所有文件/目录               |
| p.is_file()                                            | bool   |                               | 判断p是不是文件                                    |
| p.is_dir()                                             | bool   |                               | 判断p是不是目录                                    |
| p.is_absolute()                                        | bool   |                               | 判断p是不会绝对路径                                |
| p.match()                                              | bool   | path_pattern                  | 判断p是否符合某一模式,   比如('C:\Windows\*')      |
| [p.glob()](http://www.cnblogs.com/P--K/p/8403776.html) | iter   | pattern                       | '*.py': 搜索p下所有py文件                          |
|                                                        |        |                               | '**\*.py': 搜索p下及其子目录(包括深层)下所有py文件 |
| p.rglob()                                              | iter   | pattern                       | '*.py': 搜索p下及其子目录(包括深层)下所有py文件    |
| p.mkdir()                                              |        |                               | 若p目录不存在则创建                                |
| p.rmdir()                                              |        |                               | 若p是空目录则删除p                                 |
| p.relative_to()                                        | Path   | *other                        | 返回p相对于other的相对路径                         |