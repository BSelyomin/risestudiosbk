<template>
  <div class="flex flex-col sm:flex-row">
    <div
      v-for="item in classes"
      :key="item.id"
      class="relative group overflow-hidden transition-all ease-in-out sm:h-150 lg:h-200"
      @click="setAnimation(true, item.id)"
      :class="{
        'cursor-pointer': !classDesc[item.id],
        'h-300 sm:w-screen': classDesc[item.id],
        'h-0 sm:w-0': !classDesc[item.id] && classDescVisible,
        'h-75 sm:w-full': !classDesc[item.id] && !classDescVisible,
      }"
      :style="{ transitionDuration: classDescVisible ? '1000ms' : '2000ms' }"
    >
      <img
        :src="item.image"
        class="h-full w-full object-cover sm:grayscale-0 transition-all duration-1000 ease-in-out"
        :class="{
          'grayscale-75 sm:group-hover:grayscale-75 sm:group-hover:scale-110': !classDesc[item.id],
          'grayscale-0': classDesc[item.id],
        }"
        :alt="`${item.name} Class`"
      />
      <div
        class="relative h-fit transition-all sm:top-0 duration-500 text-white font-semibold ease-in-out underline sm:no-underline underline-offset-2"
        :class="{
          '-top-[calc(20%+1rem)] sm:group-hover:-translate-y-[calc(100%+1rem)]':
            !classDesc[item.id],
        }"
      >
        <h1 class="text-2xl text-shadow-md text-shadow-black">{{ item.name }}</h1>
        <p class="text-gray-300 mb-4 text-shadow-md text-shadow-black">More Info &#8595;</p>
      </div>
      <div
        class="relative h-full w-full transition-all duration-1000"
        :class="{ '-top-full': classDesc[item.id], 'top-0': !classDesc[item.id] }"
      >
        <div class="bg-black h-2/3 rounded-[3rem] transition-all duration-1000 ease-in-out top-1/6">
          <div
            class="relative top-0 left-0 w-full h-full pt-5 pb-10 transition-all duration-1000 ease-in"
          >
            <h1
              class="text-4xl sm:text-2xl md:text-4xl xl:text-6xl font-bold mb-4 flex justify-center m-auto"
              :style="{ color: classAnimation ? 'white' : 'transparent' }"
            >
              &#8204; {{ item.name }}
            </h1>

            <p
              v-show="classAnimation"
              class="h-[90%] text-gray-400 whitespace-pre-line overflow-x-auto px-7 sm:px-10 mx-auto text-md sm:text-sm lg:text-lg xl:text-xl"
            >
              {{ item.desc }}
            </p>
            <button
              class="absolute right-8 top-4 text-3xl font-bold text-white cursor-pointer"
              :style="{ opacity: classAnimation ? '1' : '0' }"
              @click.stop="setAnimation(false, item.id)"
            >
              &#x2715;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'

const classDesc = reactive({
  babyBreaks: false,
  breakdanceYouth: false,
  yoga: false,
  fitness: false,
})
const classAnimation = ref(false)

let timeout: NodeJS.Timeout | null = null
function setAnimation(desc: boolean, id: keyof typeof classDesc) {
  if (classDesc[id] === desc) return
  classDesc[id] = desc
  if (timeout) clearTimeout(timeout)
  if (desc) timeout = setTimeout(() => (classAnimation.value = true), 1000)
  else classAnimation.value = false
}

interface classesType {
  id: keyof typeof classDesc
  name: string
  image: string
  desc: string
}

const classes: classesType[] = [
  {
    id: 'babyBreaks',
    name: 'Baby Breaks',
    image: '/IMG_3368.jpg',
    desc: 'Introduction to movement, rhythm, and fun. \n 4-5 years old \n Thursday: 6:00-6:45 PM \n Saturday: 10:00-10:45 AM ',
  },
  {
    id: 'breakdanceYouth',
    name: 'Beginner/Intermediate',
    image: '/img_6129.JPG',
    desc: 'Focus on battle concepts, foundations, and freezes. \n 6+ years old \n Friday: 5:30-6:30 PM \n Friday: 6:30-7:30 PM',
  },
  {
    id: 'yoga',
    name: 'Yoga',
    image: '/IMG_9496.JPG',
    desc: 'Focus on battle concepts, foundations, and freezes. \n 6+ years old \n Friday: 5:30-6:30 PM \n Friday: 6:30-7:30 PM',
  },
  {
    id: 'fitness',
    name: 'Fitness',
    image: 'headstand.jpg',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
  },
]

const classDescVisible = computed(
  () => classDesc.babyBreaks || classDesc.breakdanceYouth || classDesc.yoga || classDesc.fitness,
)
</script>
