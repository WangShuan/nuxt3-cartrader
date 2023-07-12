<template>
  <div>
    <h1 class="text-2xl lg:text-4xl text-green-800 mb-10">所有回覆</h1>
    <ul v-if="messages.length" class="grid grid-cols-1 gaps-4 mb-10">
      <FormCard v-for="msg in messages" :key="msg.id" :message="msg" />
    </ul>
    <h2 class="text-2xl my-8 text-center" v-else>
      目前沒有任何回覆！
    </h2>
  </div>
</template>

<script setup>
const { data: messages, error } = await useFetch(`/api/car/listings/${useRoute().params.id}/message`)
useHead({
  title: '所有回覆 - CARTRADER',
});

definePageMeta({
  layout: 'custom',
})
</script>