<template>
  <div class="mb-[100vh] h-10" ref="aboutMe" id="aboutMe">
    <div
      class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center transition-all duration-500 opacity-0 pointer-events-none"
    >
      <div
        class="hero h-screen bg-[url('/about-us/bboyrise-vert.jpg')] landscape:bg-[url('/about-us/bboyrise.jpg')]"
      >
        <div class="hero-overlay"></div>
        <div class="hero-content text-neutral-content text-center w-full">
          <div
            class="w-full md:w-3/4 text-center bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,1)_0%,transparent_75%)]"
          >
            <h2 class="font-bold text-white text-3xl mb-2 xl:mb-4 xl:text-5xl text-center">
              About Me
            </h2>
            <p class="text-gray-300 sm:px-10 h-fit text-sm sm:text-lg md:text-2xl">
              My name is <b>Anthony Tagliavia</b>, also known as <b>Bboy Rise</b>. I am a breakdance
              instructor, founder of the <b>Illstylez Crew</b>, and owner of <b>Rise Studios</b>.
              Dance has been my passion and purpose, giving me not only a creative outlet but also a
              way to build community and inspire others. Through my work, I aim to share the art of
              breakdancing, empower students of all levels, and create a space where movement,
              expression, and growth come together.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="mb-[calc(100vh-10rem)] h-10" ref="aboutUs" id="aboutUs">
      <div
        class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center transition-all duration-500 opacity-0 pointer-events-none"
      >
        <div
          class="hero h-screen bg-[url('/about-us/classpic-vert.jpg')] landscape:bg-[url('/about-us/classpic.jpg')] grayscale-75"
        >
          <div class="hero-overlay"></div>
          <div class="hero-content text-neutral-content text-center w-full h-full px-0">
            <div class="w-full md:w-3/4 text-center h-3/4 flex flex-col mt-15">
              <h2 class="font-bold text-white text-3xl mb-2 xl:mb-4 xl:text-5xl text-center">
                About Us
              </h2>
              <p class="text-gray-300 sm:px-10 h-fit text-xs sm:text-lg md:text-2xl pb-5">
                <b>Rise Studios</b> is a creative hub dedicated to movement, expression, and
                community. Specializing in <b>breakdance instruction</b>, we offer classes designed
                for dancers of all levels from beginners building a strong foundation to advanced
                students refining their craft. Our mission is to inspire confidence, discipline, and
                creativity through the art of dance.
              </p>
              <p
                class="text-gray-300 sm:px-10 h-fit text-xs sm:text-lg md:text-2xl pb-5 mt-auto mb-0"
              >
                In addition to our own programming, Rise Studios provides <b>studio rentals</b> for
                outside instructors, organizations, and community groups looking for a welcoming
                space to host classes, workshops, or events. With an open layout and supportive
                environment, our studio serves as both a training ground for dancers and a versatile
                venue for a variety of programs.
              </p>
              <p class="text-gray-300 sm:px-10 h-fit text-xs sm:text-lg md:text-2xl mb-0">
                At Rise Studios, we believe in growth, collaboration, and empowering individuals to
                rise to their fullest potential on and off the dance floor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="h-10 w-full"></div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, useTemplateRef, watch } from 'vue'

const props = defineProps<{ scroll: number }>()

let scrollUp = false
const aboutMeRef = useTemplateRef<HTMLElement>('aboutMe')
const aboutUsRef = useTemplateRef<HTMLElement>('aboutUs')
let observer: IntersectionObserver | null = null

function updateVis(visible: boolean, key: 'me' | 'us') {
  if (!aboutMeRef.value || !aboutMeRef.value.firstElementChild) return
  if (!aboutUsRef.value || !aboutUsRef.value.firstElementChild) return
  const element =
    key === 'me' ? aboutMeRef.value.firstElementChild : aboutUsRef.value.firstElementChild
  if (visible) {
    element.classList.remove(
      '-translate-y-full',
      'translate-y-full',
      'opacity-0',
      'pointer-events-none',
    )
  } else {
    element.classList.add(
      `${scrollUp ? '' : '-'}translate-y-full`,
      'opacity-0',
      'pointer-events-none',
    )
  }
}

watch(
  () => props.scroll,
  (newVal, oldVal) => (newVal < oldVal ? (scrollUp = true) : (scrollUp = false)),
)

onMounted(() => {
  if (!aboutMeRef.value || !aboutUsRef.value) return

  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }

  observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    entries.forEach((e) => updateVis(e.isIntersecting, e.target.id === 'aboutMe' ? 'me' : 'us'))
  }, options)
  observer.observe(aboutMeRef.value)
  observer.observe(aboutUsRef.value)
  const aboutUsRect = aboutUsRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  if (aboutUsRect.top >= viewportHeight) {
    scrollUp = true
    updateVis(false, 'me')
    updateVis(false, 'us')
  } else {
    scrollUp = false
    updateVis(false, 'me')
    updateVis(false, 'us')
  }
})

onUnmounted(() => {
  if (observer && aboutMeRef.value) observer.unobserve(aboutMeRef.value)
  if (observer && aboutUsRef.value) observer.unobserve(aboutUsRef.value)
  observer?.disconnect()
  observer = null
})
</script>
