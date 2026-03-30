<template>
    <div>
        <nav class="w-full flex justify-between p-4 border-b">
            <div class="flex-1 font-balthazar text-2xl ">
                <a href="/" class="cursor-pointer">Jean Daniélou</a>
            </div>
            <ul class="font-lexend flex-1 justify-between hidden md:flex">
                <li v-for="route in routes"> 
                    <a :href="route.path">{{route.name}}</a>
                </li>
            </ul>
            <div  class="flex-1 md:hidden flex justify-end">
                <IconBurgerMenu :open="menuOpen" @click="toggleMenuOpen" />
            </div>
        </nav>
        <MobileMenu :open="menuOpen" class="md:hidden"/>
    </div>
</template>
<script setup>
import "../styles/global.css";
import { routes } from '../config/navRoutes';
import MobileMenu from "./MobileMenu.vue";
import IconBurgerMenu from "./UI/IconBurgerMenu.vue";
import { ref } from "vue";
const menuOpen = ref(false)
const toggleMenuOpen = () => {
    menuOpen.value = !menuOpen.value
}
</script>