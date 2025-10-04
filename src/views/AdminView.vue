<template>
  <div
    class="flex items-center justify-center h-screen bg-base-200"
    @click="active = { index: -1, key: '' }"
  >
    <span v-if="loading" class="loading loading-spinner loading-xl text-white" />
    <div v-else-if="!loggedIn" class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold mb-4 m-auto">Login</h2>

        <form @submit.prevent="handleLogin">
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              placeholder="user@example.com"
              class="input input-bordered w-full"
              type="email"
              v-model="email"
              autocomplete="email"
              required
            />
          </div>

          <div class="form-control mb-6">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              class="input input-bordered w-full"
              autocomplete="current-password"
              v-model="password"
              required
            />
          </div>

          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary m-auto block">Login</button>
          </div>
        </form>
      </div>
    </div>
    <div v-else class="relative w-full h-full">
      <button class="btn btn-active btn-error ml-auto mr-2 mt-2 mb-4 block" @click="handleLogout">
        Log Out
      </button>
      <div class="pb-3 px-10 w-full">
        <AddEvent @getEvents="getEvents" />
        <button class="btn btn-soft btn-error mx-1" v-if="deleteid.length" @click="deleteEvents">
          Delete
        </button>
        <span class="float-right" v-if="Object.keys(changesMade).length > 0">
          <button class="btn btn-soft btn-success mr-1" @click="saveChanges">Save</button>
          <button class="btn btn-soft btn-error mx-1" @click="discardChanges">Discard</button>
        </span>
      </div>
      <div class="overflow-auto pb-0 mx-10 max-h-[calc(100vh-150px)]">
        <table class="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th class="w-10"></th>
              <th class="w-10">ID</th>
              <td class="w-30">Title</td>
              <td class="w-20">Date</td>
              <td class="w-20">Time</td>
              <td class="w-100">Description</td>
              <td>Location</td>
              <td class="w-30">Location Link</td>
              <td>Image</td>
              <th class="w-5"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, i) in events" :key="event.id">
              <th>
                <label>
                  <input
                    type="checkbox"
                    class="checkbox"
                    v-model="deleteid"
                    :value="event.id"
                    @click.stop
                  />
                </label>
              </th>
              <th>{{ event.id }}</th>
              <td
                v-for="key in eventKeys"
                :key="key"
                class="relative max-w-70"
                :class="{ truncate: !(active.index == i && active.key == key) }"
              >
                <textarea
                  v-if="active.index == i && active.key == key"
                  class="textarea text-xs absolute top-0 z-100"
                  :value="event[key as keyof typeof event]"
                  @input="(e) => changedInput(e, i, key as keyof typeof event, event.id)"
                  @click.stop=""
                />
                <button
                  v-else
                  class="cursor-pointer w-full text-left"
                  @click.stop="active = { index: i, key }"
                >
                  {{ event[key as keyof typeof event] }}
                </button>
              </td>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import type { User } from '@supabase/supabase-js'
import type { CustomEvent } from '@/types.ts'
import AddEvent from '@/components/AddEvent.vue'

const eventKeys = [
  'title',
  'date',
  'time',
  'description',
  'location',
  'location_link',
  'image_name',
]
const email = ref('')
const loading = ref(true)
const password = ref('')
const loggedIn = ref(false)
const userData = ref<User>({} as User)
const events = ref<CustomEvent[]>([])
const originalEvents = ref<CustomEvent[]>([])
const deleteid = ref<number[]>([])
const active = ref({ index: -1, key: '' })
const changesMade = ref<{ [key: number]: (keyof CustomEvent)[] }>({})

function changedInput(e: Event, i: number, key: keyof CustomEvent, id: number) {
  const target = e.target as HTMLTextAreaElement
  if (key === 'id') return
  if (target) events.value[i][key] = target.value

  if (events.value[i][key] === originalEvents.value[i][key]) {
    if (changesMade.value[id].length === 1) delete changesMade.value[id]
    else changesMade.value[id].splice(changesMade.value[id].indexOf(key), 1)
  } else {
    if (changesMade.value[id]) {
      if (!changesMade.value[id].includes(key)) changesMade.value[id].push(key)
    } else changesMade.value[id] = [key]
  }
}

function discardChanges() {
  events.value = JSON.parse(JSON.stringify(originalEvents.value))
  changesMade.value = {}
}

async function deleteEvents() {
  if (!deleteid.value.length) return
  if (!confirm(`Are you sure you want to delete ${deleteid.value.length} events?`)) return
  const { error } = await supabase.from('events').delete().in('id', deleteid.value)
  if (error) return alert('Error deleting events: ' + error.message)
  deleteid.value = []
  getEvents()
}

async function saveChanges() {
  for (const id in changesMade.value) {
    const event = events.value.find((e) => e.id === parseInt(id))
    if (!event) continue
    const { error } = await supabase.from('events').update(event).eq('id', id)
    if (error) return alert('Error saving changes: ' + error.message)
  }
  changesMade.value = {}
  getEvents()
}

async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })
  if (error) return console.error('Error fetching events:', error.message)
  originalEvents.value = JSON.parse(JSON.stringify(data))
  events.value = data as CustomEvent[]
}

async function handleLogin() {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) return alert('Error logging in: ' + error.message)
  loggedIn.value = true
  userData.value = data.user as User
  getEvents()
}

async function handleLogout() {
  const { error } = await supabase.auth.signOut()
  if (error) return alert('Error logging out: ' + error.message)
  loggedIn.value = false
  userData.value = {} as User
  email.value = ''
  password.value = ''
  events.value = []
}

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  loading.value = false

  if (!user) return
  loggedIn.value = true
  userData.value = user as User
  getEvents()
})

//adminaccount@dev.com
//T9u$H£33L;k&
</script>
