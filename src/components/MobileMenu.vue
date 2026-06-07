<template>
    <div class="fixed left-0 z-10 transition-transform duration-300 transform top-15.25 bg-toxic-green size-full" :class="open ? 'translate-x-0' : 'translate-x-full'">
        <ul class="flex flex-col justify-center px-32 font-lexend size-full">
            <li v-for="route in routes" class="pb-6"> 
                <a :href="lang + route.path" @click.prevent="handleNavigate(route.path)">{{route.name}}</a>
            </li>
            <LanguageSwitcher/>
        </ul>
    </div>
</template>
<script setup>
import LanguageSwitcher from './LanguageSwitcher.vue';
import { routes } from '../config/navRoutes';

const props = defineProps({
    open : {
        type: Boolean, 
        required: true
    },
    lang: {
        type: String
    }
})
const lang = props.lang === "en" ? "/en" : ""
const emit = defineEmits(['close'])
const handleNavigate = async (path) => {
  emit('close')
  await new Promise(resolve => setTimeout(resolve, 300))
  window.location.href = lang + path
}
</script>