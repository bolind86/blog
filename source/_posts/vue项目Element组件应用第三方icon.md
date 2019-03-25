---
title: vue项目Element组件引用第三方icon图标
date: 2018/12/28 15:31:00
categories: [前端, vue.js]
tags: [vue]
---

Element UI自带的ICON图标极少，少的令人发指

<!-- more -->

# 阿里巴巴矢量图标库

https://www.iconfont.cn

## 创建项目

![1](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20181228153541.png)



![2](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20181228153711.png)

`FontClass/Symbol前缀`需要记住，后面要用到

## 添加图标

在`图标库`中添加图标到购物车后再将图标添加到项目，槽点：没有全选功能，只能一个个点。

## 下载

![4](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20181228154055.png)

# 使用

## 解压

在`src/assets/`下新建icon目录

将下载的压缩包解压至上面的目录

## 修改

修改`iconfont.css文件`，增加如下内容

```css
[class^="icon"], [class*=" icon"] {
  font-family:"fontFamily" !important;
  /* 以下内容参照第三方图标库本身的规则 */
  font-size: 18px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

注意，两个`class`后面的内容为我们在上面新建项目时天的内容，第二个`class`后面有一个空格。

在`main.js`中引用文件：

```js
import './assets/icon/iconFont.css'
```

## 使用

可以查看demo页面，里面有多种用法：

```html
<i class="icon iconfont icon-close"></i>
                    <div class="name">close</div>
                    <div class="fontclass">.icon-close</div>
                </li>
```

```html
<li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-roundright"></use>
                    </svg>
                    <div class="name">round_right</div>
                    <div class="fontclass">#icon-roundright</div>
                </li>
```

```html
<i class="icon iconfont">&#xe64a;</i>
                    <div class="name">emoji</div>
                    <div class="code">&amp;#xe64a;</div>
                </li>
```

