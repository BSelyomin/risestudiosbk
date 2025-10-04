<template>
  <header
    class="relative text-white h-[120rem] lg:h-[150rem] xl:h-[200rem]"
    :class="{ 'scale-0': scroll > 1800 }"
  >
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
        <p>&#8204; STUDIOS</p>
        <p class="text-4xl md:text-5xl lg:text-6xl pt-[5rem] lg:pt-[5%] font-extrabold">
          &#8204; &#9013;
        </p>
      </h3>
      <img
        src="https://images.unsplash.com/photo-1611435263724-3f3c4e4cca27?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Breakdancer Dancing"
        class="relative min-h-screen min-w-screen object-cover -z-2"
        :style="{ opacity: `${Math.min(0.3, 1 / (scroll / 100)) - 0.05}` }"
      />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef, onMounted } from 'vue'

defineProps<{ scroll: number }>()

const title = useTemplateRef('title')
const titleBounds = ref<DOMRect | null>(null)
const dynamicStyles = ref<Record<string, string>>({
  '--mouse-x': '50%',
  '--mouse-y': '50%',
})

document.addEventListener('mousemove', (e) => {
  dynamicStyles.value = {
    '--mouse-x': `${Math.max(0, Math.min(100, (e.clientX / window.innerWidth) * 100))}%`,
    '--mouse-y': `${Math.max(0, Math.min(100, (e.clientY / window.innerHeight) * 100))}%`,
  }
})

onMounted(() => (titleBounds.value = title.value?.getBoundingClientRect() || null))
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
