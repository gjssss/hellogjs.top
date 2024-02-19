<script setup lang="ts">
const route = useRoute()
const paths = route.params.path || ['']
paths.unshift('')
const path = paths.join('/')
const { data, error } = useAsyncData(path, () => queryContent(path).findOne())
</script>

<template>
  <article class="prose px-4">
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
