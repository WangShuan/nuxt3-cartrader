<template>
  <div class="overflow-hidden relative h-screen bg-green-700/20 flex justify-center items-center flex-col">
    <h1 class="text-3xl lg:text-5xl xl:text-7xl font-bold">{{ err.statusCode }}</h1>
    <p class="text-xl lg:text-2xl xl:text-3xl my-2 mx-3 text-center">{{ err.message }}</p>
    <button class="rounded-full bg-green-700 py-1 px-4 text-lg text-white" @click="handleError()">Go Back</button>
  </div>
</template>

<script setup>
const err = useError();
const handleError = () => {
  clearError({
    redirect: '/',
  })
};
</script>