<template>
  <nav class="fixed w-full z-9999">
    <ul
      class="flex h-12 justify-around items-center text-[20px] text-white font-semibold"
      ref="nav"
    >
      <li>
        <button
          id="aboutR"
          @click="smoothScrollTo('about')"
          class="cursor-pointer text-shadow-md text-shadow-black"
        >
          ‎ About Us
        </button>
      </li>
      <li>
        <button
          id="classesR"
          @click="smoothScrollTo('classes')"
          class="cursor-pointer text-shadow-md text-shadow-black"
        >
          ‎ Classes
        </button>
      </li>
      <li>
        <button
          id="activitiesR"
          @click="smoothScrollTo('activities')"
          class="cursor-pointer text-shadow-md text-shadow-black"
        >
          ‎ Activities
        </button>
      </li>
      <li>
        <button
          id="contactR"
          @click="smoothScrollTo('contact')"
          class="cursor-pointer text-shadow-md text-shadow-black"
        >
          ‎ Contact
        </button>
      </li>
    </ul>
    <div
      class="bg-white h-2 w-2 rounded-full duration-1000 ease-in-out relative shadow-md shadow-black"
      ref="circle"
    />
  </nav>
  <div id="app" class="text-gray-800 bg-black">
    <header class="text-white h-[120rem] lg:h-[150rem]">
      <div class="w-full fixed text-[64px] top-0" ref="title" :style="dynamicStyles">
        <h3
          class="font-black metallic-copper text-center py-5 w-full fixed text-[calc(max(64px,25vw)/4)] md:text-[calc(max(192px,20vw)/4)] lg:text-[calc(max(205px,15vw)/4)]"
          ref="title"
          :style="{
            ...dynamicStyles,
            top: `${Math.min(25, 100 / (scroll / 100) - 5)}%`,
            opacity: `${Math.min(1, 2 / (scroll / 100) - 0.1)}`,
          }"
        >
          <p class="text-[5.333em] leading-[0.9]" style="letter-spacing: normal">RISE</p>
          <p>‎ STUDIOS</p>
          <p class="text-4xl md:text-5xl lg:text-6xl pt-[5rem] lg:pt-[5%] font-extrabold">‎ ˇ</p>
        </h3>
        <img
          src="https://images.unsplash.com/photo-1611435263724-3f3c4e4cca27?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Breakdancer Dancing"
          class="relative min-h-screen min-w-screen object-cover -z-1"
          :style="{ opacity: `${Math.min(0.3, 1 / (scroll / 100)) - 0.05}` }"
        />
      </div>
    </header>

    <main class="rounded-lg shadow-xl overflow-hidden z-20">
      <section
        id="about"
        data-item-id="about"
        class="text-center rounded-lg mb-8 shadow-md grid border-t-6 border-gray-800 lg:grid-cols-2 lg:grid-rows-2"
        :ref="(el) => elementRefs.set('about', el as HTMLElement)"
      >
        <div class="border-b-3 border-gray-800 lg:col-start-2 lg:border-l-3 pb-6">
          <h2 class="font-bold text-white pt-5 text-3xl mb-2 xl:mb-4 xl:text-4xl">
            Welcome to Rise Studios
          </h2>
          <p class="text-gray-400 px-7 sm:px-10 mx-auto h-fit text-sm sm:text-lg xl:text-xl">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
            pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu
            aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
            egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
            vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos
            himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex
            sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.
            Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus
            bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
            hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
            inceptos himenaeos.
          </p>
        </div>
        <div class="border-b-3 border-gray-800 h-full row-start-2 lg:row-start-1 lg:border-r-3">
          <img
            src="https://www.shutterstock.com/image-photo/athletic-young-bboy-standing-on-600nw-1389031484.jpg"
            alt="Breakdancer spinning"
            class="relative object-cover w-full h-full"
            :ref="(el) => imagesVisible.set('img1', el as HTMLElement)"
          />
        </div>

        <div class="border-t-3 border-gray-800 lg:border-r-3 pb-6">
          <h2 class="text-4xl font-bold pt-5 text-white mb-4 lg:mb-2 lg:text-3xl">About Me</h2>
          <p class="text-gray-400 px-7 sm:px-10 mx-auto h-fit text-sm sm:text-lg xl:text-xl">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
            pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu
            aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
            egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
            vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos
            himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex
            sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.
            Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus
            bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
            hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
            inceptos himenaeos.
          </p>
        </div>
        <div class="border-l-3 border-t-3 border-gray-800">
          <img
            src="https://thumbs.dreamstime.com/b/composite-image-muscular-fit-man-arms-crossed-against-room-overlooking-ocean-66193716.jpg"
            class="relative object-cover w-full h-full"
            alt="Dancer"
            :ref="(el) => imagesVisible.set('img2', el as HTMLElement)"
          />
        </div>
      </section>

      <section
        id="classes"
        data-item-id="classes"
        class="py-12 text-center border-b border-dashed border-pink-200 mb-8 h-500"
        :ref="(el) => elementRefs.set('classes', el as HTMLElement)"
      >
        <h2 class="text-4xl font-bold text-pink-600 mb-8">Our Amazing Classes!</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            class="bg-white border-2 border-pink-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 class="text-2xl font-semibold text-pink-500 mb-2">Ballet</h3>
            <p class="text-gray-600">Graceful movements and elegant technique. OwO</p>
          </div>
          <div
            class="bg-white border-2 border-pink-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 class="text-2xl font-semibold text-pink-500 mb-2">Hip Hop</h3>
            <p class="text-gray-600">
              Funky beats and energetic moves! <span class="text-3xl">🎧🎶</span>
            </p>
          </div>
          <div
            class="bg-white border-2 border-pink-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 class="text-2xl font-semibold text-pink-500 mb-2">Jazz</h3>
            <p class="text-gray-600">Expressive and dynamic styles. ✨</p>
          </div>
          <div
            class="bg-white border-2 border-pink-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 class="text-2xl font-semibold text-pink-500 mb-2">Contemporary</h3>
            <p class="text-gray-600">Emotional storytelling through dance. 💖</p>
          </div>
        </div>
      </section>

      <section
        id="activities"
        data-item-id="activities"
        class="py-12 text-center border-b border-dashed border-pink-200 mb-8 h-500"
        :ref="(el) => elementRefs.set('activities', el as HTMLElement)"
      >
        <h2 class="text-4xl font-bold text-pink-600 mb-4">About Dance UwU Studio</h2>
        <p class="text-lg text-gray-700 max-w-3xl mx-auto">
          We awe a cozy little dance studio dedicated to providing high-quality dance education in a
          supportive and friendly environment. Our passionate instructors are here to help chu
          achieve your dance goals, no matter your skill level. uwu
        </p>
      </section>

      <section
        id="contact"
        data-item-id="contact"
        class="py-12 text-center h-500"
        :ref="(el) => elementRefs.set('contact', el as HTMLElement)"
      >
        <h2 class="text-4xl font-bold text-pink-600 mb-4">Get in Touch, OwO!</h2>
        <p class="text-lg text-gray-700 mb-2">
          Have questions? Want to sign up for a class? We'd wuv to hear from chu!
        </p>
        <p class="text-lg text-pink-500 font-medium mb-1">Email: info@danceuwustudio.com</p>
        <p class="text-lg text-pink-500 font-medium mb-1">Phone: (123) 456-7890</p>
        <p class="text-lg text-pink-500 font-medium">
          Address: 123 Kawaii Lane, Danceville, NY 10001
        </p>
      </section>
    </main>

    <footer class="bg-pink-400 text-white p-4 text-center mt-8 shadow-inner">
      <p class="text-sm">
        &copy; 2025 Dance UwU Studio. All rights reserved. <span class="text-xl">🌸</span>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, reactive } from 'vue'

const nav = ref<HTMLElement>()
const circle = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const titleBounds = ref<DOMRect | null>(null)
const elementRefs = ref<Map<string, HTMLElement>>(new Map())
const imagesVisible = ref<Map<string, HTMLElement>>(new Map())
const visibleElements = reactive<Map<string, boolean>>(new Map())
let navObserver: IntersectionObserver | null = null
const scroll = ref(0)
const dynamicStyles = ref<Record<string, string>>({
  '--mouse-x': '50%',
  '--mouse-y': '50%',
})

function smoothScrollTo(elementId: string, duration = 2000) {
  const targetElement = elementRefs.value.get(elementId)
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

document.addEventListener('scroll', () => (scroll.value = window.scrollY))

document.addEventListener('mousemove', (e) => {
  dynamicStyles.value = {
    '--mouse-x': `${Math.max(0, Math.min(100, (e.clientX / window.innerWidth) * 100))}%`,
    '--mouse-y': `${Math.max(0, Math.min(100, (e.clientY / window.innerHeight) * 100))}%`,
  }
})

function moveDot(newValue: Map<string, boolean>) {
  const visibleItems = Array.from(newValue.entries()).filter(([, isVisible]) => isVisible)
  if (visibleItems.length > 0) {
    const firstVisibleItem = visibleItems[0][0]
    const button = nav.value?.querySelector(`#${firstVisibleItem}R`) as HTMLElement
    const size = button.getBoundingClientRect()
    if (window.getComputedStyle(circle.value!).getPropertyValue('opacity') === '0') {
      circle.value?.style.setProperty('transition-duration', '0ms')
      circle.value?.style.setProperty('left', `${size.x + (size.right - size.x) / 2}px`)
      circle.value?.style.setProperty('opacity', '1')
      circle.value?.style.setProperty('transition-duration', '1000ms')
    } else circle.value?.style.setProperty('left', `${size.x + (size.right - size.x) / 2}px`)
  } else circle.value?.style.setProperty('opacity', '0')
}

window.addEventListener('resize', () => moveDot(visibleElements))

watch(visibleElements, moveDot, { immediate: true, deep: true })

watch(visibleElements, (newValue) => {
  imagesVisible.value.forEach((el, key) => {
    if (newValue.get('about')) {
      el.style.setProperty('transition', 'all 2000ms ease-in-out')
      el.style.setProperty('opacity', '1')
      el.style.setProperty(key === 'img1' ? 'left' : 'right', '0')
    } else {
      el.style.setProperty('transition', 'none')
      el.style.setProperty(key === 'img1' ? 'left' : 'right', '-100%')
      el.style.setProperty('opacity', '0')
    }
  })
})

onMounted(async () => {
  await nextTick()
  titleBounds.value = title.value?.getBoundingClientRect() || null
  if (elementRefs.value.size == 0) return console.warn('No elements to observe.')

  navObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) =>
        visibleElements.set(
          (entry.target as HTMLElement).dataset.itemId as string,
          entry.isIntersecting,
        ),
      ),
    { root: null, rootMargin: '0px', threshold: 0.01 },
  )
  elementRefs.value.forEach((element, key) => {
    navObserver?.observe(element)
    visibleElements.set(key, false)
  })
})

onUnmounted(() => {
  if (navObserver) navObserver.disconnect()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&display=swap');

.metallic-copper {
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  letter-spacing: 1.2em;
  background:
    radial-gradient(
      circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.7) 0%,
      transparent 45%
    ),
    linear-gradient(
      110deg,
      #b07219 0%,
      #d4af37 15%,
      #cd853f 25%,
      #ffffff 35%,
      #b8860b 45%,
      #8b4513 55%,
      #ffffff 65%,
      #daa520 75%,
      #b07219 85%,
      #cd853f 100%
    );
  background-size:
    100% 100%,
    200% 100%;
  background-position:
    0 0,
    var(--mouse-x) 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(218, 165, 32, 0.5);
  transition: background-position 0.1s ease;
  animation: copper-shine 4s ease-in-out infinite;
}

@keyframes copper-shine {
  0% {
    background-position:
      0 0,
      -50% 0;
  }
  25% {
    background-position:
      0 0,
      0% 0;
  }
  50% {
    background-position:
      0 0,
      50% 0;
  }
  75% {
    background-position:
      0 0,
      0% 0;
  }
  100% {
    background-position:
      0 0,
      -50% 0;
  }
}
</style>
