---
title: Hexo博客问题汇总
categories: hexo
tags: [hexo, pdf]
---

摘要：hexo个人博客问题汇总及解决办法。

<!-- more -->

## PDF显示

需要安装`hexo-pdf`插件

```shell
npm install -save hexo-pdf
```

在文章中引用：

```markdown
{% pdf 外链地址%}
```

经测试发现使用以上方法在本地显示PDF是OK的，但`hexo d`到github后PDF区域没有展示出来，解决办法：

在`\themes\next\source\`目录下创建file文件夹，将pdf文件丢进去，文章中引用：

```markdown
{% pdf /file/pdf文件%}
```

> 注意：如果你的博客主页不是`www.qizhenjun.com`，而是类似`www.qizhenjun.com/blog`，使用相对路径时需要使用`/blog/file/pdf文件`。

