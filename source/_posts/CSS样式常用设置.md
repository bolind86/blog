---
title: CSS样式常用设置
date: 2018/10/05 13:46:25
categories: [前端, css]
tags: [css]
---

**摘要：**自查

<!-- more -->

# css基础

## 语法

```css
selector {property: value}
```

```css
h1,h2,h3,h4,h5,h6 {
  color: green;
  }
```

## 创建

### 外部样式表

```html
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css" />
</head>
```

### 内部样式表

```html
<head>
<style type="text/css">
  hr {color: blue;}
  p {margin-left: 30px;}
  body {background-image: url("images/backgroud.gif");}
</style>
</head>
```

### 内联样式

```html
<p style="color: sienna; margin-left: 20px">
This is a test
</p>
```

### 多重样式

外部样式：

```css
h3 {
  color: red;
  text-align: left;
  font-size: 8pt;
  }
```

内部样式：

```css
h3 {
  text-align: right; 
  font-size: 20pt;
  }
```

最终样式：

```css
color: red; 
text-align: right; 
font-size: 20pt;
```

即颜色属性将被继承于外部样式表，而文字排列（`text-alignment`）和字体尺寸（`font-size`）会被内部样式表中的规则取代。

# css选择器

## 元素选择器

```css
html {color:black;}
p {color:gray;}
h2 {color:silver;}
```

```css
p.important {color:red;}
h1.important {color:blue;}
```

## 派生选择器

```css
li strong {
    font-style: italic;
    font-weight: normal;
  }
```

## id选择器

```css
#red {color:red;}
#green {color:green;}
```

## 类选择器

```css
.post {text-align: center}
```

```css
.important {font-weight:bold;}
.warning {font-style:italic;}
.important.warning {background:silver;}
```

## 属性选择器

```css
//基本
[href]
{color:red;}
```

```css
//带有某些属性的某一元素样式
a[href][title] {color:red;}
img[alt] {border: 5px solid red;}
```

```css
//指定链接的样式
a[href="http://www.w3school.com.cn/about_us.asp"] {color: red;}
```

```css
//元素有多个属性时，如果需要根据某个词进行选择，需要使用~=
p[class~="important"] {color: red;}
```

```css
//选择 lang 属性等于 en 或以 en- 开头的所有元素
*[lang|="en"] {color: red;}
```

```css
[abc^="def"]{color: red;}//选择 abc 属性值以 "def" 开头的所有元素
[abc$="def"]{color: red;}//选择 abc 属性值以 "def" 结尾的所有元素
[abc*="def"]{color: red;}//选择 abc 属性值中包含子串 "def" 的所有元素
```

后代选择器

```
//只对 h1 元素中的 em 元素应用样式
h1 em {color:red;}
```

## 子元素选择器

```css
//选择只作为 h1 元素子元素的 strong 元素
h1 > strong {color:red;}
```

<font color="red">**与后代选择器相比，子元素选择器（Child selectors）只能选择作为某元素子元素的元素。**</font>

## 相邻兄弟选择器

```
//选择紧接在 h1 元素后出现的段落，h1 和 p 元素拥有共同的父元素
h1 + p {margin-top:50px;}
```

## 选择器分组

```css
/* group 1 */
h1 {color:silver; background:white;}
h2 {color:silver; background:gray;}
h3 {color:white; background:gray;}
h4 {color:silver; background:white;}
b {color:gray; background:white;}

/* group 2 */
h1, h2, h4 {color:silver;}
h2, h3 {background:gray;}
h1, h4, b {background:white;}
h3 {color:white;}
b {color:gray;}

/* group 3 */
h1, h4 {color:silver; background:white;}
h2 {color:silver;}
h3 {color:white;}
h2, h3 {background:gray;}
b {color:gray; background:white;}
```

类选择器和 ID 选择器可能是区分大小写的，所以类和 ID 值的大小写必须与相应的值匹配。

# css定位

## 相对定位

```css
//相对定位是“相对于”元素在文档中的初始位置
//将 top 设置为 20px，那么框将在原位置顶部下面 20 像素的地方。如果 left 设置为 30 像素，那么会在元素左边创建 30 像素的空间，也就是将元素向右移动。
#box_relative {
  position: relative;
  left: 30px;
  top: 20px;
}
```

## 绝对定位

```css
//绝对定位是“相对于”最近的已定位祖先元素，如果不存在已定位的祖先元素，那么“相对于”最初的包含块。
#box_relative {
  position: absolute;
  left: 30px;
  top: 20px;
}
```

## 浮动

浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样。

[参考链接](http://www.w3school.com.cn/css/css_positioning_floating.asp）

# css样式

## 背景

| 属性                                                         | 描述                                         |
| ------------------------------------------------------------ | -------------------------------------------- |
| [background](http://www.w3school.com.cn/cssref/pr_background.asp) | 简写属性，作用是将背景属性设置在一个声明中。 |
| [background-attachment](http://www.w3school.com.cn/cssref/pr_background-attachment.asp) | 背景图像是否固定或者随着页面的其余部分滚动。 |
| [background-color](http://www.w3school.com.cn/cssref/pr_background-color.asp) | 设置元素的背景颜色。                         |
| [background-image](http://www.w3school.com.cn/cssref/pr_background-image.asp) | 把图像设置为背景。                           |
| [background-position](http://www.w3school.com.cn/cssref/pr_background-position.asp) | 设置背景图像的起始位置。                     |
| [background-repeat](http://www.w3school.com.cn/cssref/pr_background-repeat.asp) | 设置背景图像是否及如何重复。                 |

### 背景色

```css
p {background-color: gray; padding: 20px;}
```

### 背景图像

```css
p.flower {background-image: url(/i/eg_bg_03.gif);}
```

### 背景重复

```css
body
  { 
  background-image: url(/i/eg_bg_03.gif);
  background-repeat: repeat-y;
  }
```

### 背景定位

```css
body
  { 
    background-image:url('/i/eg_bg_03.gif');
    background-repeat:no-repeat;
    background-position:center;
  }
```

### 关键字

```css
p
  { 
    background-image:url('bgimg.gif');
    background-repeat:no-repeat;
    background-position:top;
  }
```

`center`、`top`、`boottom`、`right`、`left`

### 百分比

```css
body
  { 
    background-image:url('/i/eg_bg_03.gif');
    background-repeat:no-repeat;
    background-position:50% 50%;
  }
```

### 长度值

```css
body
  { 
    background-image:url('/i/eg_bg_03.gif');
    background-repeat:no-repeat;
    background-position:50px 100px;
  }
```

### 背景关联

```css
//防止图片随文档滚动
body 
  {
  background-image:url(/i/eg_bg_02.gif);
  background-repeat:no-repeat;
  background-attachment:fixed
  }
```

## 文本

| 属性                                                         | 描述                                                        |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| [color](http://www.w3school.com.cn/cssref/pr_text_color.asp) | 设置文本颜色                                                |
| [direction](http://www.w3school.com.cn/cssref/pr_text_direction.asp) | 设置文本方向。                                              |
| [line-height](http://www.w3school.com.cn/cssref/pr_dim_line-height.asp) | 设置行高。                                                  |
| [letter-spacing](http://www.w3school.com.cn/cssref/pr_text_letter-spacing.asp) | 设置字符间距。                                              |
| [text-align](http://www.w3school.com.cn/cssref/pr_text_text-align.asp) | 对齐元素中的文本。                                          |
| [text-decoration](http://www.w3school.com.cn/cssref/pr_text_text-decoration.asp) | 向文本添加修饰。                                            |
| [text-indent](http://www.w3school.com.cn/cssref/pr_text_text-indent.asp) | 缩进元素中文本的首行。                                      |
| text-shadow                                                  | 设置文本阴影。CSS2 包含该属性，但是 CSS2.1 没有保留该属性。 |
| [text-transform](http://www.w3school.com.cn/cssref/pr_text_text-transform.asp) | 控制元素中的字母。                                          |
| unicode-bidi                                                 | 设置文本方向。                                              |
| [white-space](http://www.w3school.com.cn/cssref/pr_text_white-space.asp) | 设置元素中空白的处理方式。                                  |
| [word-spacing](http://www.w3school.com.cn/cssref/pr_text_word-spacing.asp) | 设置字间距。                                                |

### 缩进文本

```css
p {text-indent: 5em;}
p {text-indent: -5em; padding-left: 5em;}
p {text-indent: 20%;}
```

### 水平对齐

| 值      | 描述                                       |
| ------- | ------------------------------------------ |
| left    | 把文本排列到左边。默认值：由浏览器决定。   |
| right   | 把文本排列到右边。                         |
| center  | 把文本排列到中间。                         |
| justify | 实现两端对齐文本效果。                     |
| inherit | 规定应该从父元素继承 text-align 属性的值。 |

```css
h1 {text-align:center}
h2 {text-align:left}
h3 {text-align:right}
```

### 间隔

#### 字间隔

```css
p.spread {word-spacing: 30px;}
```

#### 字母间隔

```css
h1 {letter-spacing: -0.5em}
h4 {letter-spacing: 20px}
```

### 字符转换

| 值         | 描述                                           |
| ---------- | ---------------------------------------------- |
| none       | 默认。定义带有小写字母和大写字母的标准的文本。 |
| capitalize | 文本中的每个单词以大写字母开头。               |
| uppercase  | 定义仅有大写字母。                             |
| lowercase  | 定义无大写字母，仅有小写字母。                 |
| inherit    | 规定应该从父元素继承 text-transform 属性的值。 |

```css
h1 {text-transform:uppercase}
h2 {text-transform:capitalize}
p {text-transform:lowercase}
```

### 文本装饰

| 值           | 描述                                            |
| ------------ | ----------------------------------------------- |
| none         | 默认。定义标准的文本。                          |
| underline    | 定义文本下的一条线。                            |
| overline     | 定义文本上的一条线。                            |
| line-through | 定义穿过文本下的一条线。                        |
| blink        | 定义闪烁的文本。                                |
| inherit      | 规定应该从父元素继承 text-decoration 属性的值。 |

```css
h1 {text-decoration:overline}
h2 {text-decoration:line-through}
h3 {text-decoration:underline}
h4 {text-decoration:blink}
```

### 处理空白符

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| normal   | 默认。空白会被浏览器忽略。                                   |
| pre      | 空白会被浏览器保留。其行为方式类似 HTML 中的 `<pre>` 标签。  |
| nowrap   | 文本不会换行，文本会在在同一行上继续，直到遇到 `<br>` 标签为止。 |
| pre-wrap | 保留空白符序列，但是正常地进行换行。                         |
| pre-line | 合并空白符序列，但是保留换行符。                             |
| inherit  | 规定应该从父元素继承 white-space 属性的值。                  |

```css
p {white-space: nowrap}
```

### 文本方向

| 值      | 描述                                      |
| ------- | ----------------------------------------- |
| ltr     | 默认。文本方向从左到右。                  |
| rtl     | 文本方向从右到左。                        |
| inherit | 规定应该从父元素继承 direction 属性的值。 |

```css
div {direction: rtl}
```

## 字体

| 属性                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [font](http://www.w3school.com.cn/cssref/pr_font_font.asp)   | 简写属性。作用是把所有针对字体的属性设置在一个声明中。       |
| [font-family](http://www.w3school.com.cn/cssref/pr_font_font-family.asp) | 设置字体系列。                                               |
| [font-size](http://www.w3school.com.cn/cssref/pr_font_font-size.asp) | 设置字体的尺寸。                                             |
| [font-size-adjust](http://www.w3school.com.cn/cssref/pr_font_font-size-adjust.asp) | 当首选字体不可用时，对替换字体进行智能缩放。（CSS2.1 已删除该属性。） |
| [font-stretch](http://www.w3school.com.cn/cssref/pr_font_font-stretch.asp) | 对字体进行水平拉伸。（CSS2.1 已删除该属性。）                |
| [font-style](http://www.w3school.com.cn/cssref/pr_font_font-style.asp) | 设置字体风格。                                               |
| [font-variant](http://www.w3school.com.cn/cssref/pr_font_font-variant.asp) | 以小型大写字体或者正常字体显示文本。                         |
| [font-weight](http://www.w3school.com.cn/cssref/pr_font_weight.asp) | 设置字体的粗细。                                             |

### 指定字体系列

```css
body {font-family: sans-serif;}
p {font-family: Times, TimesNR, 'New Century Schoolbook',
     Georgia, 'New York', serif;}
```

### 字体风格

```css
p.normal {font-style:normal;}	//文本正常显示
p.italic {font-style:italic;}	//文本斜体显示
p.oblique {font-style:oblique;}	//文本倾斜显示
```

### 字体变形

```css
p {font-variant:small-caps;}
```

### 字体加粗

100 对应最细的字体变形，900 对应最粗的字体变形。数字 400 等价于 normal，而 700 等价于 bold。如果将元素的加粗设置为 bolder，浏览器会设置比所继承值更粗的一个字体加粗。与此相反，关键词 lighter 会导致浏览器将加粗度下移而不是上移。

```css
p.normal {font-weight:normal;}
p.thick {font-weight:bold;}
p.thicker {font-weight:900;}
```

### 字体大小

```css
h1 {font-size:60px;}
h2 {font-size:40px;}
p {font-size:14px;}
```

## 链接

### 设置链接样式

```css
a:link {color:#FF0000;}		/* 未被访问的链接 */
a:visited {color:#00FF00;}	/* 已被访问的链接 */
a:hover {color:#FF00FF;}	/* 鼠标指针移动到链接上 */
a:active {color:#0000FF;}	/* 正在被点击的链接 */
```

### 常见的链接样式

#### 文本修饰

```css
a:link {text-decoration:none;}
a:visited {text-decoration:none;}
a:hover {text-decoration:underline;}
a:active {text-decoration:underline;}
```

#### 背景色

```css
a:link {background-color:#B2FF99;}
a:visited {background-color:#FFFF85;}
a:hover {background-color:#FF704D;}
a:active {background-color:#FF704D;}
```

#### 链接框

```css
a:link,a:visited
{
display:block;
font-weight:bold;
font-size:14px;
font-family:Verdana, Arial, Helvetica, sans-serif;
color:#FFFFFF;
background-color:#98bf21;
width:120px;
text-align:center;
padding:4px;
text-decoration:none;
}

a:hover,a:active
{
background-color:#7A991A;
}
```

#### 改变链接字体大小

```css
a.two:link {color:#ff0000;}
a.two:visited {color:#0000ff;}
a.two:hover {font-size:150%;}
```

## 列表

| 属性                                                         | 描述                                                 |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| [list-style](http://www.w3school.com.cn/cssref/pr_list-style.asp) | 简写属性。用于把所有用于列表的属性设置于一个声明中。 |
| [list-style-image](http://www.w3school.com.cn/cssref/pr_list-style-image.asp) | 将图象设置为列表项标志。                             |
| [list-style-position](http://www.w3school.com.cn/cssref/pr_list-style-position.asp) | 设置列表中列表项标志的位置。                         |
| [list-style-type](http://www.w3school.com.cn/cssref/pr_list-style-type.asp) | 设置列表项标志的类型。                               |
| marker-offset                                                |                                                      |

### 列表类型

| 值                   | 描述                                                        |
| -------------------- | ----------------------------------------------------------- |
| none                 | 无标记。                                                    |
| disc                 | 默认。标记是实心圆。                                        |
| circle               | 标记是空心圆。                                              |
| square               | 标记是实心方块。                                            |
| decimal              | 标记是数字。                                                |
| decimal-leading-zero | 0开头的数字标记。(01, 02, 03, 等。)                         |
| lower-roman          | 小写罗马数字(i, ii, iii, iv, v, 等。)                       |
| upper-roman          | 大写罗马数字(I, II, III, IV, V, 等。)                       |
| lower-alpha          | 小写英文字母The marker is lower-alpha (a, b, c, d, e, 等。) |
| upper-alpha          | 大写英文字母The marker is upper-alpha (A, B, C, D, E, 等。) |
| lower-greek          | 小写希腊字母(alpha, beta, gamma, 等。)                      |
| lower-latin          | 小写拉丁字母(a, b, c, d, e, 等。)                           |
| upper-latin          | 大写拉丁字母(A, B, C, D, E, 等。)                           |
| hebrew               | 传统的希伯来编号方式                                        |
| armenian             | 传统的亚美尼亚编号方式                                      |
| georgian             | 传统的乔治亚编号方式(an, ban, gan, 等。)                    |
| cjk-ideographic      | 简单的表意数字                                              |
| hiragana             | 标记是：a, i, u, e, o, ka, ki, 等。（日文片假名）           |
| katakana             | 标记是：A, I, U, E, O, KA, KI, 等。（日文片假名）           |
| hiragana-iroha       | 标记是：i, ro, ha, ni, ho, he, to, 等。（日文片假名）       |
| katakana-iroha       | 标记是：I, RO, HA, NI, HO, HE, TO, 等。（日文片假名）       |

```css
ul {list-style-type : square}
```

### 列表项图像

| 值      | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| inside  | 列表项目标记放置在文本以内，且环绕文本根据标记对齐。         |
| outside | 默认值。保持标记位于文本的左侧。列表项目标记放置在文本以外，且环绕文本不根据标记对齐。 |
| inherit | 规定应该从父元素继承 list-style-position 属性的值。          |

```css
ul {list-style-position:inside;}
```

### 列表标志位置

| 值      | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| inside  | 列表项目标记放置在文本以内，且环绕文本根据标记对齐。         |
| outside | 默认值。保持标记位于文本的左侧。列表项目标记放置在文本以外，且环绕文本不根据标记对齐。 |
| inherit | 规定应该从父元素继承 list-style-position 属性的值。          |

```css
ul {list-style-position:inside;}
```

## 表格

| 属性                                                         | 描述                                 |
| ------------------------------------------------------------ | ------------------------------------ |
| [border-collapse](http://www.w3school.com.cn/cssref/pr_tab_border-collapse.asp) | 设置是否把表格边框合并为单一的边框。 |
| [border-spacing](http://www.w3school.com.cn/cssref/pr_tab_border-spacing.asp) | 设置分隔单元格边框的距离。           |
| [caption-side](http://www.w3school.com.cn/cssref/pr_tab_caption-side.asp) | 设置表格标题的位置。                 |
| [empty-cells](http://www.w3school.com.cn/cssref/pr_tab_empty-cells.asp) | 设置是否显示表格中的空单元格。       |
| [table-layout](http://www.w3school.com.cn/cssref/pr_tab_table-layout.asp) | 设置显示单元、行和列的算法。         |

### 表格边框

```css
table, th, td {
  border: 1px solid blue;
}
```

### 折叠边框

```css
table {
  border-collapse:collapse;
}

table,th, td {
  border: 1px solid black;
}
```

### 表格宽度和高度

```css
table {
  width:100%;
}

th {
  height:50px;
}
```

### 表格文本对齐

```css
td {
  text-align:right;			//左右
}

td {
  vertical-align:bottom;	//垂直
}
```

### 表格内边距

```css
td {
  padding:15px;
}
```

### 表格颜色

```css
table, td, th {
  border:2px solid green;
}

th {
  background-color:green;
  color:white;
}
```

## 轮廓

| 属性                                                         | 描述                             | CSS  |
| ------------------------------------------------------------ | -------------------------------- | ---- |
| [outline](http://www.w3school.com.cn/cssref/pr_outline.asp)  | 在一个声明中设置所有的轮廓属性。 | 2    |
| [outline-color](http://www.w3school.com.cn/cssref/pr_outline-color.asp) | 设置轮廓的颜色。                 | 2    |
| [outline-style](http://www.w3school.com.cn/cssref/pr_outline-style.asp) | 设置轮廓的样式。                 | 2    |
| [outline-width](http://www.w3school.com.cn/cssref/pr_outline-width.asp) | 设置轮廓的宽度。                 | 2    |

```css
p {
	border:red solid thin;
	outline:#00ff00 dotted thick;
}

p  {
	border:red solid thin;
	outline-style:dotted;
	outline-color:#00ff00;
}

p.dotted {outline-style: dotted}

p.one {
	border:red solid thin;
	outline-style:solid;
	outline-width:thin;
}
```

# css框模型

## 内边距

| 属性                                                         | 描述                                                 |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| [padding](http://www.w3school.com.cn/cssref/pr_padding.asp)  | 简写属性。作用是在一个声明中设置元素的所内边距属性。 |
| [padding-bottom](http://www.w3school.com.cn/cssref/pr_padding-bottom.asp) | 设置元素的下内边距。                                 |
| [padding-left](http://www.w3school.com.cn/cssref/pr_padding-left.asp) | 设置元素的左内边距。                                 |
| [padding-right](http://www.w3school.com.cn/cssref/pr_padding-right.asp) | 设置元素的右内边距。                                 |
| [padding-top](http://www.w3school.com.cn/cssref/pr_padding-top.asp) | 设置元素的上内边距。                                 |

按照上、右、下、左的顺序分别设置各边的内边距，各边均可以使用不同的单位或百分比值

```css
h1 {padding: 10px 0.25em 2ex 30%;}

h1 {
  padding-top: 20px;
  padding-right: 0.25em;
  padding-bottom: 3ex;
  padding-left: 30%;
  }
```

## 边框

| 值      | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| none    | 定义无边框。                                                 |
| hidden  | 与 "none" 相同。不过应用于表时除外，对于表，hidden 用于解决边框冲突。 |
| dotted  | 定义点状边框。在大多数浏览器中呈现为实线。                   |
| dashed  | 定义虚线。在大多数浏览器中呈现为实线。                       |
| solid   | 定义实线。                                                   |
| double  | 定义双线。双线的宽度等于 border-width 的值。                 |
| groove  | 定义 3D 凹槽边框。其效果取决于 border-color 的值。           |
| ridge   | 定义 3D 垄状边框。其效果取决于 border-color 的值。           |
| inset   | 定义 3D inset 边框。其效果取决于 border-color 的值。         |
| outset  | 定义 3D outset 边框。其效果取决于 border-color 的值。        |
| inherit | 规定应该从父元素继承边框样式。                               |

```css
p {
  border-style:solid;
}
```

### 定义单边样式

```css
p {
  border-top-style:dotted;
  border-right-style:
  border-bottom-style:
  border-left-style:
}
```

### 边框的宽度

| 值       | 描述                           |
| -------- | ------------------------------ |
| thin     | 定义细的边框。                 |
| medium   | 默认。定义中等的边框。         |
| thick    | 定义粗的边框。                 |
| *length* | 允许您自定义边框的宽度。       |
| inherit  | 规定应该从父元素继承边框宽度。 |

```css
p {
  border-style:solid;
  border-width:25px;
}

p {
  border-style: solid;
  border-top-width: 15px;
  border-right-width: 10px;
  border-bottom-width: 15px;
  border-left-width: 25px;
}
```

### 没有边框

```css
p {border-style: none; border-width: 50px;}
```

### 边框颜色

| 值           | 描述                                                   |
| ------------ | ------------------------------------------------------ |
| *color_name* | 规定颜色值为颜色名称的边框颜色（比如 red）。           |
| *hex_number* | 规定颜色值为十六进制值的边框颜色（比如 #ff0000）。     |
| *rgb_number* | 规定颜色值为 rgb 代码的边框颜色（比如 rgb(255,0,0)）。 |
| transparent  | 默认值。边框颜色为透明。                               |
| inherit      | 规定应该从父元素继承边框颜色。                         |

```css
p {
  border-style:solid;
  border-color:#ff0000 #0000ff;
}

h2 {
  border-style: solid;
  border-color: black;
  border-top-color: red;
  border-right-color: red;
  border-bottom-color: red;
  border-left-color: red;
}
```

### 透明边框

```css
a:link, a:visited {
  border-style: solid;
  border-width: 5px;
  border-color: transparent;
  }
a:hover {border-color: gray;}
```

# css高级

## 对齐

### 块元素

占据全部可用宽度，并且在其前后都会换行。

### 使用margin属性来水平对齐

```css
.center
{
margin-left:auto;
margin-right:auto;
width:70%;
background-color:#b0e0e6;
}
```

### 使用 position 属性进行左和右对齐

```css
.right
{
position:absolute;
right:0px;
width:300px;
background-color:#b0e0e6;
}
```

### 使用 float 属性来进行左和右对齐

```css
.right
{
float:right;
width:300px;
background-color:#b0e0e6;
}
```



## 尺寸

| 属性                                                         | 描述                 |
| ------------------------------------------------------------ | -------------------- |
| [height](http://www.w3school.com.cn/cssref/pr_dim_height.asp) | 设置元素的高度。     |
| [line-height](http://www.w3school.com.cn/cssref/pr_dim_line-height.asp) | 设置行高。           |
| [max-height](http://www.w3school.com.cn/cssref/pr_dim_max-height.asp) | 设置元素的最大高度。 |
| [max-width](http://www.w3school.com.cn/cssref/pr_dim_max-width.asp) | 设置元素的最大宽度。 |
| [min-height](http://www.w3school.com.cn/cssref/pr_dim_min-height.asp) | 设置元素的最小高度。 |
| [min-width](http://www.w3school.com.cn/cssref/pr_dim_min-width.asp) | 设置元素的最小宽度。 |
| [width](http://www.w3school.com.cn/cssref/pr_dim_width.asp)  | 设置元素的宽度。     |

## 分类

| 属性                                                         | 描述                                                     |
| ------------------------------------------------------------ | -------------------------------------------------------- |
| [clear](http://www.w3school.com.cn/cssref/pr_class_clear.asp) | 设置一个元素的侧面是否允许其他的浮动元素。               |
| [cursor](http://www.w3school.com.cn/cssref/pr_class_cursor.asp) | 规定当指向某元素之上时显示的指针类型。                   |
| [display](http://www.w3school.com.cn/cssref/pr_class_display.asp) | 设置是否及如何显示元素。                                 |
| [float](http://www.w3school.com.cn/cssref/pr_class_float.asp) | 定义元素在哪个方向浮动。                                 |
| [position](http://www.w3school.com.cn/cssref/pr_class_position.asp) | 把元素放置到一个静态的、相对的、绝对的、或固定的位置中。 |
| [visibility](http://www.w3school.com.cn/cssref/pr_class_visibility.asp) | 设置元素是否可见或不可见。                               |

## 导航栏

```css
<ul>
<li><a href="default.asp">Home</a></li>
<li><a href="news.asp">News</a></li>
<li><a href="blog.asp">Blog</a></li>
<li><a href="about.asp">About</a></li>
</ul>
```

### 去除圆点和外边距

```css
ul
{
list-style-type:none;
margin:0;
padding:0;
}
```

### 垂直导航栏

```css
a
{
display:block;
width:60px;
}
```

### 水平导航栏

```css
li
{
display:inline;
}
```

### 对列表项进行浮动

```css
li
{
float:left;
}
a
{
display:block;
width:60px;
}
```

- float:left - 使用 float 来把块元素滑向彼此。
- display:block - 把链接显示为块元素可使整个链接区域可点击（不仅仅是文本），同时也允许我们规定宽度。
- width:60px - 由于块元素默认占用全部可用宽度，链接无法滑动至彼此相邻。我们需要规定 60 像素的宽度。

### 完整例子

```html
<!DOCTYPE html>
<html>
<head>
<style>
ul
{
list-style-type:none;
margin:0;
padding:0;
overflow:hidden;
}
li
{
float:left;
}
a:link,a:visited
{
display:block;
width:120px;
font-weight:bold;
color:#FFFFFF;
background-color:#bebebe;
text-align:center;
padding:4px;
text-decoration:none;
text-transform:uppercase;
}
a:hover,a:active
{
background-color:#cc0000;
}

</style>
</head>

<body>
<ul>
<li><a href="#home">Home</a></li>
<li><a href="#news">News</a></li>
<li><a href="#blog">Blog</a></li>
<li><a href="#about">About</a></li>
</ul>
</body>
</html>

```

## 媒介类型

@media 规则使你有能力在相同的样式表中，使用不同的样式规则来针对不同的媒介。

| 媒介类型   | 描述                                                   |
| ---------- | ------------------------------------------------------ |
| all        | 用于所有的媒介设备。                                   |
| aural      | 用于语音和音频合成器。                                 |
| braille    | 用于盲人用点字法触觉回馈设备。                         |
| embossed   | 用于分页的盲人用点字法打印机。                         |
| handheld   | 用于小的手持的设备。                                   |
| print      | 用于打印机。                                           |
| projection | 用于方案展示，比如幻灯片。                             |
| screen     | 用于电脑显示器。                                       |
| tty        | 用于使用固定密度字母栅格的媒介，比如电传打字机和终端。 |
| tv         | 用于电视机类型的设备。                                 |

```css
@media screen
{
h1.test {font-family:verdana,sans-serif; font-size:14px}
}

@media print
{
h1.test {font-family:times,serif; font-size:10px}
}

@media screen,print
{
h1.test {font-weight:bold}
}
```

[参考网址](http://www.w3school.com.cn/css/index.asp)

