<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})
const copyMsg = ref('复制成功')
const copyTrigger = ref(false)
function copyHandle() {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(props.code).then(() => {
      copyMsg.value = '复制成功'
      showMsg()
    }).catch(() => {
      copyMsg.value = '复制失败'
      showMsg()
    })
  }
  else {
    copyMsg.value = '浏览器不支持'
    showMsg()
  }
}

function showMsg() {
  copyTrigger.value = true
  setTimeout(() => {
    copyTrigger.value = false
  }, 1500)
}
</script>

<template>
  <pre :class="$props.class" class="font-mono"><div class="language">{{ language }}</div><div v-if="copyTrigger" class="copy">{{ copyMsg }}</div><div v-else class="i-carbon-copy copy" title="copy code" @click="copyHandle" /><slot /></pre>
</template>

<style>
pre code .line {
  display: block;
}
</style>
