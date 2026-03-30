<template>
  <button class="relative w-6 h-6">
    <span
      class="absolute left-0 w-full h-0.5 bg-gray-900 transition-all duration-300"
      :class="open ? 'top-1/2 rotate-45' : 'top-1'"
    ></span>

    <span
      class="absolute left-0 w-full h-0.5 bg-black transition-all duration-300"
      :class="open ? 'opacity-0' : 'top-1/2 -translate-y-1/2'"
    ></span>

    <span
      class="absolute left-0 w-full h-0.5 bg-gray-900 transition-all duration-300"
      :class="open ? 'top-1/2 -rotate-45' : 'bottom-1'"
    ></span>
  </button>
</template>

<script setup>
defineProps({
  open: Boolean
})
</script>