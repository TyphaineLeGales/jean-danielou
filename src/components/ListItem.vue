<template>
  <div ref="containerRef" class="relative w-full overflow-hidden cursor-pointer">
    <!--hidden span for measurement -->
    <span ref="measureRef" class="text-xl measure md:text-3xl font-balthazar" aria-hidden="true">{{ text }}</span>

    <div
      v-if="isOverflowing"
      class="scrolling-track"
      :class="{ paused: hovering }"
      :style="{ '--duration': `${scrollDuration}s` }"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <span class="text-xl scrolling-item md:text-3xl font-balthazar">{{ text }}</span>
      <span class="text-xl scrolling-item md:text-3xl font-balthazar" aria-hidden="true">{{ text }}</span>
    </div>

    <component
      :is="tag"
      v-else
      class="text-xl truncate md:text-3xl font-balthazar"
    >
      {{ text }}
    </component>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'

const PX_PER_SECOND = 30

const props = defineProps({
  text: { type: String, required: true },
  tag: { type: String, default: 'p' }
})

const containerRef = ref(null)
const measureRef = ref(null)
const isOverflowing = ref(false)
const containerWidth = ref(0)
const textWidth = ref(0)
const hovering = ref(false)

const scrollDuration = computed(() =>
  textWidth.value && containerWidth.value
    ? (textWidth.value + containerWidth.value) / PX_PER_SECOND
    : 0
)

let ro

const checkOverflow = () => {
  if (!containerRef.value || !measureRef.value) return
  containerWidth.value = containerRef.value.clientWidth
  textWidth.value = measureRef.value.scrollWidth
  isOverflowing.value = textWidth.value > containerWidth.value
}

onMounted(async () => {
  await document.fonts.ready
  checkOverflow()
  ro = new ResizeObserver(checkOverflow)
  ro.observe(containerRef.value)
})

onUnmounted(() => ro?.disconnect())

watch(() => props.text, async () => {
  await nextTick()
  checkOverflow()
})
</script>

<style scoped>
.measure {
  position: fixed;
  visibility: hidden;
  white-space: nowrap;
  width: auto;
  pointer-events: none;
}

.scrolling-track {
  display: flex;
  width: max-content;
  animation: marquee var(--duration, 8s) linear infinite;
}

.scrolling-track.paused {
  animation-play-state: paused;
}

.scrolling-item {
  white-space: nowrap;
  padding-right: 4rem;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
</style>