

<template>
  <h3 class="mt-5 text-xl uppercase text-green-700 font-bold text-center">
    Description
  </h3>
  <p class="leading-loose py-5 px-4 border-b" style="white-space: pre-line">{{ description }}</p>
</template>

<script setup>
const props = defineProps({
  description: String,
});
</script>