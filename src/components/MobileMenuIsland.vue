<template>
  <div>
    <IconBurgerMenu :open="menuOpen" @click="toggleMenuOpen" class="mt-2 size-12"/>
    <MobileMenu :open="menuOpen" :lang="lang" client:load />
  </div>
</template>
<script setup>
  import {ref} from 'vue'
  import IconBurgerMenu from './UI/IconBurgerMenu.vue';
  import MobileMenu from './MobileMenu.vue';
  const props= defineProps({
    lang: {
      type: String
    }
  })
  const menuOpen = ref(false)
  const toggleMenuOpen =()=> menuOpen.value = !menuOpen.value
</script>