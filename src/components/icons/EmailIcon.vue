<template>
  <div>
    <div class="w-10 h-10 sm:w-[70px] sm:h-[70px] flex m-auto items-center justify-center">
      <svg
        fill="#000000"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 490 490"
        xml:space="preserve"
      >
        <g>
          <g>
            <g>
              <path
                d="M295.2,257.8L251.4,295c-3.5,2.9-8.6,2.9-12,0l-43.8-37.1L16.7,409.1h456.6L295.2,257.8z"
              />
              <polygon points="0,92.2 0,397.8 180.1,245 			" />
              <polygon points="16.7,80.9 245,274.6 473.3,80.9 			" />
              <polygon points="309.9,245 490,397.8 490,92.2 			" />
            </g>
          </g>
        </g>
      </svg>
    </div>

    <div
      class="block overflow-hidden transition-all duration-500 ease-in-out"
      :style="{ height: open ? '60px' : '0px' }"
    >
      <a
        href="mailto:someone@mail.com"
        class="text-blue-500 md:text-2xl underline hover:text-blue-700 transition-colors duration-300"
        >someone@mail.com
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ open: boolean }>()
</script>
