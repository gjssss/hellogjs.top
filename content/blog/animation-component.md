---
title: 实现多组件切换的uniapp小程序动画组件
date: 2023-03-15T00:00:00.000+08:00
---

在Uniapp中，使用过渡动画提升用户体验是必不可少的，但是众所周知，uniapp还有很多关于vue的api或内置组件没有实现，而使用class数组控制组件动画还需要编写很多不必要的代码，并且降低程序的可扩展性，一个方便的动画组件就很有必要。

<!-- more -->

## 介绍

在uniapp官网有类似vue的transition的[扩展组件](https://uniapp.dcloud.net.cn/component/uniui/uni-transition.html)

> 这里我在使用这个组件的时候出现了一点bug，@change事件文档上说在动画播放完后执行，相当于动画的回调函数，但是在实际使用中发现动画一播放就被调用了（也有可能是因为eslint后fix出的错误）
>
> 对源码进行稍微修改就可以修复
>
> - 删除原本在`open()`和`close()`中的emits
> - 修改watch，在执行动画后，过了动画执行时间再调用回调函数
>
>   ```js
>   const watch = {
>     show: {
>       handler: (newVal) => {
>         if (newVal) {
>           this.open()
>           setTimeout(() => {
>             this.$emit('change', {
>               detail: true,
>             })
>           }, this.duration)
>         }
>         else {
>           // 避免上来就执行 close,导致动画错乱
>           if (this.isShow) {
>             this.close()
>             setTimeout(() => {
>               this.$emit('change', {
>                 detail: false,
>               })
>             }, this.duration)
>           }
>         }
>       },
>       immediate: true
>     }
>   }
>   ```
>
>   如果没有出现上述bug则可以继续进行

但是这个transition适用于单个组件的出现和消失动画，但是在实际项目中，我们其实对多组件切换动画的需求很大，可以对这个组件进行二次封装（尝试过直接改代码，因为代码是组合式并且好多标志变量混合难以编写）

## 实现过程

想到封装动画组件，弥补这个组件的功能空缺，很容易想到使用插槽api：`useSlots()`，根据获取到插槽内组件的vnode，就可以实现类似vue内置transition组件的那样通过`v-if`和`v-else`控制组件的切换动画与显示，但是很不幸，uniapp好几年了还没实现这个api（我看论坛中2020年就有人问，官方回应没有）（真是可以吐槽的了，为什么原生小程序都有动态组件，我认为动态组件和transition和transition-group这些内置组件完全可以实现，拖了这么长时间）

没办法，这条路被堵死了，所以这里想到了一个巧妙地办法。既然没办法在js里获取组件，那就只能在模板里给组件一层标识了，可以通过引入一个reactive对象，并且增加group属性，将group相同的组件为一组，把每一组的变量放到reactive对象中共享，这样就相当于组件和组件之间联系起来了

这里的核心逻辑就是这个watch了

```js
watch(
  () => ({
    condition: props.condition,
    flag: flags[props.group],
  }),
  (newVal) => {
    // 如果是false就表示正在退出，flag必须是false表示没有退出动画播放过
    if (!newVal.condition && !newVal.flag) {
      // 退出时position为absolute
      absolute.value = true
      transitionTrigger.value = false
      state.value = 'on hidden'
    }
    else if (newVal.condition && newVal.flag) {
      transitionTrigger.value = true
      absolute.value = false
      state.value = 'on shown'
    }
  },
  { deep: true }
)
```

`flags`就是在组件中引入的reactive对象用于存放相同group的共享变量，使用深层监视器观察这两个变量：`condition`是输入的显示条件表示现在是否显示，`flag`是标志着执行哪个动画的标志（因为我们要实现类似vue中transition的`out-in`模式，必须先执行退出动画再执行进入动画）

- 当`!newVal.condition && !newVal.flag`时就表示当前是**显示状态**并且**还没有执行结束动画**

- 当`newVal.condition && newVal.flag`时就表示当前是**隐藏状态**并且**执行过了结束动画**

这里flag为false的时候是准备执行结束动画，为true的时候是准备执行开始动画（算是控制状态了）

在动画结束后还需要对状态进行更新，绑定在@change事件上

```js
function changeHandle(flag) {
  if (state.value === 'on hidden') {
    // 表示刚刚完成退出动画
    flags[props.group] = true
    state.value = 'hidden'
  }
  if (state.value === 'on shown') {
    flags[props.group] = false
    state.value = 'shown'
  }
}
```

## 实现API

```vue
<com-switcher
:mode-class="['fade']"
:condition="current_select == 0"
group="index-commu"
>
    ...
</com-switcher>

<com-switcher
:mode-class="['fade']"
:condition="current_select == 1"
group="index-commu"
>
    ...
</com-switcher>
```

通过简单的调用就可以实现组件的切换（但是还是没有component动态组件优雅/(ㄒoㄒ)/~~）
