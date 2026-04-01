<template>
  <div
    ref="transitionEl"
    class="fixed inset-0 overflow-hidden pointer-events-none z-999 mt-15"
    aria-hidden="true"
  >
    <div ref="pixelGrid" class="flex w-full h-full"></div>
  </div>
</template>

<script setup>
import { navigate } from 'astro:transitions/client'
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

  for (let col = 0; col < COLUMNS; col++) {
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

const dissolveOut = () => new Promise((resolve) => {
  gsap.set(transitionEl.value, { x: 0 })
  gsap.set('.pixel-block', { opacity: 1 })
  const blocks = [...document.querySelectorAll('.pixel-block')]
    .sort((a, b) => Number(a.dataset.delay) - Number(b.dataset.delay))
  gsap.to(blocks, {
    opacity:0, 
    stagger: { each: 0.01, ease: 'power3.out' },
    onComplete: () => {
      gsap.set(transitionEl.value, { x: window.innerWidth })
      resolve()
    }
  })
})

const wipeIn = () => new Promise((resolve) => {
  gsap.set(transitionEl.value, { x: window.innerWidth })
  gsap.set('.pixel-block', { opacity: 1 })

  gsap.to(transitionEl.value, {
    x: 0,
    duration: 0.4,
    ease: 'expo.out',
    onComplete: resolve
  })
})

const handleClick = async (e) => {
  const link = e.target.closest('a[href]')
  if (!link) return
  if (link.origin !== location.origin) return
  if (link.getAttribute('href').startsWith('#')) return

  e.preventDefault()
  await wipeIn()
  navigate(link.href)
}

onMounted(async () => {
  buildGrid()
  await dissolveOut()
  document.addEventListener('click', handleClick)
  window.addEventListener('resize', buildGrid)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
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
  opacity: 1;
}
</style>

