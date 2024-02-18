---
title: Store数据抽象化想法
date: 2023-02-26T00:00:00.000+08:00
---

## 什么是Store数据抽象化

顾名思义，即使用Store将数据逻辑和页面逻辑分离，将数据逻辑抽象后供页面调用。经过数据抽象后的页面不管是可读性还是可维护性或是可扩展性都大大提高。因为数据不再和页面耦合，可以在预加载页面加载我们需要的数据，使应用流畅度提高。

<!-- more -->

## 如何抽象化

关于如何抽象化的问题，我们先来看一个简单的例子。

如果每个person有一个type属性表示类型，而people接口返回的是所有person的信息，我们需要在页面中获取到所需要的type的person，大致代码如下

```vue
<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const type = ref('')
const people = ref([])
const peopleWithType = ref([])

onMounted(() => {
  axios.get('api/people')
    .then(d => people.value = d.data)
})

function filterType() {
  return people.value.filter(item => item.type === type.value)
}
</script>

<template>
  <input v-model="type">
  <button @click="peopleWithType = filterType()">
    搜索
  </button>
  {{ peopleWithType }}
</template>
```

可以看到我们如果在页面维护数据逻辑的话，会导致页面和数据高度耦合，因为如果只需要看页面显示了什么的时候，我不需要知道它是怎么请求数据的，也不需要知道它在算法中是怎么操作数据的，也许目前的页面逻辑还算清晰，但是如果多加上类似Cat，Dog其他的类呢，他们也有单独的操作逻辑，这会导致页面变得复杂。如果我们需要在其他组件访问people，可能还需要进行传参或者赋值到Store内。

通过观察可以发现我们页面需要的不是操作数据的流程或者算法，我们需要的仅仅是它的结果和它是做什么的，所以可以尝试着这样调用。让我们简化一下代码。

```vue
<script setup>
import { ref } from 'vue'
import { usePeople } from './people.js'

const type = ref('')
const peopleWithType = ref([])

// 获取到people
const people = usePeople()
</script>

<template>
  <input v-model="type">
  <button @click="peopleWithType = people.filterType(type)">
    搜索
  </button>
  {{ peopleWithType }}
</template>
```

在页面中我们可以很清晰的看出是对people过滤它的type，这就像操作对象一样。而people可以使用另外一个js文件来定义，但是这里使用store会好一点，以pinia为例

```js
import { defineStore } from 'pinia'
import axios from 'axios'

export const usePeople = defineStore('people', {
  state: () => ({
    people: null
  }),
  action: {
    async filterType(type) {
      if (this.people === null)
        this.people = await axios.get('api/people')
      return this.people.filter(item => item.type === type)
    }
  }
})
```

这个只是一个很简单的例子，当实际情况比现在复杂的多的时候，解开页面和数据的耦合会使两者逻辑变得更加清晰，可操作性提高。例如我们想要在页面加载时请求people可以稍微改变一下。

`people.js`

```js
import { defineStore } from 'pinia'
import axios from 'axios'

export const usePeople = defineStore('people', {
  state: () => ({
    people: null
  }),
  action: {
    async init() {
      this.people = await axios.get('api/people')
    },
    async filterType(type) {
      if (this.people === null)
        await this.init()
      return this.people.filter(item => item.type === type)
    }
  }
})
```

我们可以在proload界面首先`init`

`preload.vue`

```vue
<script setup>
import { usePeople } from './people.js'

const people = usePeople()
people.init().then(() => {
  /* 加载完毕 跳转 */
})
</script>

<template>
  loading
</template>
```

## 总结

使用Store对数据进行抽象和面向对象的想法有点类似，在后面可以考虑使用类来管理甚至继承，不再拘泥于传统的数据管理模式，使用抽象的方式可以使代码条理清晰，还可以减去一部分重复工作。
