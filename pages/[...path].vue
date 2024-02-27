<script setup lang="ts">
const route = useRoute()
const paths = (route.params as any).path || ['']
paths.unshift('')
const path = paths.join('/')
const { data, error } = await useAsyncData(path, () => queryContent(path).findOne())

useHead({
  title: data.value?.title ? `GJSSSS | ${data.value.title}` : 'GJSSSS',
})
</script>

<template>
  <article class="prose w-full">
    <div v-if="error">
      404 Not Found
    </div>
    <ContentRenderer v-else :data="data">
      <div v-if="!data">
        Loading
      </div>
      <ContentRendererMarkdown v-else :value="data" />
    </ContentRenderer>
  </article>
</template>
