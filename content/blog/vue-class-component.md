---
title: Vue组件类初步想法
date: 2023-03-24T00:00:00.000+08:00
---

## 🤓介绍

对于每一个组件可以相当于一个对象，不同类型的组件也会有相同的属性，可以通过继承的方式，从基础Base组件抽象到高级组件，如果使用面向对象的思想和继承的方式来编写组件将大大减少工作量。

<!-- more -->

## :chestnut:举个栗子

有了Javascript，我们几乎可以做任何事情，所以先不考虑如何实现，先来构想一下应该怎么使用它。

从例子出发可能会比较有思路，比如对于一个可视化编辑器来说，从展示栏里可以拖拽组件到编辑器内，点击编辑器后控制栏会显示这个组件的可以改变的属性，而改变属性又会实时的改变编辑器内组件的行为。

这个例子中编辑器的组件不仅有在展示栏里的预览，还有在编辑器内的显示，还需要再控制栏里渲染控制它自身属性的表单。这么看来它一共有三种渲染的内容：

- 首先在展示栏的预览很容易实现，因为它只需要是静态的呆在那里就好，可以设计成类的静态变量或者方法，我叫它preview。
- 在编辑器内显示的部分可能有点难以入手，而且他的设计必须是可以被继承的子代修改，当然并不是全部修改（如果全部修改那么和单独写组件有啥区别）。举一个例子就是在点击组件时，所有组件都有一个点击时会使当前组件被选中的事件，那它就可以放到基类里，我叫它component。
- 最后的在控制栏渲染更改组件属性的表单，这个渲染表单的实际上需要一个生成函数将组件可更改的属性编译成可以渲染表单的数据，今天我们先简单的就显示一下组件名字吧，我叫它form。（其实原理是一样的，可以显示名字则说明可以访问到组件实例，根据实例里的数据渲染表单自然也不在话下）

## :champagne: 开始启航！

首先我期望我的代码是这样的（这边的名字上面我叫XXX已经介绍过了）

`preview`

```vue
<script setup>
/*   不管怎么样，不需要获取到组件类的实例，直接使用类变量   */
const buttonPreview = Button.preview
const imgPreview = Img.preview
</script>

<template>
  <button-preview />
  <img-preview />
</template>
```

`component`

```vue
<script setup>
/*   不管怎么样获取到组件类的实例   */
const buttonComponent = button.render
const imgComponent = img.render
</script>

<template>
  <button-component />
  <img-component />
</template>
```

`form`上面说了先不讨论渲染出来表单，我们先渲染一个名字`button.name`和`img.name`

上面的代码就是使用时候的API，那么我们来编写满足这个API的类吧！

首先`Base.js`

```js
export class Base {
  constructor(props) {
    // 注册组件，保存生成的id
    this.id = registerComponent(this)
    // 将props转化成响应式的
    this.props = reactive(props)
    // 这里是关键的一步，看代码后的解释
    this.render = computed(() => {
      return h(
        'div',
        {
          onClick: () => {
            // 选中组件
            selectComponent(this.id)
          },
          class: 'select-wapper',
        },
        this._render()()
      )
    })
    // 定义组件名字
    this.name = 'Base'
  }

  // 同上，看解释
  _render() {
    return () => h('div', this.props)
  }

  // 类getter获取到组件预览
  static get preview() {
    return h('div', {}, 'Base')
  }
}
```

最关键的一步就是获取到组件在编辑器中渲染的组件了，也就是上面的render。可以发现在API中是直接使用`button.render`调用的，多编写一层computed的原因首先是computed可以缓存return的内容，在内容没有改变的时候就不会重新生成，第二个原因是在继承Base进行重写渲染函数的时候，只需要修改\_render()函数的内容，在子组件里不需要管render就可以使用了，并且在render内还加了一层div用来响应点击时切换选中组件的复用逻辑。

看一下继承Base类的Button类就可以知道为什么这么设计

`button.js`

```js
export class Button extends Base {
  constructor(props, option) {
    super(props)
    this.option = reactive(option)
    this.props = reactive({ ...this.props, ...this.option })

    this.name = 'button'
  }

  _render() {
    return () => h(NButton, this.props, () => this.content.value)
  }

  static get preview() {
    return h(NButton, { type: 'default' }, () => '按钮')
  }
}
```

可以看到我们只需要将额外的option加入到响应的props中，并且编写我们自己的\_render()函数就可以完成组件的继承

一个简单的例子来验证我们的成果！⭐

```vue
<script setup>
const button = new Button(
  {
    style: {
      padding: '10px',
      color: 'blue',
    },
    class: ['trans-all'],
    onclick: () => {
      button.props.type = 'warning'
      button.props.style.padding = '20px'
      button.props.style.color = 'gray'
      button.props.style.margin = '10px'
      button.props.class.push('fs-xl')
    },
  },
  { type: 'primary' }
)
const buttonComponent = button.render
</script>

<template>
  <button-component />
</template>

<style>
.trans-all {
  transition: 'all 0.225s ease-in-out';
}
.fs-xl {
  'font-size':26px;
}
</style>
```

当我们点击组件的时候就可以看到组件的变化，我们成功了！

现在可以理解为什么表单部分不太重要了，因为我们仅仅需要获取到组件实例就可以解决了！我们只需要改变组件内的属性就可以控制组件的大部分行为和样式，所以我们表单组件做的事情只是和上面`onClick`事件内做的事情一样——修改类的属性而已！

## 总结

这个设计模式只是我对自己一天思考和探索的总结，不知道有没有类似或者相同的方案，或者有更完善、更优雅的解决方式，总之这只是我一个初步的探索，也许随着项目的推进和我技术的提高，还会不断的改进。

这个设计思想其实和其他语言、其他平台上UI界面部分有点类似（C、C#等我接触到的一部分UI程序），而且其实也很容易想到。其实要解决一个组件三次渲染的问题，实际上就是数据共享的问题，即让表单数据和显示的组件的数据响应式的连接起来，其实大可以都用store解决，但是不太优雅。而且一个`.vue`文件没办法写三个渲染组件（用`template`（应该）），所以就尝试用新思路解决问题。
