<script setup lang="ts">
import dayjs from 'dayjs'

const { data, error } = await useAsyncData('blog-list', async () => {
  const data = await fetchContentNavigation(queryContent('/blog'))
  return data[0]
    .children
    ?.filter(item => item._path !== '/blog')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>

<template>
  <div>
    <div v-if="error">
      Error
    </div>
    <div v-else-if="!data">
      Loading
    </div>
    <div v-else-if="!data.length">
      No Data
    </div>
    <div v-else class="flex flex-col gap-1.2rem">
      <div v-for="item in data" :key="item._id">
        <NuxtLink :href="item._path">
          {{ item.title }}
        </NuxtLink>
        <div v-if="item.date" inline>
          --{{ dayjs(item.date).format('YYYY-MM-DD') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
