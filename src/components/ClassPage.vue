<template>
  <div class="flex flex-col sm:flex-row">
    <div
      v-for="item in classes"
      :key="item.id"
      class="relative group overflow-hidden h-75 sm:w-full sm:h-150 lg:h-200 cursor-pointer"
      @click="classDesc[item.id] = !classDesc[item.id]"
    >
      <img
        :src="item.image"
        class="h-full w-full object-cover transition-all duration-1000 ease-in-out sm:group-hover:grayscale-75 sm:group-hover:scale-110"
        :alt="`${item.name} Class`"
      />
      <div
        class="relative h-fit transition-all sm:top-0 duration-500 text-white font-semibold ease-in-out underline sm:no-underline underline-offset-2 -top-[calc(20%+1rem)] sm:group-hover:-translate-y-[calc(100%+1rem)]"
      >
        <h1 class="text-2xl text-shadow-md text-shadow-black">{{ item.name }}</h1>
        <p class="text-gray-300 mb-4 text-shadow-md text-shadow-black">More Info &#8595;</p>
      </div>
      <div
        class="absolute left-0 w-full transition-all duration-1000 ease-in-out -bottom-full bg-black rounded-t-[3rem] px-7 sm:px-10 py-8"
        :class="{ 'bottom-0': classDesc[item.id] }"
      >
        <div class="relative w-full">
          <h1 class="text-2xl md:text-3xl font-bold mb-4 text-center text-white">
            {{ item.name }}
          </h1>

          <p class="text-gray-400 whitespace-pre-line text-md sm:text-sm lg:text-base xl:text-lg">
            {{ item.desc }}
          </p>
          <button
            class="absolute right-0 top-0 text-2xl font-bold text-white cursor-pointer"
            @click.stop="classDesc[item.id] = !classDesc[item.id]"
          >
            &#x2715;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

const classDesc = reactive({
  babyBreaks: false,
  breakdanceYouth: false,
  yoga: false,
  fitness: false,
})

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
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. ',
  },
]
</script>
