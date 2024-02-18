<script setup lang="ts">
const { data: navigation } = await useAsyncData('nav', async () => {
  const data = await fetchContentNavigation()
  return data.filter(item => item.children)
})
</script>

<template>
  <div class="flex justify-between p-8">
    <NuxtLink href="/">
      首页
    </NuxtLink>
    <div class="flex gap-1.2rem">
      <NuxtLink v-for="item in navigation" :key="item._id" :href="item._path">
        {{ item.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<style>

</style>
