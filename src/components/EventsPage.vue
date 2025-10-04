<template>
  <div class="m-auto text-white text-6xl">Upcoming Events</div>

  <div class="">
    <span v-if="!loaded" class="loading loading-spinner loading-xl text-white" />
    <div v-else class="w-full">
      <div v-for="(event, i) in events" :key="event.id" class="w-full">
        <div class="hero w-full">
          <div
            class="hero-content flex-col-reverse lg:flex-row w-full"
            :class="{ 'lg:flex-row-reverse': i % 2 == 1 }"
          >
            <div class="flex flex-col items-center">
              <img
                :src="supabase.storage.from('images').getPublicUrl(event.image_name).data.publicUrl"
                class="max-w-lg rounded-lg shadow-2xl"
                @click="imageRefs.get('image' + i)?.showModal()"
              />
              />
              <dialog
                :ref="(el) => imageRefs.set('image' + i, el as HTMLDialogElement)"
                class="modal"
              >
                <form method="dialog" class="w-full">
                  <button class="bg-transparent w-full m-auto">
                    <img
                      :src="
                        supabase.storage.from('images').getPublicUrl(event.image_name).data
                          .publicUrl
                      "
                      class="w-1/2 rounded-lg shadow-2xl m-auto"
                      @click="imageRefs.get('image' + i)?.showModal()"
                    />
                  </button>
                </form>
              </dialog>

              <div class="flex flex-row items-center gap-2 mt-5 text-white">
                <LocationIcon class="w-12 h-12" />
                <a
                  :href="event.location_link"
                  target="_blank"
                  class="underline hover:text-blue-400 transition-colors duration-300"
                  >{{ event.location }}</a
                >
              </div>
            </div>
            <div class="h-full relative">
              <div class="relative flex flex-row items-center text-white w-full top-0">
                <div class="flex flex-col justify-center w-25 h-25">
                  <h1 class="text-5xl">{{ event.date.slice(8, 10) }}</h1>
                  <h2 class="text-2xl">
                    {{ monthMap[event.date.slice(5, 7) as keyof typeof monthMap] }}
                  </h2>
                </div>
                <h1 class="text-white text-3xl px-5 flex justify-between w-[calc(100%-6.25rem)]">
                  <p>{{ event.title }}</p>
                </h1>
              </div>
              <p class="text-xl text-center my-5 px-10 text-white">{{ event.description }}</p>
            </div>
          </div>
        </div>
        <div v-if="i !== 2" class="divider" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/supabase'
import LocationIcon from './icons/LocationIcon.vue'
import type { CustomEvent } from '@/types.ts'

const imageRefs = ref(new Map<string, HTMLDialogElement>())

const monthMap = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
}
const events = ref<CustomEvent[]>([])
const loaded = ref(false)
const fetchError = ref('')
onMounted(async () => {
  const { data, error } = (await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })
    .order('time', { ascending: true })
    .limit(3)) as { data: CustomEvent[]; error: Error | null }
  if (!data || data.length === 0) return (fetchError.value = 'No upcoming events found.')
  else if (error) return (fetchError.value = error.message)
  const img = supabase.storage.from('images').getPublicUrl(data[0].image_name)
  console.log(img.data.publicUrl)
  if (error) return (fetchError.value = '')
  events.value = data
  loaded.value = true
})
</script>
