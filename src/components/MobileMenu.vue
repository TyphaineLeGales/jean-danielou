<template>
    <div class="bg-toxic-green size-full fixed transform transition-transform duration-300 z-10" :class="open ? 'translate-x-0' : 'translate-x-full'">
        <ul class="font-lexend flex  size-full flex-col justify-center px-32">
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