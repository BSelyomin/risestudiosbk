<template>
  <RouterView />
  <div class="fab">
    <div tabindex="0" role="button" class="btn btn-xl btn-circle border-white bg-white">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-10">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
          <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
          <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
        </g>
      </svg>
    </div>

    <button class="btn btn-xl btn-circle">
      <RouterLink to="/" class="flex flex-row items-center">
        <svg
          fill="#FFF"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 495.398 495.398"
          xml:space="preserve"
          class="h-7"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <g>
                  <path
                    d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391 v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158 c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747 c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"
                  ></path>
                  <path
                    d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401 c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79 c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </RouterLink>
    </button>

    <button class="btn btn-xl btn-circle">
      <RouterLink to="/store" class="flex flex-row items-center">
        <svg
          fill="#FFFFFFFF"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#FFFFFFFF"
          stroke-width="0.00016"
          class="h-8"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M13.35 10.48H4.5l-.24-1.25h9.13a1.24 1.24 0 0 0 1.22-1l.84-4a1.25 1.25 0 0 0-1.22-1.51H3l-.22-1.24H.5v1.25h1.25l1.5 7.84a2 2 0 0 0-1.54 1.93 2.09 2.09 0 0 0 2.16 2 2.08 2.08 0 0 0 2.13-2 2 2 0 0 0-.16-.77h5.49a2 2 0 0 0-.16.77 2.09 2.09 0 0 0 2.16 2 2 2 0 1 0 0-4zM14.23 4l-.84 4H4l-.74-4zM3.87 13.27A.85.85 0 0 1 3 12.5a.85.85 0 0 1 .91-.77.84.84 0 0 1 .9.77.84.84 0 0 1-.94.77zm9.48 0a.85.85 0 0 1-.91-.77.92.92 0 0 1 1.81 0 .85.85 0 0 1-.9.77z"
            ></path>
          </g>
        </svg>
      </RouterLink>
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'
onMounted(() => AOS.init())
</script>
<style scoped></style>
