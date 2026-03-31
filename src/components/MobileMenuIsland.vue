<template>
  <div>
    <IconBurgerMenu :open="menuOpen" @click="toggleMenuOpen" class="size-12"/>
    <MobileMenu :open="menuOpen" />
  </div>
</template>
<script setup>
import {ref} from 'vue'
import IconBurgerMenu from './UI/IconBurgerMenu.vue';
import MobileMenu from './MobileMenu.vue';
const menuOpen = ref(false)
const toggleMenuOpen =()=> menuOpen.value = !menuOpen.value

</script>