---
title: hexo博客nexT主题美化
date: 2018/10/10 13:46:25
categories: hexo
tags: [nexT]
---
**摘要:**nexT主题包含各种美化及功能配置需要手动添加或开启,比如rss,links,背景,鼠标点击效果,在线联系,阅读进度等.
<!-- more -->

### nexT主题目录说明

```java
├── .github            #git信息
├── languages          #多语言
|   ├── default.yml    #默认语言
|   └── zh-Hans.yml      #简体中文
|   └── zh-tw.yml      #繁体中文
├── layout             #布局，根目录下的*.ejs文件是对主页，分页，存档等的控制
|   ├── _custom        #可以自己修改的模板，覆盖原有模板
|   |   ├── _header.swig    #头部样式
|   |   ├── _sidebar.swig   #侧边栏样式
|   ├── _macro        #可以自己修改的模板，覆盖原有模板
|   |   ├── post.swig    #文章模板
|   |   ├── reward.swig    #打赏模板
|   |   ├── sidebar.swig   #侧边栏模板
|   ├── _partial       #局部的布局
|   |   ├── head       #头部模板
|   |   ├── search     #搜索模板
|   |   ├── share      #分享模板
|   ├── _script        #局部的布局
|   ├── _third-party   #第三方模板
|   ├── _layout.swig   #主页面模板
|   ├── index.swig     #主页面模板
|   ├── page           #页面模板
|   └── tag.swig       #tag模板
├── scripts            #script源码
|   ├── tags           #tags的script源码
|   ├── marge.js       #页面模板
├── source             #源码
|   ├── css            #css源码
|   |   ├── _common    #*.styl基础css
|   |   ├── _custom    #*.styl局部css
|   |   └── _mixins    #mixins的css
|   ├── fonts          #字体
|   ├── images         #图片
|   ├── uploads        #添加的文件
|   └── js             #javascript源代码
├── _config.yml        #主题配置文件
└── README.md          #用GitHub的都知道
```

### 主题美化方法

#### 主题模板选择

修改：

```yml
# Schemes
scheme: Muse
#scheme: Mist
#scheme: Pisces
#scheme: Gemini
```

4选1。

#### 文章超链接样式
修改文件`themes\next\source\css\_common\components\post\post.styl`，在文末添加：
```css
.post-body p a{
  color: #0593d3;
  border-bottom: none;
  border-bottom: 1px solid #0593d3;
  &:hover {
    color: #fc6423;
    border-bottom: none;
    border-bottom: 1px solid #fc6423;
  }
}
```
效果图：
[![iJCBwQ.md.gif](http://img.qizhenjun.com/1.gif)](https://imgchr.com/i/iJCBwQ)

#### 修改作者头像（圆形）
修改文件`\themes\next\source\css\_common\components\sidebar\sidebar-author.styl`
```css
.site-author-image {
  display: block;
  margin: 0 auto;
  padding: $site-author-image-padding;
  max-width: $site-author-image-width;
  height: $site-author-image-height;
  border: $site-author-image-border-width solid $site-author-image-border-color;

  /* 头像圆形 */
  border-radius: 80px;
  -webkit-border-radius: 80px;
  -moz-border-radius: 80px;
  box-shadow: inset 0 -1px 0 #333sf;
}
```
效果图：
![iJCsFs.png](http://img.qizhenjun.com/TIM截图20180926092925.png)

#### 代码块样式
修改文件`\themes\next\source\css\_custom\custom.styl`
```css
// Custom styles.
code {
    color: #ff7600;
    background: #fbf7f8;
    margin: 2px;
}
// 大代码块的自定义样式
.highlight, pre {
    margin: 5px 0;
    padding: 5px;
    border-radius: 3px;
}
.highlight, code, pre {
    border: 1px solid #d6d6d6;
}
```
效果图：
[![iJC4w4.md.png](http://img.qizhenjun.com/TIM截图20180926093255.png)](https://imgchr.com/i/iJC4w4)

#### 主页文章添加阴影效果
修改文件`\themes\next\source\css\_custom\custom.styl`,文末添加：
```css
// 主页文章添加阴影效果
 .post {
   margin-top: 60px;
   margin-bottom: 60px;
   padding: 25px;
   -webkit-box-shadow: 0 0 5px rgba(202, 203, 203, .5);
   -moz-box-shadow: 0 0 5px rgba(202, 203, 204, .5);
  }
```
效果图：
[![iJC5TJ.md.png](http://img.qizhenjun.com/TIM截图20180926093829.png)](https://imgchr.com/i/iJC5TJ)

#### 首页文章只展示部分内容
修改文件`\themes\next\_config.yml`
```yml
auto_excerpt:
  enable: true
  length: 150
```
效果图：
[![iJCgS0.md.png](http://img.qizhenjun.com/TIM截图20180926094428.png)](https://imgchr.com/i/iJCgS0)

#### 设置网站图标
制作一张32×32的`ico图标，重命名为`favicon.ico`，将文件放在`/themes/next/source/images`目录里，修改`\themes\next\_config.yml`
[![iJC2lV.md.png](http://img.qizhenjun.com/TIM截图20180926095129.png)](https://imgchr.com/i/iJC2lV)
效果图：
![iJCRyT.png](http://img.qizhenjun.com/TIM截图20180926095224.png)

#### 顶部添加页面加载进度条
**方法一：**
修改文件`/themes/next/layout/_partials/head.swig`，在
`<meta name="theme-color" content="{{ theme.android_chrome_color }}">`下方添加：
```js
<script src="//cdn.bootcss.com/pace/1.0.2/pace.min.js"></script>
<link href="//cdn.bootcss.com/pace/1.0.2/themes/pink/pace-theme-flash.css" rel="stylesheet">
<style>
    .pace .pace-progress {
        background: #1E92FB; /*进度条颜色*/
        height: 3px;
    }
    .pace .pace-progress-inner {
         box-shadow: 0 0 10px #1E92FB, 0 0 5px     #1E92FB; /*阴影颜色*/
    }
    .pace .pace-activity {
        border-top-color: #1E92FB;    /*上边框颜色*/
        border-left-color: #1E92FB;    /*左边框颜色*/
    }
</style>
```
效果图：
[![iJCWOU.md.gif](http://img.qizhenjun.com/2.gif)](https://imgchr.com/i/iJCWOU)

**方法二：**
修改`\themes\next\_config.yml`
```python
pace: true
```

#### 文章添加版权信息
在目录`\themes\next\layout\_macro`下创建`my-copyright.swig`，内容如下：
```python
{% if page.copyright %}
<div class="my_post_copyright">
  <script src="//cdn.bootcss.com/clipboard.js/1.5.10/clipboard.min.js"></script>

  <!-- JS库 sweetalert 可修改路径 -->
  <script src="https://cdn.bootcss.com/jquery/2.0.0/jquery.min.js"></script>
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
  <p><span>本文标题:</span><a href="{{ url_for(page.path) }}">{{ page.title }}</a></p>
  <p><span>文章作者:</span><a href="/" title="访问 {{ theme.author }} 的个人博客">{{ theme.author }}</a></p>
  <p><span>发布时间:</span>{{ page.date.format("YYYY年MM月DD日 - HH:MM") }}</p>
  <p><span>最后更新:</span>{{ page.updated.format("YYYY年MM月DD日 - HH:MM") }}</p>
  <p><span>原始链接:</span><a href="{{ url_for(page.path) }}" title="{{ page.title }}">{{ page.permalink }}</a>
    <span class="copy-path"  title="点击复制文章链接"><i class="fa fa-clipboard" data-clipboard-text="{{ page.permalink }}"  aria-label="复制成功！"></i></span>
  </p>
  <p><span>许可协议:</span><i class="fa fa-creative-commons"></i> <a rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" title="Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)">署名-非商业性使用-禁止演绎 4.0 国际</a> 转载请保留原文链接及作者。</p>
</div>
<script>
    var clipboard = new Clipboard('.fa-clipboard');
      $(".fa-clipboard").click(function(){
      clipboard.on('success', function(){
        swal({
          title: "",
          text: '复制成功',
          icon: "success",
          showConfirmButton: true
          });
        });
    });
</script>
{% endif %}

```
在目录`\themes\next\source\css\_common\components\post`新建`my-post-copyright.styl`，内容：
```python
.my_post_copyright {
  width: 85%;
  max-width: 45em;
  margin: 2.8em auto 0;
  padding: 0.5em 1.0em;
  border: 1px solid #d3d3d3;
  font-size: 0.93rem;
  line-height: 1.6em;
  word-break: break-all;
  background: rgba(255,255,255,0.4);
}
.my_post_copyright p{margin:0;}
.my_post_copyright span {
  display: inline-block;
  width: 5.2em;
  color: #b5b5b5;
  font-weight: bold;
}
.my_post_copyright .raw {
  margin-left: 1em;
  width: 5em;
}
.my_post_copyright a {
  color: #808080;
  border-bottom:0;
}
.my_post_copyright a:hover {
  color: #a3d2a3;
  text-decoration: underline;
}
.my_post_copyright:hover .fa-clipboard {
  color: #000;
}
.my_post_copyright .post-url:hover {
  font-weight: normal;
}
.my_post_copyright .copy-path {
  margin-left: 1em;
  width: 1em;
  +mobile(){display:none;}
}
.my_post_copyright .copy-path:hover {
  color: #808080;
  cursor: pointer;
}
```
修改`\themes\next\layout\_macro\post.swig`,在代码
```python
<footer class="post-footer">
```
前增加：
```python
<div>
      {% if not is_index %}
        {% include 'my-copyright.swig' %}
      {% endif %}
	</div>
```
修改`\themes\next\source\css\_common\components\post\post.styl`，在文末添加
```python
@import "my-post-copyright"
```
新建文章时，增加
```js
---
title: Hello World
categories: 帮助
tags: [hexo, help, 帮助]
copyright: true
---
```
效果图：
[![iJChmF.md.png](http://img.qizhenjun.com/TIM截图20180926105441.png)](https://imgchr.com/i/iJChmF)

#### 站点统计

建议使用脚本方式，本人使用配置方式未生效；另外，<font color='red'>以上两种方式只能2选1，都配置会导致显示失败。</font>

##### 配置方式

修改主题配置文件`/theme/next/_config.yml`：

```yml
# Show PV/UV of the website/page with busuanzi.
# Get more information on http://ibruce.info/2015/04/04/busuanzi/
busuanzi_count:
  # count values only if the other configs are false
  enable: true
  # custom uv span for the whole site
  site_uv: true
  site_uv_header: <i class="fa fa-user"></i>
  site_uv_footer: 人
  # custom pv span for the whole site
  site_pv: true
  site_pv_header: <i class="fa fa-eye"></i>
  site_pv_footer: 次
  # custom pv span for one page only
  page_pv: true
  page_pv_header: <i class="fa fa-file-o"></i>
  page_pv_footer:
```

##### 脚本方式

修改站点配置文件：

```yml
footer:
  # Specify the date when the site was setup.
  # If not defined, current year will be used.
  since: 2018

  # Icon between year and copyright info.
  icon: heart

  # If not defined, will be used `author` from Hexo main config.
  copyright:
  # -------------------------------------------------------------
  # Hexo link (Powered by Hexo).
  powered: true
  
  # 访问量
  counter: true		#增加内容
```

在`themes/next/layout/_partial/footer.swig`中添加以下代码：

```html
{% if theme.footer.counter %}
    <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
	<span class="post-meta-divider">|</span>
    <span id="busuanzi_container_site_uv"><i class="fa fa-user">：</i><span id="busuanzi_value_site_uv"></span></span>
    <span class="post-meta-divider">|</span>
    <span id="busuanzi_container_site_pv"><i class="fa fa-eye">：</i><span id="busuanzi_value_site_pv"></span></span>
  {% endif %}
```

重新部署。

#### 文章阅读次数统计
注册[LeanCloud](https://leancloud.cn/)后创建应用及class，得到appid及appkey
![iYfmKf.gif](http://img.qizhenjun.com/3.gif)

修改`\themes\next\languages\zh-Hans.yml`:

```python
post:
  created: 创建于
  modified: 更新于
  sticky: 置顶
  posted: 发表于
  in: 分类于
  read_more: 阅读全文
  untitled: 未命名
  toc_empty: 此文章未包含目录
  visitors: 阅读次数
  wordcount: 字数统计
  min2read: 阅读时长
  totalcount: Site words total count
```
修改`\themes\next\_config.yml`:
```js
leancloud_visitors:
  enable: true
  app_id: LeanCloud中的appid
  app_key: LeanCloud中的appkey
```
重新生成部署：
[![iJCL6K.md.png](http://img.qizhenjun.com/TIM截图20180926113554.png)](https://imgchr.com/i/iJCL6K)

#### 返回顶部
修改`\themes\next\_config.yml`:
```js
  # Back to top in sidebar (only for Pisces | Gemini).
  b2t: true
```
效果图：
[![iJinbD.png](http://img.qizhenjun.com/4.gif)](https://imgchr.com/i/iJinbD)

#### 本地搜索功能
安装`hexo-generator-searchdb`:
```JS
npm install hexo-generator-searchdb --save
```
编辑`\_config.yml`:
```js
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```
编辑`\themes\next\_config.yml`:
```js
# Local search
local_search:
  enable: true
```
重新生成部署：
[![iJCql6.md.gif](http://img.qizhenjun.com/5.gif)](https://imgchr.com/i/iJCql6)

#### 静态资源及文章压缩

**hexo-all-minifier** :文章缩进不支持

```shell
npm install hexo-all-minifier --save
```

**gulp** :html、js、css、图片 、文章

```shell
npm install gulp -g
npm install gulp-minify-css gulp-uglify gulp-htmlmin gulp-htmlclean gulp --save
```

​	在`\themes\next`目录下新建`gulpfile.js  `

```js
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
// 压缩 public 目录 css
gulp.task('minify-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});
// 压缩 public 目录 html
gulp.task('minify-html', function() {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
         removeComments: true,
         minifyJS: true,
         minifyCSS: true,
         minifyURLs: true,
    }))
    .pipe(gulp.dest('./public'))
});
// 压缩 public/js 目录 js
gulp.task('minify-js', function() {
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});
// 执行 gulp 命令时执行的任务
gulp.task('default', [
    'minify-html','minify-css','minify-js'
]);
```

在执行`hexo g`时就会对资源进行压缩.

#### 百度分享

修改`\themes\next\_config.yml`

```yml
baidushare:
  type: slide
  baidushare: true
```

下载[static文件](https://github.com/hrwhisper/baiduShare),解压后放到`\themes\next\source`目录下，

修改`themes\next\layout_partials\share\baidushare.swig `文件末尾部分：

```swig

```

重新生成后效果如下：

![iJC7f1.png](http://img.qizhenjun.com/TIM截图20180928141541.png)

推荐一份更详细的攻略：`https://reuixiy.github.io/technology/computer/computer-aided-art/2017/06/09/hexo-next-optimization.html`

#### 字体大小

修改`\themes\next\source\css\_variables\base.styl`：

```styl
// Font size
$font-size-base           = 16px
```

#### 文章字体颜色

创建文件：`themes\next\source\css\_variables\custom.styl`

```styl
// text-color
$text-color = #eee
```

#### 打赏

准备支付宝和微信的付款二维码，修改主题配置文件：

```YML
# Reward
#reward_comment: Donate comment here
wechatpay: http://img.qizhenjun.com/wechatpay.png
alipay: http://img.qizhenjun.com/alipay.jpg
#bitcoin: /images/bitcoin.png
```

路径可以是url，也可以是相对路径，可以将图片放到`\themes\next\source\images`下，路径填`/images/wechatpay.png`

#### 页面背景

在文件`\themes\next\layout\_layout.swig`最后增加：

```html
<!-- 页面背景 --> 
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-backstretch/2.0.4/jquery.backstretch.min.js"></script>;
	<script>
		$("body").backstretch("http://img.qizhenjun.com/timg%20%2810%29.jpg");
	</script>
```

#### 相关文章

创建文件`\themes\next\scripts\related_posts.js`

```js
hexo.extend.helper.register('related_posts', function(currentPost, allPosts){
    var relatedPosts = [];
    currentPost.tags.forEach(function (tag) {
        allPosts.forEach(function (post) {
            if (isTagRelated(tag.name, post.tags)) {
                var relatedPost = {
                    title: post.title,
                    path: post.path,
                    weight: 1
                };
                var index = findItem(relatedPosts, 'path', post.path);
                if (index != -1) {
                    relatedPosts[index].weight += 1;
                } else{
                    if (currentPost.path != post.path) {
                        relatedPosts.push(relatedPost);
                    };
                };
            };
        });
    });
    if (relatedPosts.length == 0) {return ''};
    var result = '<div class="post-body"><div class="note primary"><div class="recommended_posts"><h4 class="recommended" style="color:red; text-align:left"> 相关文章：</h4><ul class="recommended-ul">';
    relatedPosts = relatedPosts.sort(compare('weight'));
    for (var i = 0; i < Math.min(relatedPosts.length, 5); i++) {
        result += '<li style="text-align:left; margin:5px;"><a href="/' + relatedPosts[i].path + '">' + relatedPosts[i].title + '</a></li>';
    };
    result += '</ul></div></div></div>';
    // console.log(relatedPosts);
    return result;
});
hexo.extend.helper.register('echo', function(path){
  return path;
});
function isTagRelated (tagName, TBDtags) {
    var result = false;
    TBDtags.forEach(function (tag) {
        if (tagName == tag.name) {
            result = true;
        };
    })
    return result;
}
function findItem (arrayToSearch, attr, val) {
    for (var i = 0; i < arrayToSearch.length; i++) {
        if (arrayToSearch[i][attr] == val) {
            return i
        };
    };
    return -1;
}
function compare (attr) {
    return function (a, b) {
        var val1 = a[attr];
        var val2 = b[attr];
        return val2 - val1;
    }
}
```

在文件`\themes\next\layout\_macro\post.swig`对应位置添加如下内容：

```swig
<!--  以下添加的内容 -->
<div>
		{% if not is_index %}
			{% include 'passage-end-tag.swig' %}
		{% endif %}
	</div>
<!--  以上为添加的内容 -->

    <footer class="post-footer">
      {% if post.tags and post.tags.length and not is_index %}
        <div class="post-tags">
          {% for tag in post.tags %}
            <a href="{{ url_for(tag.path) }}" rel="tag"><i class="fa fa-tag"></i> {{ tag.name }}</a>
          {% endfor %}
```

添加样式`\themes\next\source\css\_custom\custom.styl`:

```css
// 自定义的推荐文章样式
h4.recommended {
    margin-top: 5px !important;
    border-left: none !important;
    margin-left: 0px !important;
    padding-left: 0px !important;
}
@media (max-width: 767px) {
    .recommended-ul {
        margin-left: -40px;
    }
}
.recommended_posts {
    margin-top: 15px;
}
```

主题配置文件打开note开关：

```yml
note:
  # Note tag style values:
  #  - simple    bs-callout old alert style. Default.
  #  - modern    bs-callout new (v2-v3) alert style.
  #  - flat      flat callout style with background, like on Mozilla or StackOverflow.
  #  - disabled  disable all CSS styles import of note tag.
  style: flat
  icons: true
  border_radius: 3
  # Offset lighter of background in % for modern and flat styles (modern: -12 | 12; flat: -18 | 6).
  # Offset also applied to label tag variables. This option can work with disabled note tag.
  light_bg_offset: 0
```

重新部署

![相关文章](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181016100305.png)

#### 评论

需要用到LeanCloud的appID和appKey，前面文章阅读次数统计中有详细的获取方法，修改主题配置文件：

```yml
valine:
  enable: true
  appid: #leanCloud  appid
  appkey: #leanCloud  appkey
  notify: false # mail notifier , https://github.com/xCss/Valine/wiki
  verify: false # Verification code
  placeholder:  # comment box placeholder
  avatar: mm # gravatar style
  guest_info: nick,mail,link # custom comment header
  pageSize: 10 # pagination size
```

最后需要在LeanCloud的安全中心将我们的域名加到安全域名中

![c](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181016103257.png)

实际效果可以查看本文下方的评论。

#### 球形标签云

下载`js`文件：[tagcanvas.js](http://www.goat1000.com/tagcanvas.js?2.8)放到`\themes\next\source\js\src`目录下，

在`\themes\next\layout\_partials\plugin`目录下创建：`tagcanvas.swig`

```html
<div class="tags" id="myTags">
  <canvas width="350" height="350" id="my3DTags">
    <p>Anything in here will be replaced on browsers that support the canvas element</p>
  </canvas>
</div>
<div class="tags" id="tags">
  <ul style="display: none">
    {{ tagcloud({
      min_font: 16,
      max_font: 35,
      amount: 999,
      color: true,
      start_color: 'red',
      end_color: 'red',
    }) }}
  </ul>
</div>
<script type="text/javascript" src="/blog/js/src/tagcanvas.js"></script>
<script type="text/javascript" >
  window.onload = function() {
    try {
      TagCanvas.Start('my3DTags','tags',{
        textFont: 'Georgia,Optima',
        textColour: null,
        outlineColour: 'black',
        weight: true,
        reverse: true,
        depth: 0.8,
        maxSpeed: 0.05,
        bgRadius: 1,
        freezeDecel: true
      });
    } catch(e) {
      // something went wrong, hide the canvas container
      document.getElementById('myTags').style.display = 'none';
    }
  };
</script>
```

修改`\themes\next\layout\page.swig`文件：

```html
        {# tagcloud page support #}
        {% if page.type === "tags" %}
          <div class="tag-cloud">
            <div class="tag-cloud-title">
                {{ _p('counter.tag_cloud', site.tags.length) }}
            </div>
            {###<div class="tag-cloud-tags">###}
              {###{{ tagcloud({min_font: 13, max_font: 31, amount: 1000, color: true, start_color: '#9733EE', end_color: '#FF512F'}) }}###}
            {###</div>###}
			{# tagcanvas plugin 球型云标签 #}
			{% include '_partials/plugin/tagcanvas.swig' %}
          </div>
```

重新生成部署，效果图：

![boo	](http://img.qizhenjun.com/18.gif)





