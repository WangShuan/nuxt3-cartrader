<template>
  <form @submit.prevent="createCar" class="text-center leading-loose px-4 mb-5 lg:mb-10">
    <h1 class="mt-5 text-2xl lg:text-4xl uppercase mb-3 text-green-700 font-bold">
      CREATE CAR
    </h1>
    <div class="flex flex-col mb-3">
      <label class="mb-2 text-left" for="name">名稱:</label>
      <input required v-model="inputs.name" class="border px-2 py-1 rounded" type="text" id="name" placeholder="EX: 2022 Toyota Corolla Altis 1.8 Hybrid旗艦" />
    </div>
    <div class="grid grid-cols-2 gap-5">
      <div class="flex flex-col mb-3">
        <label class="mb-2 text-left" for="brand">廠牌:</label>
        <select required class="border p-2 rounded" id="brand" v-model="inputs.make">
          <option value="" selected>請選擇廠牌</option>
          <option v-for="make in makes" :key="make" :value="make">{{ make }}</option>
        </select>
      </div>
      <div class="flex flex-col mb-3">
        <label class="mb-2 text-left" for="brand">地點:</label>
        <select required class="border p-2 rounded" id="brand" v-model="inputs.city">
          <option value="" selected>請選擇地點</option>
          <option v-for="city in cities" :key="city.id" :value="city.value">{{ city.name }}</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-5">
      <div class="flex flex-col mb-3">
        <label class="mb-2 text-left" for="seats">座位數量:</label>
        <input required v-model="inputs.seats" class="border px-2 py-1 rounded" type="text" id="seats" placeholder="EX: 2門 5人座" />
      </div>
      <div class="flex flex-col mb-3">
        <label class="mb-2 text-left" for="enginesize">c.c.數:</label>
        <input required v-model="inputs.enginesize" class="border px-2 py-1 rounded" type="text" id="enginesize" placeholder="EX: 1998c.c." />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-5">
      <div class="flex flex-col mb-3">
        <label class="mb-2 text-left" for="price">價格:</label>
        <input required v-model="inputs.price" class="border px-2 py-1 rounded" type="number" id="price" placeholder="單位: NTD $ / 萬" />
      </div>
    </div>
    <div class="flex flex-col mb-3">
      <label class="mb-2 text-left" for="features">特點:</label>
      <input required v-model="inputs.features" class="border px-2 py-1 rounded" type="text" id="features" placeholder="EX: 0-100km/h加速僅需7.3 秒。" />
    </div>
    <div class="flex flex-col mb-3">
      <label class="mb-2 text-left" for="description">描述:</label>
      <textarea required v-model="inputs.description" class="border px-2 py-1 rounded w-full" id="description" rows="4"></textarea>
    </div>
    <div class="flex flex-col mb-3">
      <label class="mb-2 text-left" for="image">圖片連結:</label>
      <div class="flex justify-between gap-5">
        <input required v-model="previewImage" class="border w-full px-2 py-1 rounded" type="text" id="image" placeholder="EX: https://fakeimg.pl/700x500/?text=image" />
        or
        <input type="file" @change="previewFile" id="upload-image" />
      </div>
      <img class="mx-auto max-w-[400px] mt-5" :src="previewImage" alt="">
    </div>
    <button :disabled="isDisabled" type="submit" class="disabled:bg-green-500 bg-green-700 px-10 py-1 rounded text-white">
      提交
    </button>
    <p v-if="errorMsg" class="text-red-800">新增失敗：{{ errorMsg }}</p>
  </form>
</template>

<script setup>
const { makes, cities } = useCars();
const inputs = ref({
  name: "",
  price: "",
  seats: "",
  enginesize: "",
  features: "",
  description: "",
  make: "",
  city: ""
})
const errorMsg = ref('')

const isDisabled = computed(() => {
  for (let key in inputs.value) {
    if (!inputs.value[key]) return true
  }
  if (!previewImage.value) return true
  return false
})

const user = useSupabaseUser();
const createCar = async () => {
  errorMsg.value = ''
  try {
    const res = await $fetch('/api/car/listings', {
      method: 'POST',
      body: {
        ...inputs.value,
        image_url: previewImage.value,
        listerId: user.value.id
      }
    })
    navigateTo('/account/listings')
  } catch (error) {
    errorMsg.value = error.data.message
  }
}

const previewImage = ref('');
const supabase = useSupabaseClient()
const previewFile = async (e) => {
  const file = e.target.files[0];
  const fileName = Math.floor(Math.random() * 10000000000000000000)
  const { data, error } = await supabase.storage.from('images').upload('public/' + fileName, file)
  if (error) {
    errorMsg.value = "圖片上傳失敗！"
  } else {
    const { data: d, error } = await supabase.storage.from('images').getPublicUrl(data.path)
    if (error) {
      errorMsg.value = "圖片上傳失敗！"
      const { data, error } = await supabase.storage.from('images').remove(data.path)
    } else {
      previewImage.value = d.publicUrl;
    }
  }
}

useHead({
  title: 'Create Car - CARTRADER',
});

definePageMeta({
  layout: 'custom',
})
</script>