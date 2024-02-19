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
      <Transition name="spin" mode="out-in">
        <div v-if="colorMode.preference === 'dark'" class="i-carbon-moon cursor-pointer text-5" @click="toggleDark" />
        <div v-else class="i-carbon-sun cursor-pointer text-5" @click="toggleDark" />
      </Transition>
    </div>
  </div>
</template>

<style>
.spin-enter-active,
.spin-leave-active {
  transition: transform 0.3s ease;
}

.spin-enter-from,
.spin-leave-to {
  transform: rotateZ(180deg) scale(0.1);
}
</style>
