<script setup>
import { ref, computed, onMounted } from 'vue'

const currentPath = ref('/')

onMounted(() => {
  currentPath.value = window.location.pathname
})

const isEnglish = computed(() =>
  currentPath.value.startsWith('/en')
)

const enPath = computed(() => {
  if (!isEnglish.value) {
    return `/en${currentPath.value === '/' ? '' : currentPath.value}`
  }

  return currentPath.value
})

const frPath = computed(() => {
  if (isEnglish.value) {
    return currentPath.value.replace(/^\/en/, '') || '/'
  }

  return currentPath.value
})
</script>

<template>
  <nav class="language-switcher">
    <a
      :href="frPath"
      :aria-current="!isEnglish ? 'page' : undefined"
    >
      FR
    </a>

    <span>|</span>

    <a
      :href="enPath"
      :aria-current="isEnglish ? 'page' : undefined"
    >
      EN
    </a>
  </nav>
</template>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
}

.language-switcher a {
  opacity: 0.3;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.language-switcher a[aria-current="page"] {
  opacity: 1;
  text-decoration: underline;
}
</style>