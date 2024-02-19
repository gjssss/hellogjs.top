---
title: test-zh
---

# Welcome to Leanote! 欢迎来到Leanote!

## 1. 排版

**粗体** _斜体_

~~这是一段错误的文本。~~

引用:

> 引用Leanote官方的话, 为什么要做Leanote, 原因是...

有充列表:

1.  支持Vim
2.  支持Emacs

无序列表:

- 项目1
- 项目2

## 2. 图片与链接

图片:
![leanote](http://leanote.com/images/logo/leanote_icon_blue.png)
链接:

[这是去往Leanote官方博客的链接](http://leanote.leanote.com)

## 3. 标题

以下是各级标题, 最多支持5级标题

```
# h1
## h2
### h3
#### h4
##### h4
###### h5
```

## 4. 代码

示例:

    function get(key) {
        return m[key];
    }

代码高亮示例:

```javascript
/**
* nth element in the fibonacci series.
* @param n >= 0
* @return the nth element, >= 0.
*/
function fib(n) {
  var a = 1, b = 1;
  var tmp;
  while (--n >= 0) {
    tmp = a;
    a += b;
    b = tmp;
  }
  return a;
}

document.write(fib(10));
```

```python
class Employee:
   empCount = 0

   def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.empCount += 1
```
