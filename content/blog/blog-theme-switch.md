---
title: 博客主题切换动画
date: 2024-02-25T00:00:00.000+08:00
---

# 主题切换动画

可以看到在个人主页用到了明暗两种主题，在切换时有一个过渡的动画，在视觉上比较丝滑的切换主题，并且动画有着良好的兼容性。

![theme-cut](/images/theme-cut.png)

## 实现原理

通过在整个页面中添加一个蒙层

```html
<div id="__transition" />
```

使用SCSS设置整个蒙层的大小、位置和背景样式等

```scss
#__transition {
  z-index: $z-index;
  width: 200vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: -200vw;
  /* 设置蒙层形状，为一个梯形 */
  clip-path: polygon(0 0, 50% 0, 100% 100%, 0 100%);

  /* 使背景反色 */
  mix-blend-mode: difference;
  background: #fff;

  /* 添加过渡效果 */
  transition: transform 0.3s ease-in-out;
}
#__transition.hover {
  transform: translateX(100vw);
}
#__transition.active {
  transform: translateX(200vw);
}
```

具体蒙层和视口的位置和形状关系如下
![theme-demo](/images/theme-demo.png)
当hover时，将蒙层向右移动100vw使视口的一半被遮住；当click后，将蒙层向右移动200vw使整个视口被遮住。

## 具体实践

在Nuxt中使用`color-mode`来切换主题，在切换时需要使用主题图标的一些鼠标事件回调来控制蒙层的行为。

```ts twoslash
function toggle() {
  const colorMode = useColorMode()
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

let timer: NodeJS.Timeout | null = null
const MOVEIN_DELAY = 300

export const slideToggleDark = ref({
  // 当鼠标进入时，为了防止是因为鼠标扫过而造成屏幕闪烁，所以等待鼠标停留一段时间后再添加hover类
  onMouseenter: () => {
    timer = setTimeout(() => {
      timer = null
      const el = document.getElementById('__transition')!
      el.style.opacity = '1'
      el.classList.add('hover')
    }, MOVEIN_DELAY)
  },
  // 鼠标离开时清除定时器，并且移除类
  onMouseleave: () => {
    if (timer)
      clearTimeout(timer)

    const el = document.getElementById('__transition')!
    el.classList.remove('hover')
  },
  // 点击时添加active类
  onClick: () => {
    const el = document.getElementById('__transition')!
    el.style.opacity = '1'
    el.classList.add('active')
    setTimeout(() => {
      toggle()
      // 在过渡动画结束后切换主题并且隐藏遮罩
      el.style.opacity = '0'
      el.classList.remove('active')
      el.classList.remove('hover')
    }, MOVEIN_DELAY)
  },
})
```

此外还需要解决的问题是，当蒙层覆盖图片时，会使图片也被反色而显示错误。所以在样式中要设置`img`的`z-index`大于蒙层

```scss
img,
video,
picture {
  z-index: $z-index + 1;
  position: relative;
}
```

但是在文档中使用的emoji会造成反色的效果暂时无法解决/(ㄒoㄒ)/~~

并且由于鼠标事件绑定在切换主题按钮的DOM上，所以在hover时，蒙层从右下角升起来，如果覆盖到了主题切换按钮，就会导致切换主题失效。目前解决办法是将切换主题按钮放到右上角。
