<template>
  <div class="overflow-hidden w-full relative cursor-pointer">
    <h1
      ref="titleRef"
      :class="['scrolling-title text-xl md:text-3xl font-balthazar my-4', isOverflowing ? 'scrolling' : 'truncate']"
      :style="scrollStyle"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      {{ text }}
    </h1>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'

const props = defineProps({
  text: { type: String, required: true }
})

const titleRef = ref(null)
const isOverflowing = ref(false)
const containerWidth = ref(0)
const textWidth = ref(0)
const hovering = ref(false)

const scrollDuration = computed(() => {
  if (!textWidth.value || !containerWidth.value) return 0
  // Adjust speed: 100px per 5s (tweak as desired)
  return ((textWidth.value + containerWidth.value) / 100) * 5
})

const scrollStyle = computed(() => ({
  '--paused': hovering.value ? 'paused' : 'running',
  animationDuration: `${scrollDuration.value}s`
}))

const checkOverflow = () => {
  const el = titleRef.value
  if (!el) return
  containerWidth.value = el.parentElement.clientWidth
  textWidth.value = el.scrollWidth
  isOverflowing.value = textWidth.value > containerWidth.value
}

onMounted(() => {
  checkOverflow()
})

watch(() => props.text, async () => {
  await nextTick()
  checkOverflow()
})
</script>

<style>
.scrolling-title {
  display: inline-block;
  white-space: nowrap;
  /* Pause/play controlled via CSS variable */
  animation-play-state: var(--paused, running);
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Only scroll if overflowing */
.scrolling {
  animation-name: scrollText;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* Keyframes scroll from left edge to fully hidden */
@keyframes scrollText {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>