<script setup lang="ts">

</script>

<template>
  <div class="relative min-h-screen flex flex-col font-sans">
    <header>
      <Navigation />
    </header>
    <main class="mxa flex-1 <sm:w-90% lg:max-w-100ch sm:max-w-65ch">
      <slot />
    </main>
    <footer class="mxa <sm:w-90% lg:max-w-100ch sm:max-w-65ch">
      <FooterContent />
    </footer>
    <div id="__transition" />
  </div>
</template>

<style>

</style>
