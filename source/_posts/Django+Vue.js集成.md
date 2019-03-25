---
title: Django集成Vue.js框架
date: 2018/12/18 19:26:00
categories: [软件测试, python, Django]
tags: [Django, vue]
---

`Django`项目集成`vue.js`前端框架方法（笔记）

<!-- more -->

# Django

## 创建Django项目

```powershell
django-admin startproject project_name
```

## 创建应用

```powershell
python manage.py startapp app_name
```

## 数据库操作

在`model.py`中编写数据库相关内容后

```powershell
python manage.py makemigrations	# 1. 创建更改的文件

python manage.py migrate	# 2. 将生成的py文件应用到数据库
```

## 启动服务器

```powershell
python manage.py runserver
```

# vue.js

此处使用的`D2Admin`，安装方法略。

## 创建前端项目

注意，需要在`Django`项目的根目录来创建。

```powershell
d2 create
# 根据提示操作
```

## 安装依赖

```powershell
cnpm install
```

## 构建前端项目

```powershell
npm run build
```

# 集成

# urls.py

1. `app`目录下新建`urls.py`，将views中的接口放进来。

   ```
   from . import views
   from django.conf.urls import url
   
   urlpatterns = [
       url(r'project_add$', views.project_add, ),
       url(r'project_query$', views.project_query, ),
   ]
   ```

2. `django`项目下的`urls.py`，

   ```python
   from django.contrib import admin
   from django.conf.urls import url, include
   from django.views.generic import TemplateView
   from citest import urls
   
   urlpatterns = [
       url('admin/', admin.site.urls),
       url(r'^api/', include(urls)),
       url(r'^$', TemplateView.as_view(template_name="index.html")),	# 通用视图
   ]
   
   ```

3. 模板搜索路径`setting.py`

   ```python
   TEMPLATES = [
       {
           'BACKEND': 'django.template.backends.django.DjangoTemplates',
           'DIRS': ['citest_web/dist']	# 修改内容
           ,
           'APP_DIRS': True,
           'OPTIONS': {
               'context_processors': [
                   'django.template.context_processors.debug',
                   'django.template.context_processors.request',
                   'django.contrib.auth.context_processors.auth',
                   'django.contrib.messages.context_processors.messages',
               ],
           },
       },
   ]
   ```

4. 静态文件路径`setting.py`

   ```python
   STATICFILES_DIRS = [
       os.path.join(BASE_DIR, "citest_web/dist/static"),
   ]
   ```

## 跨域

1. 安装`django-cors-headers`

   ```powershell
   pip install django-cors-headers
   ```

2. 修改`setting.py`

   ```python
   MIDDLEWARE = [
       'django.middleware.security.SecurityMiddleware',
       'django.contrib.sessions.middleware.SessionMiddleware',
       'corsheaders.middleware.CorsMiddleware',
       'django.middleware.common.CommonMiddleware',
       'django.middleware.csrf.CsrfViewMiddleware',
       'django.contrib.auth.middleware.AuthenticationMiddleware',
       'django.contrib.messages.middleware.MessageMiddleware',
       'django.middleware.clickjacking.XFrameOptionsMiddleware',
   ]
   
   CORS_ORIGIN_ALLOW_ALL = True
   ```

# 效果

运行`Django`项目后访问`/`就能打开`vue.js`项目的`index`页面

![index](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20181218195037.png)