<script setup lang="ts">
const { data: navigation } = await useAsyncData('nav', async () => {
  const data = await fetchContentNavigation()
  return data.filter(item => item.children)
})
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
      <NuxtLink href="/resume" target="_blank">
        简历
      </NuxtLink>
      <nuxt-link to="https://github.com/gjssss" target="_blank">
        <div class="i-carbon-logo-github cursor-pointer text-5" />
      </nuxt-link>
      <ThemeSwitch />
    </div>
  </div>
</template>
