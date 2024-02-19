---
title: 低代码平台的一些问题
date: 2023-03-25T00:00:00.000+08:00
---

在[组件类的初步想法]([Vue组件类初步想法 | gjssss (hellogjs.top)](https://blog.hellogjs.top/article/想法/vue组件类初步想法/))中初步说明了如何使用继承等类的方式来控制组件，实现组件一些抽象和自动化行为

当前提交的commit为`#0a23100`（日后可能会改变），实现的功能有🤩

- 实现组件可继承，可复用
- 实现属性的双向绑定，表单的渲染以及组件独有属性的渲染

<!-- more -->

## 属性表单的渲染

属性表单目前想的是，有一些所有组件都有的属性，比如一些style，如高度、宽度、边框、颜色等等，可以直接固定在属性表单组件内，而一些组件特有的属性，例如按钮的type、是否圆角等，可以写到组件在选中时内单独渲染。

模块结构为

```
LOW CODE\SRC\SIDE-BAR
|   side-bar.vue # 侧边栏
|   side-com.vue # 组件预览
|   side-prop.vue # 组件表单属性
|
+---components # 业务组件
|       border-prop.vue # 边框组件
|       size-prop.vue # 尺寸组件
|
\---widgets # 可复用组件
        base-props.vue # 表单基础
        four-props.vue # 四属性值特用
        prop-layout.vue # 控制表单元素布局
```

其中`prop-layout.vue`是最重要的一个布局组件，为了实现使用h函数生成vnode，主要作用是实现了一下代码的转化

例如在使用的时候可以用

```vue
<div size="12">
    <span  class="iconfont text-18px icon-color" />
    <n-color-picker :modes="['hex']" v-model:value="selectColor" />
</div>

<div size="12">
    <span class="iconfont text-18px icon-line-solid" />
    <n-select v-model:value="selectStyle" :options="borderStyle" />
</div>

<div size="24">
    <span class="iconfont text-18px icon-line-solid" />
    <n-select v-model:value="selectStyle" :options="borderStyle" />
</div>
```

会被渲染成

```vue
<div class="flex flex-row flex-wrap w-full">
    <div class="flex flex-row py-4px flex-center" style="width: 50%" >
        <div class="flex-center px-5px w-20%">
            <span  class="iconfont text-18px icon-color" />
        </div>

        <n-color-picker class="w-80%" :modes="['hex']" v-model:value="selectColor" />

    </div>
    <div class="flex flex-row py-4px flex-center" style="width: 50%">
        <div class="flex-center px-5px w-20%">
            <span class="iconfont text-18px icon-line-solid" />
        </div>

        <n-select class="w-80%" v-model:value="selectStyle" :options="borderStyle" />

    </div>
    <div class="flex flex-row py-4px flex-center" style="width: 100%">
        <div class="flex-center px-5px w-20%">
            <span  class="iconfont text-18px icon-line-solid" />
        </div>

        <n-select class="w-80%" v-model:value="selectStyle" :options="borderStyle" />
    </div>
</div>
```

可以实现根据我设计的样式自动生成，并且根据size自动布局，24为100%，12为50%（其他数字的比例也能用，但是我用不到）

`base-props.vue`主要实现卡片的逻辑和布局，控制是否有开关的卡片、控制元素渲染等

`four-props.vue`主要是为了控制类似padding、margin这种可以输入上下左右四个值的组件（不能和普通的样式属性一样，比如我要是输入左margin为10px`margin-left: 10px;`那么此时我再设置margin`margin: 20px;`就会失效，只能通过解析margin的值，判断二值、三值、四值的情况）

## 组件特有属性的实现与渲染

目前定义属性的方法如下

```js
this.extraProps['按钮属性'].push(
  this.registerPropGroup(
    { name: '按钮' },
    this.registerSelect(
      { name: 'type', icon: '类型', size: 12 },
      {
        default: 'default',
        options: [
          'default',
          'tertiary',
          'primary',
          'info',
          'success',
          'warning',
          'error',
        ],
      }
    ),
    this.registerSwitch(
      { name: 'circle', icon: '圆角', size: 12 },
      {
        default: false,
      }
    ),
    this.registerInput(
      { name: 'circle', icon: '内容', size: 24 },
      {
        default: '按钮',
        isContent: true,
      }
    )
  )
)
```

想法是通过js自动渲染出表单组件入栈，使用列表循环遍历列表渲染

例如这里的`registerSelect`函数是渲染出类似上文`<div size="12" />`的内容，`registerPropGroup`是渲染出类似`base-prop`的内容，整体比较来看就相当于把上文固定写道prop里的东西，使用js定义在组件内，这样就实现了不同组件渲染不同表单（感觉这里的实现方法可能效率不好，因为每个组件的表单vnode是在组件实例化的时候生成的，但是其实相同组件——例如两个按钮，拥有的表单是一样的，但却有两份稍微不同的vnode——双向绑定的数据不同，可能会有点浪费内存）

而这里的诸如`registerSelect`的函数都是通过h函数生成的vnode，可以参考代码
