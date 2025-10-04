<template>
  <div>
    <div class="w-10 h-10 sm:w-[70px] sm:h-[70px] flex m-auto items-center justify-center">
      <svg fill="#000000" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M185.6 0H70.4A70.4 70.4 0 0 0 0 70.4v115.2A70.4 70.4 0 0 0 70.4 256h115.2a70.4 70.4 0 0 0 70.4-70.4V70.4A70.4 70.4 0 0 0 185.6 0zm46.933 185.6a46.933 46.933 0 0 1-46.933 46.933H70.4A46.933 46.933 0 0 1 23.467 185.6V70.4A46.933 46.933 0 0 1 70.4 23.467h115.2A46.933 46.933 0 0 1 232.533 70.4v115.2z"
        />
        <path
          d="M128 61.867c-36.533 0-66.133 29.6-66.133 66.133s29.6 66.133 66.133 66.133 66.133-29.6 66.133-66.133S164.533 61.867 128 61.867zm0 106.666A40.533 40.533 0 1 1 128 87 40.533 40.533 0 0 1 128 168.533zM202.667 42.667a15.867 15.867 0 1 1-15.867 15.866 15.867 15.867 0 0 1 15.867-15.866z"
        />
      </svg>
    </div>
    <div
      class="block overflow-hidden transition-all duration-500 ease-in-out"
      :style="{ height: open ? '60px' : '0px' }"
    >
      <a
        href="https://www.instagram.com/risestudios_bk/?hl=en"
        class="text-blue-500 text-xl underline hover:text-blue-700 transition-colors duration-300"
        >risestudios_bk
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ open: boolean }>()
</script>
