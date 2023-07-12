<template>
  <ul class="flex flex-col text-center mt-8 w-full">
    <CarCard v-for="car in filterCars" :key="car.id" :car="car" @favor="handleFavorite" :favored="car.id in favorite" />
  </ul>
</template>

<script setup>
const props = defineProps({
  filterCars: Array
})
const favorite = useLocalStorage(
  'favorite',
  {},
)

const handleFavorite = (id) => {
  if (id in favorite.value) {
    delete favorite.value[id]
  } else {
    favorite.value = {
      ...favorite.value,
      [id]: true
    }
  }
}
</script>