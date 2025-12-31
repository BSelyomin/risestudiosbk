<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-4 gap-2 mb-6 aspect-[2/1] md:aspect-[16/7]">
        <div class="col-span-2 row-span-2 relative group overflow-hidden">
          <img
            :src="getResponsiveImage(images[0], 0.5)"
            alt="Main view"
            class="w-full h-full object-cover rounded-l-lg cursor-pointer hover:scale-105 transition duration-500"
            @click="openImageModal(0)"
          />
        </div>

        <div
          v-for="(img, idx) in images.slice(1, 5)"
          :key="idx"
          class="relative group overflow-hidden"
        >
          <img
            :src="getResponsiveImage(img, 0.2)"
            :alt="'View ' + (idx + 2)"
            :class="[
              'w-full h-full object-cover cursor-pointer hover:scale-105 transition duration-500',
              idx === 1 ? 'rounded-tr-lg' : '',
              idx === 3 ? 'rounded-br-lg' : '',
            ]"
            @click="openImageModal(idx + 1)"
          />

          <div
            v-if="idx === 3 && images.length > 5"
            @click="openImageModal(4)"
            class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center cursor-pointer pointer-events-none group-hover:bg-black/40 transition"
          >
            <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <span class="text-sm font-bold">+{{ images.length - 5 }} more</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
          <div>
            <h1 class="text-4xl font-bold text-white mb-2">Brighton Beach Dance Studio</h1>
            <div class="flex items-center text-gray-400">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>3063 Brighton 8th St, Brooklyn, NY 11235</span>
            </div>
          </div>
          <div class="border-y border-gray-800 py-6">
            <div class="text-3xl font-bold text-white">
              $65<span class="text-lg font-normal text-gray-400">/hour</span>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-semibold mb-4 text-white">About this space</h2>
            <p class="text-gray-400 leading-relaxed">
              Rise Studios is a versatile, community-centered space available for rentals, perfect
              for birthday parties, rehearsals, and special events. We also host diverse programs
              including dance, martial arts, yoga, and movement-based classes for all ages.
            </p>
          </div>

          <div>
            <h2 class="text-xl font-semibold mb-4 text-white">Amenities</h2>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="amenity in amenities"
                :key="amenity.label"
                class="flex items-center space-x-3"
              >
                <svg
                  class="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="amenity.icon"
                  />
                </svg>
                <span class="text-gray-300">{{ amenity.label }}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-xl font-semibold mb-4 text-white">Current Weekly Schedule</h2>
            <div v-if="loading" class="text-blue-400 animate-pulse">Loading live schedule...</div>
            <div v-else class="overflow-x-auto rounded-lg border border-gray-800 shadow-inner">
              <table class="w-full text-left border-collapse bg-gray-900/50">
                <thead>
                  <tr class="bg-gray-800/50">
                    <th class="p-3 border-b border-gray-700 text-xs uppercase text-gray-400">
                      Time
                    </th>
                    <th
                      v-for="day in weekDays"
                      :key="day"
                      class="p-3 border-b border-gray-700 text-xs font-bold text-white text-center"
                    >
                      {{ day.substring(0, 3) }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="time in timeSlots"
                    :key="time"
                    class="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                  >
                    <td class="p-3 text-[10px] font-mono text-gray-400 whitespace-nowrap">
                      {{ time }}
                    </td>
                    <td v-for="day in weekDays" :key="day" class="p-1">
                      <div
                        :class="[
                          'py-2 rounded text-center text-[9px] font-black tracking-tighter transition-all',
                          isAvailable(day, time)
                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                            : 'bg-red-500/20 text-red-600 border border-red-300/20 opacity-80',
                        ]"
                      >
                        {{ isAvailable(day, time) ? 'FREE' : 'TAKEN' }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="sticky top-8 space-y-4">
            <div
              class="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl ring-1 ring-white/5"
            >
              <h2 class="text-2xl font-bold mb-2 text-white">Reserve this Space</h2>
              <p class="text-sm text-gray-400 mb-6">
                Check the schedule for availability, then contact us via your preferred method to
                book.
              </p>

              <div class="space-y-3">
                <a
                  href="tel:9179952100"
                  class="flex items-center gap-4 bg-gray-950 p-4 rounded-xl border border-gray-800 hover:border-blue-500 transition-colors group"
                >
                  <div
                    class="w-10 h-10 flex items-center justify-center bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span class="block text-[10px] text-gray-500 uppercase font-black"
                      >Call Us</span
                    >
                    <span class="text-white font-medium">+1 (917) 995-2100</span>
                  </div>
                </a>

                <a
                  href="sms:9179952100"
                  class="flex items-center gap-4 bg-gray-950 p-4 rounded-xl border border-gray-800 hover:border-blue-500 transition-colors group"
                >
                  <div
                    class="w-10 h-10 flex items-center justify-center bg-green-500/10 rounded-lg text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span class="block text-[10px] text-gray-500 uppercase font-black"
                      >Text Us</span
                    >
                    <span class="text-white font-medium">+1 (917) 995-2100</span>
                  </div>
                </a>

                <a
                  href="mailto:Risestudiosbk@gmail.com"
                  class="flex items-center gap-4 bg-gray-950 p-4 rounded-xl border border-gray-800 hover:border-blue-500 transition-colors group"
                >
                  <div
                    class="w-10 h-10 flex items-center justify-center bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span class="block text-[10px] text-gray-500 uppercase font-black">Email</span>
                    <span class="text-white font-medium text-xs">Risestudiosbk@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showImageModal"
      class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
    >
      <button
        @click="showImageModal = false"
        class="absolute top-6 right-6 text-gray-400 hover:text-white"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <button
        @click="previousImage"
        class="absolute left-6 p-3 bg-gray-900/50 rounded-full text-white hover:bg-gray-800"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <img
        :src="getResponsiveImage(images[selectedImage])"
        class="max-h-[85vh] max-w-full rounded shadow-2xl object-contain"
      />
      <button
        @click="nextImage"
        class="absolute right-6 p-3 bg-gray-900/50 rounded-full text-white hover:bg-gray-800"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getResponsiveImage } from '@/utils'
import * as XLSX from 'xlsx'

interface Amenity {
  icon: string
  label: string
}

const images = ref<string[]>([
  '/rental/IMG_5664.JPG',
  '/rental/IMG_5665.JPG',
  '/rental/IMG_5666.JPG',
  '/rental/IMG_5667.JPG',
  '/rental/IMG_5668.JPG',
  '/rental/IMG_5669.JPG',
  '/rental/IMG_5670.JPG',
  '/rental/IMG_5671.JPG',
  '/rental/IMG_5672.JPG',
  '/rental/IMG_5673.JPG',
  '/rental/IMG_5674.JPG',
  '/rental/IMG_5675.JPG',
  '/rental/IMG_5676.JPG',
  '/rental/IMG_5677.JPG',
  '/rental/IMG_5678.JPG',
  '/rental/IMG_5679.JPG',
  '/rental/IMG_5680.JPG',
])

const selectedImage = ref<number>(0)
const showImageModal = ref<boolean>(false)

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const timeSlots = ref<string[]>([])

const availabilityData = ref<Record<string, Record<string, boolean>>>({})
const loading = ref(true)

const isAvailable = (day: string, time: string) => {
  // If the data exists and is marked as true/checked in Excel, it is NOT available
  if (availabilityData.value[day] && availabilityData.value[day][time] === true) {
    return false
  }
  return true
}

const loadExcelData = async () => {
  try {
    // Fetches data.xlsx from the /public folder
    const response = await fetch('/data.xlsx')
    const arrayBuffer = await response.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer, { type: 'array' })

    const sheet = workbook.Sheets[workbook.SheetNames[2]]
    const jsonData: Record<string, boolean | string>[] = XLSX.utils.sheet_to_json(sheet)
    console.log(jsonData)
    const newMap: Record<string, Record<string, boolean>> = {}

    jsonData.slice(0, 24).forEach((row) => {
      const hour = row['Time'] as string // Matches the "Time" column in your Excel
      console.log(hour)
      timeSlots.value.push(hour)
      weekDays.forEach((day) => {
        if (!newMap[day]) newMap[day] = {}
        // If cell has any value (is checked), mark as TRUE (which means "Booked")
        newMap[day][hour] = row[day] ? true : false
      })
    })

    availabilityData.value = newMap
  } catch (error) {
    console.error('Error loading Excel sheet:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadExcelData()
})

const amenities = ref<Amenity[]>([
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    label: 'Climate Controlled',
  },
  {
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    label: 'Available Restroom',
  },
  {
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    label: 'High-quality Speaker',
  },
  {
    icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
    label: 'High-speed WiFi',
  },
  {
    icon: 'M8 9l4-4 4 4m0 6l-4 4-4-4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z',
    label: 'Elevator Access',
  },
])
const openImageModal = (index: number) => {
  selectedImage.value = index
  showImageModal.value = true
}

const previousImage = () => {
  selectedImage.value = (selectedImage.value - 1 + images.value.length) % images.value.length
}

const nextImage = () => {
  selectedImage.value = (selectedImage.value + 1) % images.value.length
}
</script>
