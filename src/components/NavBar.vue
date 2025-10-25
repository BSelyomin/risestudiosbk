<template>
  <nav class="fixed w-screen z-100">
    <ul
      class="flex h-12 justify-around items-center text-[16px] 3xl:text-2xl 3xl:h-16 text-white font-semibold"
      ref="nav"
    >
      <li>
        <button
          id="aboutR"
          @click="smoothScrollTo('about')"
          class="cursor-pointer text-shadow-md text-shadow-black"
        >
          About Us
        </button>
      </li>
      <li>
        <button
          id="classesR"
          @click="smoothScrollTo('classes')"
          class="cursor-pointer text-shadow-md text-shadow-black"
        >
          Classes
        </button>
      </li>
      <li>
        <button
          id="eventsR"
          @click="smoothScrollTo('events')"
          class="cursor-pointer text-shadow-md text-shadow-black"
        >
          Events
        </button>
      </li>
      <li>
        <button
          id="contactR"
          @click="smoothScrollTo('contact')"
          class="cursor-pointer text-shadow-md text-shadow-black"
        >
          Contact
        </button>
      </li>
    </ul>
    <div
      class="bg-white h-2 w-2 3xl:h-4 3xl:w-4 rounded-full duration-1000 ease-in-out relative shadow-md shadow-black"
      ref="circle"
    />
  </nav>
</template>
<script lang="ts" setup>
import { useTemplateRef, watch } from 'vue'

const props = defineProps<{
  visibleElements: Map<string, boolean>
  elementRefs: Map<string, HTMLElement>
}>()

const nav = useTemplateRef('nav')
const circle = useTemplateRef('circle')

function smoothScrollTo(elementId: string, duration = 2000) {
  const targetElement = props.elementRefs.get(elementId)
  if (!targetElement) return

  const startPosition = window.scrollY
  const targetPosition = targetElement.offsetTop
  const distance = targetPosition - startPosition
  let startTime: number | null = null
  let animationFrameId: number | null = null
  let userScrolled = false

  const handleUserScroll = () => {
    userScrolled = true
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
    window.removeEventListener('wheel', handleUserScroll)
    window.removeEventListener('touchstart', handleUserScroll)
  }

  window.addEventListener('wheel', handleUserScroll, { passive: true })
  window.addEventListener('touchstart', handleUserScroll, { passive: true })

  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

  function animation(currentTime: number) {
    if (userScrolled) return

    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    const easedProgress = easeInOutCubic(progress)

    window.scrollTo(0, startPosition + distance * easedProgress)

    if (timeElapsed < duration) animationFrameId = requestAnimationFrame(animation)
    else {
      history.pushState(null, '/', '#' + elementId)
      window.removeEventListener('wheel', handleUserScroll)
      window.removeEventListener('touchstart', handleUserScroll)
    }
  }
  animationFrameId = requestAnimationFrame(animation)
}
function moveDot(newValue: Map<string, boolean>) {
  const visibleItems = Array.from(newValue.entries()).filter(([, isVisible]) => isVisible)
  if (visibleItems.length === 0) return circle.value?.style.setProperty('left', '-100%')
  const firstVisibleItem = visibleItems[0][0]
  const button = nav.value?.querySelector(`#${firstVisibleItem}R`) as HTMLElement
  const s = button.getBoundingClientRect()
  circle.value?.style.setProperty(
    'left',
    `${s.x + (s.right - s.x - circle.value.offsetWidth / 2) / 2}px`,
  )
}

window.addEventListener('resize', () => moveDot(props.visibleElements))

watch(props.visibleElements, moveDot, { immediate: true, deep: true })
</script>
