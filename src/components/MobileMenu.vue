<template>
    <div class="fixed left-0 z-10 transition-transform duration-300 transform top-12 bg-toxic-green size-full" :class="open ? 'translate-x-0' : 'translate-x-full'">
        <ul class="flex flex-col justify-center px-32 font-lexend size-full">
            <li v-for="route in routes" class="pb-6"> 
                <a :href="route.path">{{route.name}}</a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { routes } from '../config/navRoutes';
const props = defineProps({
    open : {
        type: Boolean, 
        required: true
    }
})
</script>