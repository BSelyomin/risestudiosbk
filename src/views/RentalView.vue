<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-4 gap-2 mb-6 aspect-[2/1] md:aspect-[16/7]">
        <div class="col-span-2 row-span-2 relative group overflow-hidden">
          <img
            :src="getResponsiveImage(images[0])"
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
            :src="getResponsiveImage(img)"
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
        <div class="lg:col-span-2 space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">Brighton Beach Dance Studio</h1>
            <div class="flex items-center text-gray-400 space-x-4">
              <div class="flex items-center">
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
          </div>

          <div class="border-t border-b border-gray-800 py-6">
            <div class="text-3xl font-bold text-white mb-1">
              $150<span class="text-lg font-normal text-gray-400">/night</span>
            </div>
          </div>

          <div>
            <h2 class="text-xl font-semibold mb-4 text-white">About this space</h2>
            <p class="text-gray-400 leading-relaxed">
              Beautiful modern studio in the heart of downtown Seattle. This newly renovated space
              features floor-to-ceiling windows, hardwood floors, and contemporary furnishings.
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
        </div>

        <div class="lg:col-span-1">
          <div class="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-6 sticky top-8">
            <h3 class="text-lg font-semibold mb-4 text-white">Select your dates</h3>

            <div class="space-y-4">
              <div class="flex items-center justify-between mb-4">
                <button
                  @click="previousMonth"
                  class="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h3 class="font-semibold text-lg text-white">{{ currentMonthDisplay }}</h3>
                <button
                  @click="nextMonth"
                  class="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div class="grid grid-cols-7 gap-1 mb-2">
                <div
                  v-for="day in weekDays"
                  :key="day"
                  class="text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  {{ day }}
                </div>
              </div>

              <div class="grid grid-cols-7 gap-1">
                <div v-for="(day, idx) in calendarDays" :key="idx">
                  <button
                    v-if="day"
                    @click="handleDateClick(day)"
                    :disabled="day.disabled"
                    :class="[
                      'h-10 w-full rounded-md flex items-center justify-center text-sm font-medium transition-all duration-200',
                      day.disabled
                        ? 'text-gray-700 cursor-not-allowed line-through'
                        : 'hover:bg-gray-800 text-gray-300',
                      day.isStart || day.isEnd
                        ? 'bg-blue-600 text-white hover:bg-blue-500 scale-105 z-10'
                        : '',
                      day.inRange && !day.isStart && !day.isEnd
                        ? 'bg-blue-900/40 text-blue-200'
                        : '',
                    ]"
                  >
                    {{ day.date.getDate() }}
                  </button>
                  <div v-else class="h-10"></div>
                </div>
              </div>
            </div>

            <div
              v-if="selectedDates.start && selectedDates.end"
              class="mt-6 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg animate-fade-in"
            >
              <div class="text-sm text-blue-300 mb-2">
                <div class="flex justify-between">
                  <span>Check-in:</span>
                  <span class="font-mono">{{ formatDate(selectedDates.start) }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Check-out:</span>
                  <span class="font-mono">{{ formatDate(selectedDates.end) }}</span>
                </div>
              </div>
              <div class="border-t border-blue-800/30 mt-2 pt-2 flex justify-between items-center">
                <span class="text-gray-400">Total Price</span>
                <span class="text-xl font-bold text-white">${{ totalPrice }}</span>
              </div>
            </div>

            <button
              :disabled="!selectedDates.start || !selectedDates.end"
              :class="[
                'w-full mt-4 py-3 rounded-lg font-bold uppercase tracking-wide transition-all duration-300',
                selectedDates.start && selectedDates.end
                  ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20'
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed',
              ]"
            >
              Reserve Now
            </button>
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
        :src="images[selectedImage]"
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
import { ref, reactive, computed } from 'vue'
import { getResponsiveImage } from '@/utils'

// --- Interfaces ---
interface Amenity {
  icon: string
  label: string
}

interface CalendarDay {
  date: Date
  disabled: boolean
  isStart: boolean
  isEnd: boolean
  inRange: boolean
}

interface DateSelection {
  start: Date | null
  end: Date | null
}

// --- State ---
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
const currentMonth = ref<Date>(new Date())
const weekDays = ref<string[]>(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])

const selectedDates = reactive<DateSelection>({
  start: null,
  end: null,
})

const unavailableDates = ref<Date[]>([
  new Date(2025, 11, 15),
  new Date(2025, 11, 25),
  new Date(2026, 0, 1),
])

const amenities = ref<Amenity[]>([
  {
    icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
    label: 'High-speed WiFi',
  },
  {
    icon: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2',
    label: 'Free Parking',
  },
  {
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    label: 'Up to 4 guests',
  },
  {
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    label: 'Full Kitchen',
  },
])

const isDateUnavailable = (date: Date): boolean => {
  return unavailableDates.value.some((unavailable) => isSameDay(date, unavailable))
}

const isDateInPast = (date: Date): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

// --- Computed Properties ---
const currentMonthDisplay = computed(() => {
  return currentMonth.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const days: (CalendarDay | null)[] = []

  // Fill empty slots for start of month
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null)
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d)
    const disabled = isDateUnavailable(date) || isDateInPast(date)

    days.push({
      date,
      disabled,
      isStart: !!selectedDates.start && isSameDay(date, selectedDates.start),
      isEnd: !!selectedDates.end && isSameDay(date, selectedDates.end),
      inRange: !!(
        selectedDates.start &&
        selectedDates.end &&
        date > selectedDates.start &&
        date < selectedDates.end
      ),
    })
  }
  return days
})

const totalPrice = computed(() => {
  if (!selectedDates.start || !selectedDates.end) return 0
  const diffTime = Math.abs(selectedDates.end.getTime() - selectedDates.start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays * 150
})

// --- Methods ---
const previousMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() - 1,
    1,
  )
}

const nextMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() + 1,
    1,
  )
}

const handleDateClick = (day: { date: Date; disabled: boolean }) => {
  if (day.disabled) return

  const clickedDate = day.date

  // Case 1: Nothing is selected, or both are already selected (starting fresh)
  if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
    selectedDates.start = clickedDate
    selectedDates.end = null
    return
  }

  // Case 2: One date is already selected
  if (selectedDates.start && !selectedDates.end) {
    if (clickedDate < selectedDates.start) {
      // If clicking a previous date, make the old start the new end
      selectedDates.end = selectedDates.start
      selectedDates.start = clickedDate
    } else if (isSameDay(clickedDate, selectedDates.start)) {
      // Toggle off if clicking same day
      selectedDates.start = null
    } else {
      // Normal range selection
      selectedDates.end = clickedDate
    }
  }
}

const isSameDay = (d1: Date, d2: Date) => d1.getTime() === d2.getTime()

const formatDate = (date: Date | null): string => {
  return date
    ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : ''
}

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
