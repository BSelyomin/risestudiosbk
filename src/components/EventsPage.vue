<template>
  <div class="m-auto mb-20 text-white text-6xl">Upcoming Events</div>

  <div>
    <span v-if="!loaded" class="loading loading-spinner loading-xl text-white" />
    <div v-else class="w-full">
      <ul
        class="timeline timeline-vertical timeline-snap-icon px-5 max-md:timeline-compact lg:w-3/4 xl:w-1/2 lg:m-auto"
      >
        <!-- Past Events -->

        <li v-for="(event, i) in events.past_events" :key="event.id">
          <hr class="bg-primary" />
          <div class="timeline-start text-white mt-0 mb-auto pt-2">
            {{
              event.date.slice(5, 7) + '/' + event.date.slice(8, 10) + '/' + event.date.slice(2, 4)
            }}
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
              :src="supabase.storage.from('images').getPublicUrl(event.image_name).data.publicUrl"
              class="rounded-lg shadow-2xl w-full md:w-3/4 xl:w-1/2 m-auto"
              @click="imageRefs.get('image' + i)?.showModal()"
            />
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

        <li v-for="(event, i) in events.future_events" :key="event.id">
          <hr :class="{ 'bg-primary': events.past_events.length !== 0 && i === 0 }" />
          <div class="timeline-start text-white mt-0 mb-auto pt-2">
            {{
              event.date.slice(5, 7) + '/' + event.date.slice(8, 10) + '/' + event.date.slice(2, 4)
            }}
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
              :src="supabase.storage.from('images').getPublicUrl(event.image_name).data.publicUrl"
              class="rounded-lg shadow-2xl w-full md:w-1/2 m-auto"
              @click="imageRefs.get('image' + i)?.showModal()"
            />
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
            v-if="
              i !== events.future_events.length - 1 ||
              events.total_future > events.future_events.length
            "
          />
        </li>
      </ul>
      <div v-if="events.total_future > events.future_events.length" class="divider">
        <button class="btn btn-wide btn-dash text-white" @click="loadMore(3)">Load More</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/supabase'
import type { CustomEvent } from '@/types.ts'

const imageRefs = ref(new Map<string, HTMLDialogElement>())

interface EventData {
  total_past: number
  total_future: number
  past_events: CustomEvent[]
  future_events: CustomEvent[]
}

const events = ref<EventData>({} as EventData)
const loaded = ref(false)
const fetchError = ref('')

async function loadMore(ammount: number) {
  const { data, error } = (await supabase
    .from('events')
    .select('*')
    .gte('date', events.value.future_events[events.value.future_events.length - 1].date)
    .order('date', { ascending: true })
    .not('id', 'in', `(${events.value.future_events.map((e) => e.id).join(',')})`)
    .limit(ammount)) as { data: CustomEvent[]; error: Error | null }
  if (error) return console.log(error)
  events.value.future_events.push(...data)
}

onMounted(async () => {
  const { data, error } = await supabase.rpc('get_adjacent_events', { _past: 1, _future: 4 })
  if (!data || data.length === 0) return (fetchError.value = 'No upcoming events found.')
  else if (error) return (fetchError.value = error.message)
  if (error) return (fetchError.value = '')
  events.value = data
  loaded.value = true
})
</script>
<style scoped>
@media (width>40rem) {
  .timeline,
  .timeline-snap-icon > li {
    --timeline-col-start: 5rem;
  }
}
</style>
