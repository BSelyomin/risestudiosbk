<template>
  <NavBar :visibleElements="visibleElements" :elementRefs="elementRefs" />
  <div id="app" class="text-gray-800 bg-black">
    <TitleComp :scroll="scroll" />

    <main class="rounded-lg shadow-xl">
      <section id="about" :ref="(el) => elementRefs.set('about', el as HTMLElement)">
        <AboutPage :scroll="scroll" />
      </section>

      <section
        id="classes"
        class="my-40 text-center overflow-hidden"
        :ref="(el) => elementRefs.set('classes', el as HTMLElement)"
      >
        <ClassPage />
      </section>

      <section
        id="events"
        class="py-12 text-center border-b border-dashed border-pink-200 mb-8"
        :ref="(el) => elementRefs.set('events', el as HTMLElement)"
      >
        <EventsPage />
      </section>

      <section
        id="contact"
        class="relative py-12 text-center h-150 sm:h-200"
        :ref="(el) => elementRefs.set('contact', el as HTMLElement)"
      >
        <SocialsPage />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, reactive } from 'vue'
import SocialsPage from '@/components/SocialsPage.vue'
import EventsPage from '@/components/EventsPage.vue'
import ClassPage from '@/components/ClassPage.vue'
import AboutPage from '@/components/AboutPage.vue'
import TitleComp from '@/components/TitleComp.vue'
import NavBar from '@/components/NavBar.vue'

const elementRefs = ref<Map<string, HTMLElement>>(new Map())
const visibleElements = reactive<Map<string, boolean>>(new Map())
let navObserver: IntersectionObserver | null = null
const scroll = ref(window.scrollY)

document.addEventListener('scroll', () => (scroll.value = window.scrollY))

onMounted(async () => {
  await nextTick()
  if (elementRefs.value.size == 0) return console.warn('No elements to observe.')

  navObserver = new IntersectionObserver(
    (n) => n.forEach((e) => visibleElements.set(e.target.id, e.isIntersecting)),
    { root: null, rootMargin: '0px', threshold: 0.1 },
  )
  elementRefs.value.forEach((element, key) => {
    navObserver?.observe(element)
    visibleElements.set(key, false)
  })
})

onUnmounted(() => (navObserver ? navObserver.disconnect() : null))
</script>
