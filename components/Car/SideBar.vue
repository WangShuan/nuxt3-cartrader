<template>
  <ul class="w-full border rounded flex text-center mx-auto shadow bg-white flex-wrap">
    <li class="border-r px-4 py-2 w-full md:w-1/3 flex justify-between relative">
      <span>地點</span>
      <a @click.prevent="updateModal('location')" class="text-green-700" href="#">{{ route.params.city === 'All' ? 'All' : cities.find(item => item.value === route.params.city).name }}</a>
      <div v-if="modal.location" class="absolute w-[180px] border flex rounded shadow top-[100%] right-0 bg-white flex-wrap z-20">
        <span @click="onChangeLocation('All')" :class="{ 'text-green-700': route.params.city === 'All' }" class="cursor-pointer p-2 w-full hover:bg-gray-50 text-left">All</span>
        <span @click="onChangeLocation(city.value)" v-for="city in cities" :key="city.id" :class="{ 'text-green-700': route.params.city === city.value }" class="cursor-pointer p-2 w-full hover:bg-gray-50 text-left">{{ city.name }}</span>
      </div>
    </li>
    <li class="border-r px-4 py-2 w-full md:w-1/3 flex justify-between relative">
      <span>廠牌</span>
      <a @click.prevent="updateModal('brand')" class="text-green-700" href="#">{{ route.params.brand || 'All' }}</a>
      <div v-if="modal.brand" class="absolute w-[180px] border flex rounded shadow top-[100%] right-0 bg-white flex-wrap z-20">
        <span @click="onChangeBrand('')" :class="{ 'text-green-700': !route.params.brand }" class="cursor-pointer p-2 w-full hover:bg-gray-50 text-left">All</span>
        <span @click="onChangeBrand(brand)" v-for="brand in makes" :key="brand" :class="{ 'text-green-700': route.params.brand === brand }" class="cursor-pointer p-2 w-full hover:bg-gray-50 text-left">{{ brand }}</span>
      </div>
    </li>
    <li class="px-4 py-2 w-full md:w-1/3 flex justify-between relative">
      <span>價格</span>
      <a @click.prevent="updateModal('price')" class="text-green-700" href="#">{{ priceRangText }}</a>
      <div v-if="modal.price" class="absolute w-[180px] border rounded shadow p-2 top-[100%] right-0 bg-white z-20">
        <div class="flex flex-col">
          <div class="flex mb-2 justify-center items-center">
            <label for="">最低: NTD</label>
            <input v-model.number="priceRang.min" :class="{ 'border-red-400': lowerPriceError }" type="number" class="mx-2 px-1 rounded w-1/3 border" />
            <span>萬</span>
          </div>
          <p v-if="lowerPriceError" class="text-red-400 text-sm mt-1">錯誤，最低金額不得為空！</p>
          <span>~</span>
          <div class="flex mb-2 justify-center items-center">
            <label for="">最高: NTD</label>
            <input v-model.number="priceRang.max" :class="{ 'border-red-400': upperPriceError }" type="number" class="mx-2 px-1 rounded w-1/3 border" />
            <span>萬</span>
          </div>
          <p v-if="upperPriceError" class="text-red-400 text-sm mt-1">錯誤，最高金額不得為空！</p>
        </div>
        <button @click="onChangePrice()" class="bg-green-700 w-full mt-2 p-1 text-white rounded">
          送出
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
const route = useRoute()
const { makes, cities } = useCars()
const modal = ref({
  location: false,
  brand: false,
  price: false
})

const priceRang = ref({
  min: route.query.minPrice || '',
  max: route.query.maxPrice || ''
})
const lowerPriceError = ref(false)
const upperPriceError = ref(false)

const updateModal = (key) => {
  modal.value[key] = !modal.value[key]
}

const onChangeLocation = (city) => {
  updateModal('location')
  const query = `?minPrice=${route.query.minPrice}&maxPrice=${route.query.maxPrice}`
  navigateTo(`/city/${city}/cars${route.params.brand ? '/' + route.params.brand : ''}${route.query.minPrice ? query : ''}`)
}

const onChangeBrand = (brand) => {
  updateModal('brand')
  const query = `?minPrice=${route.query.minPrice}&maxPrice=${route.query.maxPrice}`
  navigateTo(`/city/${route.params.city}/cars/${brand}${route.query.minPrice ? query : ''}`)
}

const onChangePrice = () => {
  if (!priceRang.value.min) {
    lowerPriceError.value = true
    return
  } else {
    lowerPriceError.value = false
  }
  if (!priceRang.value.max) {
    upperPriceError.value = true
    return
  } else {
    upperPriceError.value = false
  }
  if (priceRang.value.max <= priceRang.value.min) {
    const min = priceRang.value.max
    priceRang.value.max = priceRang.value.min
    priceRang.value.min = min
  }
  updateModal('price')
  navigateTo(`/city/${route.params.city}/cars${route.params.brand ? '/' + route.params.brand : ''}?minPrice=${priceRang.value.min}&maxPrice=${priceRang.value.max}`)
}

const priceRangText = computed(() => {
  return route.query.minPrice ? `NTD ${route.query.minPrice}萬 ~ NTD ${route.query.maxPrice}萬` : '---'
})
</script>