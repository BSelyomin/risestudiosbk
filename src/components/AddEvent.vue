<template>
  <button class="btn btn-soft btn-primary" @click="addEvent?.showModal()">Add Event</button>

  <dialog ref="addEvent" class="modal">
    <div class="modal-box px-15">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-lg mb-4 text-center">Add New Event</h3>
      <form @submit.prevent="submitForm">
        <fieldset class="form-control">
          <legend class="fieldset-legend text-sm py-1">Title</legend>
          <input
            type="text"
            class="input w-full validator"
            placeholder="Event Title"
            v-model="newEvent.title"
            required
          />
          <p class="validator-hint">This field is required.</p>
        </fieldset>

        <span class="flex flex-row space-x-4">
          <fieldset class="form-control flex-1">
            <legend class="fieldset-legend text-sm py-1">Select A Date</legend>
            <input
              type="date"
              class="input input-bordered w-full custom-input validator"
              v-model="newEvent.date"
              required
            />
            <p class="validator-hint">This field is required.</p>
          </fieldset>

          <fieldset class="form-control flex-1">
            <legend class="fieldset-legend text-sm py-1">Select A Time</legend>
            <input
              type="time"
              class="input input-bordered w-full custom-input validator"
              v-model="newEvent.time"
              required
            />
            <p class="validator-hint">This field is required.</p>
          </fieldset>
        </span>

        <fieldset class="form-control">
          <legend class="fieldset-legend text-sm py-1">Description</legend>
          <textarea
            class="textarea w-full validator"
            placeholder="Description"
            v-model="newEvent.description"
            required
          ></textarea>
          <p class="validator-hint">This field is required.</p>
        </fieldset>

        <fieldset class="form-control">
          <legend class="fieldset-legend text-sm py-1">Poster</legend>
          <input
            type="file"
            class="file-input w-full validator"
            ref="fileInput"
            accept="image/*"
            @change="(e) => handleFileChange(e as unknown as FileChangeEvent)"
            required
          />
          <p class="validator-hint">This field is required.</p>
        </fieldset>

        <fieldset class="form-control">
          <legend class="fieldset-legend text-sm py-1">Location</legend>
          <input
            type="text"
            class="input w-full validator"
            placeholder="Location Text"
            v-model="newEvent.location"
            required
          />
          <p class="validator-hint">This field is required.</p>
        </fieldset>

        <fieldset class="form-control">
          <legend class="fieldset-legend text-sm py-1">Location Link</legend>
          <input
            type="url"
            class="input w-full validator"
            required
            placeholder="https://"
            title="Must be valid URL"
            v-model="newEvent.location_link"
          />
          <p class="validator-hint">Must be valid URL</p>
        </fieldset>

        <div class="modal-action mt-0">
          <button type="submit" class="btn btn-success m-auto block">Create Event</button>
        </div>
      </form>
    </div>
  </dialog>
</template>
<script lang="ts" setup>
import { reactive, useTemplateRef } from 'vue'
import { supabase } from '@/supabase'
import { v4 as uuidv4 } from 'uuid'

const emit = defineEmits(['getEvents'])

const addEvent = useTemplateRef('addEvent')
const newEvent = reactive({
  title: '',
  date: '',
  time: '',
  description: '',
  image: null as File | null,
  image_name: '',
  location: '',
  location_link: '',
})

interface FileChangeEvent extends Event {
  target: HTMLInputElement & EventTarget
}

const handleFileChange = (event: FileChangeEvent) => {
  newEvent.image = event.target.files?.[0] || null
}

async function uploadImage() {
  if (!newEvent.image) return

  const fileExtension = newEvent.image.name.split('.').pop() as string
  const fileNameWithoutExt = newEvent.image.name.slice(0, -(fileExtension.length + 1))
  const newName = `${fileNameWithoutExt}-${uuidv4()}.${fileExtension}`
  console.log(newEvent.image.name)
  const { error } = await supabase.storage
    .from('images')
    .upload(newName, newEvent.image, { upsert: false })
  if (error) return error
  newEvent.image_name = newName
}

async function submitForm() {
  if (
    !newEvent.title ||
    !newEvent.date ||
    !newEvent.time ||
    !newEvent.description ||
    !newEvent.location ||
    !newEvent.location_link ||
    !newEvent.image
  )
    return alert('Please fill in all fields.')
  const err = await uploadImage()
  if (err) return alert('Error uploading image: ' + (err.message || 'Unknown error'))

  const { error } = await supabase.from('events').insert([
    {
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      description: newEvent.description,
      image_name: newEvent.image_name,
      location: newEvent.location,
      location_link: newEvent.location_link,
    },
  ])
  if (error) return alert('Error adding event: ' + error.message)
  addEvent?.value?.close()
  newEvent.title = ''
  newEvent.date = ''
  newEvent.time = ''
  newEvent.description = ''
  newEvent.image_name = ''
  newEvent.location = ''
  newEvent.location_link = ''

  emit('getEvents')
}
</script>
