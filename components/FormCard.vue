<template>
  <li class="overflow-hidden w-full bg-gray-50 border mb-3 even:bg-white flex flex-wrap p-3 ">
    <div class="flex flex-wrap">
      <span class="text-gray-500 text-sm">{{ new Date(message.created_at).toLocaleString() }}</span>
      <span class="text-lg w-full font-bold">{{ message.name }}</span>
      <p class="mb-3 text-base w-full" v-html="message.memo"></p>
      <div class="flex gap-2 flex-col md:flex-row md:gap-4">
        <div class="flex items-center gap-2">
          <svg class="w-auto h-4 text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
          </svg>
          <a class="text-green-700" :href="`mailto:${message.email}`">{{ message.email }}</a>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-auto h-4 text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
            <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
          </svg>
          <a class="text-green-700" :href="`tel:${message.phone}`">{{ message.phone }}</a>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({ message: Object })
</script>