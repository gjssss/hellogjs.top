<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
  <div v-bind="slideToggleDark" class="relative h-6 w-6 of-hidden rounded-50%">
    <ClientOnly>
      <div class="theme-icon-group absolute left-0 top-0 h-8 w-8" :class="{ dark: colorMode.value === 'dark' }">
        <!-- TODO: If use `sun` icon, it can't be hide completely in dark mode -->
        <div class="i-carbon-idea ml-4 cursor-pointer text-5" />
        <div class="i-carbon-moon mt--2 cursor-pointer text-5" />
      </div>
      <template #fallback>
        <div class="theme-icon-group absolute left-0 top-0 h-8 w-8">
          <div class="i-carbon-idea ml-4 cursor-pointer text-5" />
          <div class="i-carbon-moon mt--2 cursor-pointer text-5" />
        </div>
      </template>
    </ClientOnly>
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
</style>
