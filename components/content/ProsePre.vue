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
  <div class="code">
    <div class="language op-trans">
      {{ language }}
    </div>
    <div v-if="copyTrigger" class="copy">
      {{ copyMsg }}
    </div>
    <div v-else class="copy op-trans i-carbon-copy" title="copy code" @click="copyHandle" />
    <pre :class="$props.class" class="font-mono"><slot /></pre>
  </div>
</template>

<style>
pre code .line {
  display: block;
}
.code {
  position: relative;
  padding-top: 1.2rem;
}
.code .language {
  position: absolute;
  left: 1.2rem;
  font-size: 0.8rem;
  cursor: default;
  z-index: 1;
}

.code .copy {
  position: absolute;
  right: 1.2rem;
  top: 2rem;
  cursor: pointer;
  z-index: 1;
}

@media (any-hover: hover) {
  .op-trans {
    transition: opacity 300ms ease-in-out;
    opacity: 0;
  }
  .code:hover .op-trans {
    opacity: 1;
  }
}
</style>
