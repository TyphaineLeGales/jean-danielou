<template>
    <div class="fixed rotate-90 pointer-events-none -z-1 size-full translate-y-1/6 opacity-90 md:rotate-0" :style="`background-image:url(${$props.img.src});background-size:contain;background-position:center;background-repeat:no-repeat`"></div>
</template>
<script setup>
  const props = defineProps({
      img : {
          type: String,
          required: true
        }
    })
    console.log(props.img)
</script>