<template>
  <div
    class="metallic-container min-h-screen relative overflow-hidden"
    :style="dynamicStyles"
    @mousemove="updateMousePosition"
  >
    <!-- Interactive light source -->
    <div class="light-source" :style="{ left: mouseX + 'px', top: mouseY + 'px' }" />

    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h1 class="text-6xl md:text-8xl font-black font-orbitron metallic-chrome text-hover mb-8">
          METALLIC
        </h1>
        <p class="text-xl text-gray-300 mb-8">
          Hover and move your mouse to see the light reflection effects
        </p>
      </div>

      <!-- Chrome Text Examples -->
      <div class="mb-16">
        <h2 class="text-2xl font-semibold mb-8 text-center text-gray-300">Chrome Steel</h2>
        <div class="grid gap-8">
          <h3
            class="text-4xl md:text-6xl font-black font-orbitron metallic-chrome text-hover text-center"
          >
            CHROME
          </h3>
          <p class="text-2xl font-semibold font-exo metallic-chrome text-hover text-center">
            Polished Chrome Finish
          </p>
        </div>
      </div>

      <!-- Gold Text Examples -->
      <div class="mb-16">
        <h2 class="text-2xl font-semibold mb-8 text-center text-gray-300">Pure Gold</h2>
        <div class="grid gap-8">
          <h3
            class="text-4xl md:text-6xl font-black font-orbitron metallic-gold text-hover text-center"
          >
            GOLDEN
          </h3>
          <p class="text-2xl font-semibold font-exo metallic-gold text-hover text-center">
            24K Gold Luxe
          </p>
        </div>
      </div>

      <!-- Copper Text Examples -->
      <div class="mb-16">
        <h2 class="text-2xl font-semibold mb-8 text-center text-gray-300">Antique Copper</h2>
        <div class="grid gap-8">
          <h3
            class="text-4xl md:text-6xl font-black font-orbitron metallic-copper text-hover text-center"
          >
            COPPER
          </h3>
          <p class="text-2xl font-semibold font-exo metallic-copper text-hover text-center">
            Vintage Copper Patina
          </p>
        </div>
      </div>

      <!-- Steel Text Examples -->
      <div class="mb-16">
        <h2 class="text-2xl font-semibold mb-8 text-center text-gray-300">Steel Blue</h2>
        <div class="grid gap-8">
          <h3
            class="text-4xl md:text-6xl font-black font-orbitron metallic-steel text-hover text-center"
          >
            STEEL
          </h3>
          <p class="text-2xl font-semibold font-exo metallic-steel text-hover text-center">
            Industrial Steel Grade
          </p>
        </div>
      </div>

      <!-- Holographic Text Examples -->
      <div class="mb-16">
        <h2 class="text-2xl font-semibold mb-8 text-center text-gray-300">Holographic Foil</h2>
        <div class="grid gap-8">
          <h3
            class="text-4xl md:text-6xl font-black font-orbitron metallic-holographic text-hover text-center"
          >
            HOLOGRAPHIC
          </h3>
          <p class="text-2xl font-semibold font-exo metallic-holographic text-hover text-center">
            Rainbow Hologram Effect
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state
const mouseX = ref<number>(window.innerWidth / 2)
const mouseY = ref<number>(window.innerHeight / 2)

// Calculate mouse position as percentage using viewport coordinates
const mousePositionX = computed(() =>
  Math.max(0, Math.min(100, (mouseX.value / window.innerWidth) * 100)),
)

const mousePositionY = computed(() =>
  Math.max(0, Math.min(100, (mouseY.value / window.innerHeight) * 100)),
)

// Dynamic CSS custom properties for mouse-controlled shine
const dynamicStyles = computed(() => ({
  '--mouse-x': `${mousePositionX.value}%`,
  '--mouse-y': `${mousePositionY.value}%`,
}))

// Methods
const updateMousePosition = (event: MouseEvent): void => {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600;800&display=swap');

.font-orbitron {
  font-family: 'Orbitron', monospace;
}

.font-exo {
  font-family: 'Exo 2', sans-serif;
}

/* Chrome/Silver Metallic Effect */
.metallic-chrome {
  background:
    radial-gradient(
      circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.8) 0%,
      transparent 50%
    ),
    linear-gradient(
      110deg,
      #b8c6db 0%,
      #f5f7fa 15%,
      #c8d0e7 25%,
      #ffffff 35%,
      #b8c6db 45%,
      #9baacf 55%,
      #ffffff 65%,
      #dde5f4 75%,
      #b8c6db 85%,
      #f5f7fa 100%
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
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  transition: background-position 0.1s ease;
}

/* Gold Metallic Effect */
.metallic-gold {
  background:
    radial-gradient(
      circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.9) 0%,
      transparent 40%
    ),
    linear-gradient(
      110deg,
      #fdbb2d 0%,
      #fff7ad 15%,
      #ffeaa7 25%,
      #ffffff 35%,
      #fdcb6e 45%,
      #e17055 55%,
      #ffffff 65%,
      #fdbb2d 75%,
      #f39c12 85%,
      #fff7ad 100%
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
  text-shadow: 0 0 25px rgba(253, 187, 45, 0.6);
  transition: background-position 0.1s ease;
}

/* Copper Metallic Effect */
.metallic-copper {
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
}

/* Steel Blue Metallic Effect */
.metallic-steel {
  background:
    radial-gradient(
      circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.6) 0%,
      transparent 50%
    ),
    linear-gradient(
      110deg,
      #4682b4 0%,
      #87ceeb 15%,
      #b0c4de 25%,
      #ffffff 35%,
      #708090 45%,
      #2f4f4f 55%,
      #ffffff 65%,
      #87ceeb 75%,
      #4682b4 85%,
      #b0c4de 100%
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
  text-shadow: 0 0 20px rgba(70, 130, 180, 0.4);
  transition: background-position 0.1s ease;
}

/* Holographic Effect */
.metallic-holographic {
  background:
    radial-gradient(
      circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 1) 0%,
      transparent 30%
    ),
    linear-gradient(
      110deg,
      #ff006e 0%,
      #8338ec 10%,
      #3a86ff 20%,
      #06ffa5 30%,
      #ffbe0b 40%,
      #fb5607 50%,
      #ffffff 60%,
      #ff006e 70%,
      #8338ec 80%,
      #3a86ff 90%,
      #06ffa5 100%
    );
  background-size:
    100% 100%,
    300% 100%;
  background-position:
    0 0,
    var(--mouse-x) 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
  transition: background-position 0.1s ease;
}

/* Animation Keyframes */
@keyframes shine {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes rainbow-shine {
  0% {
    background-position: -300% 0;
  }
  100% {
    background-position: 300% 0;
  }
}

/* Hover effects */
.text-hover:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* Container styling */
.metallic-container {
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

/* Interactive light source */
.light-source {
  position: fixed;
  width: 150px;
  height: 150px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.2) 30%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
  transition: all 0.05s ease;
  filter: blur(20px);
  z-index: 1;
  transform: translate(-50%, -50%);
}
</style>
