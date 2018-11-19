---
title: hexo博客-百度收录
date: 2018/10/09 13:46:25
categories: hexo
tags: [nexT, 百度收录]

---

**摘要：**使用hexo+github+域名搭建的博客收录到百度，方便他人搜索。

<!-- more -->

## 添加网站

首先进入[百度搜索资源平台](https://ziyuan.baidu.com/site/siteadd)，

### 输入网站

[![iJPuhn.md.gif](http://img.qizhenjun.com/TIM截图20180930093028.png)](https://imgchr.com/i/iJPuhn)

### 站点属性

[![iJPQ10.md.png](http://img.qizhenjun.com/TIM截图20180930093202.png)](https://imgchr.com/i/iJPQ10)

### 验证网站

#### 文件验证

[![iJPlcV.md.png](http://img.qizhenjun.com/TIM截图20180930093406.png)](https://imgchr.com/i/iJPlcV)

需要将验证文件放到主题文件的`source`目录下，执行`hexo d -g`后验证。

#### html标签验证

[![iJP1XT.md.png](http://img.qizhenjun.com/TIM截图20180930093706.png)](https://imgchr.com/i/iJP1XT)

#### CNAME验证

[![iJP8nU.md.png](http://img.qizhenjun.com/TIM截图20180930133403.png)](https://imgchr.com/i/iJP8nU)

## 链接提交

### 主动推送

安装插件`npm install hexo-baidu-url-submit --save`，然后在站点配置文件中增加如下内容：

```txt
baidu_url_submit:
  count: 10 # 提交最新的10个链接
  host: cilife.top # 在百度站长平台中验证的域名
  token:  # 请注意这是您的秘钥，在百度搜索资源平台的站点管理中能够找到
  path: baidu_urls.txt # 文本文档的地址， 新链接会保存在此文本文档里
```

```txt
deploy:
 - type:baidu_url_submitter
```

之后执行`hexo d -g`会主动推送：

![iJPGBF.png](http://img.qizhenjun.com/TIM截图20180930134036.png)

### 自动推送

自动推送是百度搜索资源平台为提高站点新增网页发现速度推出的工具，安装自动推送JS代码的网页，在页面被访问时，页面URL将立即被推送给百度。

将如下`js`代码复制到`themes\next\layout_scripts\baidu_push.swig`

```js
<script>
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
</script>
```

然后修改主题配置文件：

```yaml
baidu_push: true
```

### sitemap

安装sitemap插件：

```python
npm install hexo-generator-sitemap --save     
npm install hexo-generator-baidu-sitemap --save
```

修改博客配置文件中的`url`为自己的地址：

```yaml
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://qizhenjun.com
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:
```

在`public`目录下会生成**`sitemap.xml`和`baidusitemap.xml`文件**，执行`hexo d -g`后可以通过访问：`站点地址/baidusitemap.xml`来验证，

将上述地址添加至百度搜索资源平台：

[![iJPtAJ.md.png](http://img.qizhenjun.com/TIM截图20180930134911.png)](https://imgchr.com/i/iJPtAJ)

## url优化

使用hexo编译的站点打开文章的url是：sitename/year/mounth/day/title四层的结构，这样的url结构很不利于seo，爬虫就会经常爬不到我们的文章，修改方式如下：

```yml
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://qizhenjun.com
root: /
#permalink: :year/:month/:day/:title/
permalink: :title.html
permalink_defaults:
```

可以自行修改。

访问展示：

[![iJPNN9.md.png](http://img.qizhenjun.com/TIM截图20180930135736.png)](https://imgchr.com/i/iJPNN9)