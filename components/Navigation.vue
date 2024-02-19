<script setup lang="ts">
const { data: navigation } = await useAsyncData('nav', async () => {
  const data = await fetchContentNavigation()
  return data.filter(item => item.children)
})
const colorMode = useColorMode()
</script>

<template>
  <div class="flex items-center justify-between p-8">
    <NuxtLink href="/">
      首页
    </NuxtLink>
    <div class="flex items-center gap-1.2rem">
      <NuxtLink v-for="item in navigation" :key="item._id" :href="item._path">
        {{ item.title }}
      </NuxtLink>
      <nuxt-link to="https://github.com/gjssss" target="_blank">
        <div class="i-carbon-logo-github cursor-pointer text-5" />
      </nuxt-link>
      <div v-bind="slideToggleDark" class="relative h-6 w-6 of-hidden rounded-8">
        <div class="theme-icon-group absolute left-0 top-0 h-8 w-8" :class="{ dark: colorMode.preference === 'dark' }">
          <div class="i-carbon-moon ml-4 cursor-pointer text-5" />
          <div class="i-carbon-sun mt--2 cursor-pointer text-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.theme-icon-group {
  transition: transform 0.3s ease-in-out;
  transform: translateX(-50%);
}

.theme-icon-group.dark {
  transform: translateY(-50%);
}

@media (any-hover: hover) {
  .theme-icon-group.dark:hover {
    transform: translateX(-25%) translateY(-25%);
  }
  .theme-icon-group:hover {
    transform: translateX(-25%) translateY(-25%);
  }
}

.spin-enter-active,
.spin-leave-activ,
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.spin-enter-from,
.spin-leave-to {
  transform: rotateZ(180deg) scale(0.1);
}

.slide-enter-from {
  transform: translateX(-100%) translateY(100%);
}
.slide-leave-to {
  transform: translateX(100%) translateY(-100%);
}
</style>
