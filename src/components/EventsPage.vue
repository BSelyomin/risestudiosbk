<template>
  <div class="m-auto mb-20 text-white text-6xl">Upcoming Events</div>

  <div>
    <span v-if="!loaded" class="loading loading-spinner loading-xl text-white" />
    <div v-else-if="fetchError" class="text-white text-center text-xl">{{ fetchError }}</div>
    <div v-else class="w-full">
      <ul
        class="timeline timeline-vertical timeline-snap-icon px-5 max-md:timeline-compact lg:w-3/4 xl:w-1/2 lg:m-auto"
      >
        <!-- Past Events -->

        <li v-for="(event, i) in events.past_events" :key="i">
          <hr class="bg-primary" />
          <div class="timeline-start text-white mt-0 mb-auto pt-2">
            {{ formatDateToMDY(event.date) }}
          </div>

          <div class="timeline-middle rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="text-primary h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="timeline-end text-white w-full mb-20">
            <p class="text-3xl">{{ event.title }}</p>
            <p class="my-3">{{ event.description }}</p>
            <img
              :src="getResponsiveImage(event.image_name, 0.5)"
              class="rounded-lg shadow-2xl w-full md:w-3/4 xl:w-1/2 m-auto cursor-pointer"
              @click="imageRefs.get('image' + i)?.showModal()"
              loading="lazy"
            />
            <dialog
              :ref="(el) => imageRefs.set('image' + i, el as HTMLDialogElement)"
              class="modal"
            >
              <div class="modal-box max-w-6xl p-0">
                <form method="dialog">
                  <button
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 bg-base-100/50"
                  >
                    ✕
                  </button>
                </form>
                <img
                  :src="getResponsiveImage(event.image_name)"
                  class="w-full"
                  alt="Full size image"
                />
              </div>
              <form method="dialog" class="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            <div class="flex items-center gap-2 mt-5 text-white text-center justify-center">
              <svg
                version="1.0"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="800px"
                height="800px"
                viewBox="0 0 64 64"
                enable-background="new 0 0 64 64"
                xml:space="preserve"
                class="w-12 h-12"
              >
                <path
                  fill="#ffffff"
                  d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24
	C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24
	C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
                />
              </svg>
              <a
                :href="event.location_link"
                target="_blank"
                class="underline hover:text-blue-400 transition-colors duration-300"
                >{{ event.location }}</a
              >
            </div>
          </div>
          <hr
            v-if="i !== events.past_events.length - 1 || events.future_events.length !== 0"
            class="bg-primary"
          />
        </li>

        <!-- Future Events -->

        <li v-for="(event, i) in events.future_events" :key="'future-' + i">
          <hr :class="{ 'bg-primary': events.past_events.length !== 0 && i === 0 }" />
          <div class="timeline-start text-white mt-0 mb-auto pt-2">
            {{ formatDateToMDY(event.date) }}
          </div>
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                color="white"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div class="timeline-end text-white w-full mb-20">
            <p class="text-3xl">{{ event.title }}</p>
            <p class="my-3">{{ event.description }}</p>
            <img
              :src="getResponsiveImage(event.image_name, 0.5)"
              class="rounded-lg shadow-2xl w-full md:w-1/2 m-auto cursor-pointer"
              @click="imageRefs.get('future-image' + i)?.showModal()"
              loading="lazy"
            />
            <dialog
              :ref="(el) => imageRefs.set('future-image' + i, el as HTMLDialogElement)"
              class="modal"
            >
              <div class="modal-box max-w-6xl p-0">
                <form method="dialog">
                  <button
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 bg-base-100/50"
                  >
                    ✕
                  </button>
                </form>
                <img
                  :src="getResponsiveImage(event.image_name)"
                  class="w-full"
                  alt="Full size image"
                />
              </div>
              <form method="dialog" class="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            <div class="flex items-center gap-2 mt-5 text-white text-center justify-center">
              <svg
                version="1.0"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="800px"
                height="800px"
                viewBox="0 0 64 64"
                enable-background="new 0 0 64 64"
                xml:space="preserve"
                class="w-12 h-12"
              >
                <path
                  fill="#ffffff"
                  d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24
	C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24
	C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
                />
              </svg>
              <a
                :href="event.location_link"
                target="_blank"
                class="underline hover:text-blue-400 transition-colors duration-300"
                >{{ event.location }}</a
              >
            </div>
          </div>
          <hr v-if="i !== events.future_events.length - 1" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as XLSX from 'xlsx'
import { getResponsiveImage } from '@/utils'

const imageRefs = ref(new Map<string, HTMLDialogElement>())

interface EventFromFile {
  Title: string
  Date: string
  Description: string
  'Image Name': string
  Location: string
  'Location Link': string
}

interface CustomEvent {
  title: string
  date: Date
  description: string
  location: string
  location_link: string
  image_name: string
}

interface EventData {
  total_past: number
  total_future: number
  past_events: CustomEvent[]
  future_events: CustomEvent[]
}

const events = ref<EventData>({
  total_past: 0,
  total_future: 0,
  past_events: [],
  future_events: [],
})
const loaded = ref(false)
const fetchError = ref('')

function parseDate(dateString: string): Date {
  // Handle Excel date serial numbers
  if (typeof dateString === 'number') {
    const excelEpoch = new Date(1899, 11, 30)
    return new Date(excelEpoch.getTime() + dateString * 86400000)
  }
  return new Date(dateString)
}

function formatDateToMDY(dateObj: Date) {
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  return `${month}/${day}/${year}`
}

async function loadEventsFromExcel() {
  try {
    const response = await fetch('/data.xlsx')
    if (!response.ok) throw new Error('Failed to load data.xlsx')

    const arrayBuffer = await response.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer, { type: 'array' })

    // Make sure we're reading from the 'Events' sheet, not 'Shop'
    if (!workbook.SheetNames.includes('Events')) {
      throw new Error('Events sheet not found in Excel file')
    }

    const worksheet = workbook.Sheets['Events']
    const rawData = XLSX.utils.sheet_to_json(worksheet) as EventFromFile[]

    // Process and format the events
    const allEvents: CustomEvent[] = rawData.map((row) => ({
      title: row.Title || '',
      date: parseDate(row.Date),
      description: row.Description || '',
      location: row.Location || '',
      location_link: row['Location Link'] || '',
      image_name: row['Image Name'] ? `/events/${row['Image Name']}` : '',
    }))

    // Sort by date
    allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Split into past and future events
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const pastEvents = allEvents.filter((event) => event.date < today)
    const futureEvents = allEvents.filter((event) => event.date >= today)

    events.value = {
      total_past: pastEvents.length,
      total_future: futureEvents.length,
      past_events: pastEvents.slice(-1), // Show only the most recent past event
      future_events: futureEvents.slice(0, 4), // Show first 4 future events
    }

    loaded.value = true
  } catch (error) {
    console.error('Error loading Excel file:', error)
    fetchError.value = 'Failed to load events data'
    loaded.value = true
  }
}

onMounted(() => loadEventsFromExcel())
</script>

<style scoped>
@media (width>40rem) {
  .timeline,
  .timeline-snap-icon > li {
    --timeline-col-start: 5rem;
  }
}
</style>
