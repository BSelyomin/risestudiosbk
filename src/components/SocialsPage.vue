<template>
  <h2 class="absolute text-center w-full top-[5%] text-6xl font-bold text-white m-auto z-5">
    Contact Us
  </h2>
  <img
    src="https://i.pinimg.com/736x/12/54/21/12542125ae253ba1b18fd8ba1b3e0dbc.jpg"
    alt="breakdancer"
    class="absolute inset-0 w-full h-150 sm:h-200 grayscale-75 blur-xs object-cover z-0"
  />
  <div
    class="absolute -top-5 left-0 w-full h-160 sm:h-210 [background-image:linear-gradient(to_bottom,black_0%,transparent_30%,transparent_70%,black_100%)]"
  />
  <div class="w-full relative top-[5%] left-0 h-100 sm:h-150">
    <div
      v-for="(_, i) in contacts"
      :key="i"
      class="absolute w-25 h-40 top-[calc(50%-10rem)] sm:h-60 sm:top-[calc(50%-15rem)] transition-all left-[calc(50%-3.125rem)] ease-in-out origin-bottom duration-1000"
      :style="{ rotate: `${30 + i * 60}deg` }"
    >
      <div
        class="w-15 h-15 sm:w-25 sm:h-25 bg-white m-auto rounded-full transition-all duration-1000 ease-in-out flex items-center justify-center text-3xl cursor-pointer"
        :style="{ transform: `rotate(-${30 + i * 60}deg)` }"
        @click="openSocial(i, false)"
      >
        &#x2715;
      </div>
    </div>
    <div
      v-for="(social, i) in contacts"
      :key="i"
      class="absolute transition-all left-[calc(50%-1.875rem)] sm:left-[calc(50%-3.125rem)] ease-in-out origin-bottom duration-1000"
      :class="{
        'w-50 h-50 top-[calc(50%-6.25rem)] left-[calc(50%-6.25rem)] sm:w-70 sm:h-70 sm:top-[calc(50%-8.75rem)] sm:left-[calc(50%-8.75rem)] origin-center':
          enlarge && socials === i,
        'w-15 h-40 sm:w-25 sm:h-60 top-[calc(50%-10rem)] sm:top-[calc(50%-15rem)]':
          !enlarge || socials !== i,
      }"
      :style="{ rotate: `${30 + i * 60}deg` }"
    >
      <div
        class="w-15 h-15 sm:w-25 sm:h-25 bg-white rounded-full transition-all duration-1000 ease-in-out flex items-center justify-center cursor-pointer"
        :class="{ 'w-50 h-50 sm:w-70 sm:h-70': enlarge && socials === i }"
        @click="openSocial(i, true)"
      >
        <div :style="{ transform: `rotate(-${30 + i * 60}deg)` }">
          <component :is="social" :open="contactsOpen[i]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Instagram from '@/components/icons/InstaGram.vue'
import PhoneIcon from '@/components/icons/PhoneIcon.vue'
import EmailIcon from '@/components/icons/EmailIcon.vue'
import Facebook from '@/components/icons/FaceBook.vue'
import WhatsApp from '@/components/icons/WhatsApp.vue'
import LinkedIn from '@/components/icons/LinkedIn.vue'

const contacts = [Instagram, PhoneIcon, EmailIcon, Facebook, WhatsApp, LinkedIn]
const contactsOpen = ref([false, false, false, false, false, false])

const socials = ref(-1)
const enlarge = ref(false)
let socialsTimeout: NodeJS.Timeout | null = null
function openSocial(index: number, open: boolean) {
  if (socialsTimeout) clearTimeout(socialsTimeout)
  if (open) {
    enlarge.value = true
    socials.value = index
    socialsTimeout = setTimeout(() => (contactsOpen.value[index] = true), 1000)
  } else if (!contactsOpen.value[index]) {
    socials.value = -1
    enlarge.value = false
  } else {
    contactsOpen.value[index] = false
    socialsTimeout = setTimeout(() => {
      socials.value = -1
      enlarge.value = false
    }, 500)
  }
}
</script>
