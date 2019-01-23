---
title: JS对HTML内容进行转义
categories: ['前端'，'JavaScript']
---

```js
HTMLEncode (html) {
      let temp = document.createElement('div');
      (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html)
      let output = temp.innerHTML
      temp = null
      return output
    }
```



```js
HTMLDecode (text) {
      let temp = document.createElement('div')
      temp.innerHTML = text
      const output = temp.innerText || temp.textContent
      temp = null
      return output
    },
```

