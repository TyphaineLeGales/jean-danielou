<template>
  <div
    ref="transitionEl"
    class="fixed inset-0 overflow-hidden pointer-events-none z-999 mt-15"
    aria-hidden="true"
  >
    <div ref="pixelGrid" class="flex size-full flex-nowrap "></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const COLUMNS = 20
const BLOCK_SIZE_VW = 0.05
const transitionEl = ref(null)
const pixelGrid = ref(null)

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const buildGrid = () => {
  const el = pixelGrid.value
  if (!el) return
  el.innerHTML = ''
  const blockSize = window.innerWidth * BLOCK_SIZE_VW
  const nbOfRows = Math.ceil(window.innerHeight / blockSize)
  for (let col = COLUMNS; col > 0; col--) {
    const column = document.createElement('div')
    column.className = 'pixel-column'
    const indexes = shuffle([...Array(nbOfRows)].map((_, i) => i))
    indexes.forEach((randomIndex) => {
      const block = document.createElement('div')
      block.style.width = blockSize + 'px'
      block.style.height = blockSize + 'px'
      block.classList.add('pixel-block')
      block.dataset.delay = String(col + randomIndex)
      block.dataset.outDelay = String((COLUMNS - col) + randomIndex)
      column.appendChild(block)
    })
    el.appendChild(column)
  }
}

const sweep = () => new Promise((resolve) => {
  const blocks = [...document.querySelectorAll('.pixel-block')]
    .sort((a, b) => Number(a.dataset.delay) - Number(b.dataset.delay))
  gsap.set(blocks, { opacity: 0 })
  gsap.to(blocks, {
    keyframes: [
      { opacity: 1, duration: 0.01 },
      {opacity:1, duration: (i, target) => Number(target.dataset.outDelay*0.005) },
      { opacity: 0, duration: 0.2 },
    ],
    stagger: {
      each: 0.01,
      ease: 'power1.in',
      from: 'start',
      order: (i, target) => Number(target.dataset.outDelay)

    },
    onComplete: resolve
  })
})



onMounted(async () => {
  buildGrid()
  //gsap.set(blocks, { opacity: 0 })
  gsap.set(transitionEl.value, { x: 0 })
  await sweep()
  window.addEventListener('resize', buildGrid)
})

onUnmounted(() => {
  window.removeEventListener('resize', buildGrid)
})
</script>

<style>
.pixel-column {
  flex: 0 0 5vw;
  width: 5vw;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.pixel-block {
  width: 100%;
  background: #44F459;
  opacity: 0;
}
</style>

