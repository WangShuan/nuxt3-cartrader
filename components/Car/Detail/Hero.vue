<template>
  <nuxt-img class="w-full border" :src="car.image_url" alt="" />
  <div class="py-5 border-b">
    <h1 class="text-xl md:text-3xl mb-3 font-semibold">{{ car.name }}</h1>
    <div class="flex justify-between lg:items-end md:mt-4 flex-col md:flex-row">
      <p class="mt-3 leading-8">
        <span>{{ car.seats }}</span> / <span>{{ car.enginesize }}</span>
        <br>
        ※ {{ car.features }}
      </p>
      <span class="text-xl md:text-2xl text-right font-bold text-green-700">NTD $ {{ car.price }} 萬</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
});
</script>