<script setup lang="ts">

</script>

<template>
  <div>
    <header>
      <Navigation />
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
