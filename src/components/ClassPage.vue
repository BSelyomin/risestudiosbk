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
      <div class="absolute h-full w-full top-0">
        <div
          class="absolute bg-black h-2/3 rounded-[3rem] transition-all duration-1000 ease-in-out top-1/6"
          :class="{
            'w-[90%] left-[5%] sm:w-3/4 sm:left-1/8 opacity-100': classDesc[item.id],
            'w-0 left-1/2 opacity-0': !classDesc[item.id],
          }"
          :style="{ backgroundColor: `rgba(0,0,0,${classDesc[item.id] ? '.85' : '0'}` }"
        >
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
              class="h-[90%] text-gray-400 overflow-x-auto px-7 sm:px-10 mx-auto text-md sm:text-sm lg:text-lg xl:text-xl"
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
  breakdanceTeen: false,
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
    id: 'breakdanceTeen',
    name: 'Breakdance Teen',
    image:
      'https://images.squarespace-cdn.com/content/v1/5927ce5adb29d63a65e17cd1/1625249455710-88J0CYBH3FAQYVRTSMMV/_DSC2620.jpg',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
  },
  {
    id: 'breakdanceYouth',
    name: 'Breakdance Youth',
    image:
      'https://images.squarespace-cdn.com/content/v1/5f64f5d0f09c6a2338e18ec1/3f0fd898-9fbc-4e01-8c5c-5671b433d682/AD5F457A-B084-44F9-A48C-FDE748DA9B6A.jpeg',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
  },
  {
    id: 'yoga',
    name: 'Yoga',
    image:
      'https://media.istockphoto.com/id/1481360198/photo/yoga-class-stretching-exercise-and-women-together-for-fitness-peace-and-wellness-instructor.jpg?s=612x612&w=0&k=20&c=iwIJI9NrNWLnZhOCfn7lEe8IYLdlDm0j7FbvXXWlqek=',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
  },
  {
    id: 'fitness',
    name: 'Fitness',
    image:
      'https://cdn.prod.website-files.com/65d7b904c0af185c6d721f6f/66745b16786e4667065274df_Friends-Taking-Fitness-Class-NewYorkCity.webp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
  },
]

const classDescVisible = computed(
  () =>
    classDesc.breakdanceTeen || classDesc.breakdanceYouth || classDesc.yoga || classDesc.fitness,
)
</script>
