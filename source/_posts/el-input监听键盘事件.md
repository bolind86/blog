---
title: element el-input组件监听键盘事件
date: 2019/02/14 10:16:00
categories: [前端, Vue]
tags: [Vue]
---

```vue
<el-input v-model="form.name" autocomplete="off" clearable :style="{width: 400 + 'px'}" @keyup.enter.native='moduleEditSubmit'></el-input>
```

普通的`input`输入框使用`@keyup.enter`即可，`input`组件需要加`.native`

