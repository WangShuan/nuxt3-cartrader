<template>
  <div class="h-screen overflow-hidden relative w-100 bg-norepeat bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1530685932526-48ec92998eaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80)]">
    <div class="z-10 absolute w-full h-full bg-green-700/20 flex justify-center items-center">
      <div class="text-center pt-[70px]">
        <h1 class="text-3xl md:text-5xl text-white">尋找你的車輛</h1>
        <div class="mt-8 flex flex-wrap justify-center">
          <span class="text-2xl text-white w-full">
            地點
          </span>
          <NuxtLink :to="`city/${city.value}/cars`" :value="city.value" v-for="city in cities" :key="city.id" class="cursor-pointer px-3 rounded m-2 bg-white hover:bg-gray-200 text-left">
            {{ city.name }}
          </NuxtLink>
        </div>
        <div class="mt-8 flex flex-wrap justify-center">
          <span class="text-2xl text-white w-full">
            廠牌
          </span>
          <NuxtLink :to="`city/All/cars/${make}`" :value="make" v-for="make in makes" :key="make" class="cursor-pointer px-3 rounded m-2 bg-white hover:bg-gray-200 text-left">
            {{ make }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { cities, makes } = useCars();
</script>