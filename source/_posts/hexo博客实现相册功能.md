---
title: hexo博客增加相册功能
date: 2018/10/11 13:46:25
categories: Hexo
tags: [Hexo]
---

hexo实现相册功能很容易，但是如果把图片都放到github仓库，时间久了会浪费很多资源，于是想到将照片放到七牛云去管理。

<!-- more -->

## 新增相册页面

在博客根目录下执行`hexo new page photos`,在`source\photos\index.md`文件中新增：`type: photos`

![ph](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181026100841.png)

## 添加导航栏内容

在主题配置文件`\themes\next\_config.yml`对应位置添加`photos: /photos || camera-retro`

![con](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181026101225.png)

如果要在页面显示中文，需要修改`\themes\next\languages\zh-Hans.yml`

![zh](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181026101346.png)

## 上传图片到七牛云并生成json文件

在博客根目录创建`photos`目录，进入目录创建`tools.py`以及`photos`文件夹，将自己的图片放到`/photos/photos`目录中，`tools.py`文件内容如下：

```python
# coding: utf-8
from PIL import Image
from qiniu import build_batch_stat, Auth, BucketManager, Auth, put_file, etag
from itertools import islice
from pathlib import Path
import qiniu.config
import os
import sys
import json
from datetime import datetime
from ImageProcess import Graphics

# 定义压缩比，数值越大，压缩越小
SIZE_normal = 1.0
SIZE_small = 1.5
SIZE_more_small = 2.0
SIZE_more_small_small = 3.0

ACCESS_KEY = '去七牛云获取'
SECRET_KEY = '去七牛云获取'

BUCKET_NAME = '自己的七牛云空间'

auth = Auth(ACCESS_KEY, SECRET_KEY)
bucket = BucketManager(auth)


def make_directory(directory):
    """创建目录"""
    os.makedirs(directory)


def directory_exists(directory):
    """判断目录是否存在"""
    if os.path.exists(directory):
        return True

    else:
        return False


def list_img_file(directory):
    """列出目录下所有文件，并筛选出图片文件列表返回"""
    old_list = sorted(os.listdir(directory), reverse=True)
    print(old_list)
    new_list = []
    for filename in old_list:
        new_list.append(filename)
    return new_list


def handle_photo():
    '''
    更新json文件
    '''
    # 前缀
    prefix = None
    # 列举条目
    limit = 10
    # 列举出除'/'的所有文件以及以'/'为分隔的所有前缀
    delimiter = None
    # 标记
    marker = None
    ret, eof, info = bucket.list(BUCKET_NAME, prefix, marker, limit, delimiter)
    print(info)
    file_list = []
    for obj in ret.get('items'):
        file = obj.get('key')
        fdir = Path('./photos/') / file
        img = Image.open(fdir)
        width = str(img.size[0])
        height = str(img.size[1])
        file_info = width + '.' + height + ' ' + file
        file_list.append(file_info)
    print(file_list)
    with open("../source/photos/photoslist.json", "w") as fp:
        json.dump(file_list, fp)


def qiniuyun_operation():
    '''
    上传图片
    '''
    dir_list = {'photos/'}
    for dir in dir_list:
        file_list = list_img_file(dir)
        if file_list:
            for infile in file_list:
                localfile = dir + infile
                token = auth.upload_token(BUCKET_NAME, infile)
                ret, info = put_file(token, infile, localfile)
                print(info)
        else:
            pass


if __name__ == "__main__":
    qiniuyun_operation()  # 提交到七牛云OSS服务器
    handle_photo()  # 将文件处理成json格式，存到博客仓库中
```

执行`tool.py`后，会在`\source\photos`目录生成json文件。

## 需要的js文件

在`/themes/next/source/js/src/`目录创建`photo.js`和`minigrid.min.js`

photo.js:

```javascript
photo ={
    page: 1,
    //offset 用于设置照片数量的上限
    offset: 20,
    init: function () {
        var that = this;
        //这里设置的是刚才生成的 json 文件路径,注意自己的域名地址
        $.getJSON("/blog/photos/photoslist.json", function (data) {
            that.render(that.page, data);
            //that.scroll(data);
        });
    },
    render: function (page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, imgNameWithPattern, imgName, imageSize, imageX, imageY, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
           imgNameWithPattern = data[i].split(' ')[1];
           imgName = imgNameWithPattern.split('.')[0]
           imageSize = data[i].split(' ')[0];
           imageX = imageSize.split('.')[0];
           imageY = imageSize.split('.')[1];
           //这里 250 指的是图片的宽度，可以根据自己的需要调整相册中照片的大小
            li += '<div class="card" style="width:250px">' +
                    '<div class="ImageInCard" style="height:'+ 250 * imageY / imageX + 'px">' +
                    //href 和 src 的链接地址是相册照片外部链接，也可以放博客目录里
                      '<a data-fancybox="gallery" href="http://photo.qizhenjun.com/' + imgNameWithPattern + '?raw=true" data-caption="' + imgName + '">' +
                        '<img src="http://photo.qizhenjun.com/' + imgNameWithPattern + '?raw=true"/>' +
                      '</a>' +
                    '</div>' +
                    // '<div class="TextInCard">' + imgName + '</div>' +  //图片下显示文件名作为说明的功能
                  '</div>'
        }
        $(".ImageGrid").append(li);
        $(".ImageGrid").lazyload();
        this.minigrid();
    },
    minigrid: function() {
        var grid = new Minigrid({
            container: '.ImageGrid',
            item: '.card',
            gutter: 12
        });
        grid.mount();
        $(window).resize(function() {
           grid.mount();
        });
    }
}
photo.init();

```

`minigrid.min.js`：[下载地址](https://unpkg.com/minigrid@3.1.1/dist/minigrid.min.js)

## 文件修改

修改`/themes/next/layout/_scripts/commons.swig`

```html
{% if page.type ==='photos' %}
{%
  set js_commons = [
    'src/utils.js',
    'src/motion.js',
    'src/minigrid.min.js',
    'src/photo.js',
  ]
%}
{% else %}
{%
  set js_commons = [
    'src/utils.js',
    'src/motion.js'
  ]
%}
{% endif %}

{% for common in js_commons %}
  <script type="text/javascript" src="{{ url_for(theme.js) }}/{{ common }}?v={{ theme.version }}"></script>
{% endfor %}

```

修改`themes\next\layout\page.swig`

```html
        {% elif page.type === 'categories' %}
          <div class="category-all-page">
            <div class="category-all-title">
                {{ _p('counter.categories', site.categories.length) }}
            </div>
            <div class="category-all">
              {{ list_categories() }}
            </div>
          </div>
          {#新增内容#}
		{% elif page.type === 'photos' %}
		  <div class="ImageGrid"></div>
```

## 样式

在`\themes\next\source\css\_custom\custom.styl`文件中新增

```css
//相册样式
.ImageGrid {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  text-align: center;
}

.card {
  overflow: hidden;
  transition: .3s ease-in-out;
  border-radius: 8px;
  background-color: #ddd;
}

.ImageInCard img {
  padding: 0 0 0 0;
  border-radius: 8px;
}
```

## 开启lazyload和fancybox

在主题配置文件中修改：

```yml
  # Internal version: 1.9.7
  # See: https://github.com/tuupola/jquery_lazyload
  lazyload: https://cdn.jsdelivr.net/npm/lazyload@2.0.0-beta.2/lazyload.js
```

```yml
# Fancybox
fancybox: true
```

```yml
vendors:
  # Internal path prefix. Please do not edit it.
  _internal: lib

  # Internal version: 2.1.3
  jquery:

  # Internal version: 2.1.5
  # See: http://fancyapps.com/fancybox/
  fancybox: https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.3.5/jquery.fancybox.min.js
  fancybox_css: https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.3.5/jquery.fancybox.min.css

  # Internal version: 1.0.6
  # See: https://github.com/ftlabs/fastclick
  fastclick:

  # Internal version: 1.9.7
  # See: https://github.com/tuupola/jquery_lazyload
  lazyload: https://cdn.jsdelivr.net/npm/lazyload@2.0.0-beta.2/lazyload.js

```

## 重新部署后查看效果

![cam](http://img.qizhenjun.com/TIM%E6%88%AA%E5%9B%BE20181026103424.png)

