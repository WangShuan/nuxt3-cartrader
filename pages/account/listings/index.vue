<template>
  <div class="flex justify-between items-center mb-3 lg:mb-10">
    <h1 class="text-2xl lg:text-4xl text-green-800">你發布的車輛</h1>
    <NuxtLink to="/account/listings/create" class="cursor-pointer ml-3 rounded px-2 py-1 text-white border border-green-800 bg-green-700 hover:bg-green-800 transition duration-300">+ ADD</NuxtLink>
  </div>
  <div v-if="pending">
    <div class="text-center">
      <div role="status">
        <svg aria-hidden="true" class="inline w-[50px] h-[50px] mt-10 text-gray-400 animate-spin fill-green-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
  <template v-else>
    <ul v-if="listings.length" class="flex flex-col text-center mb-10 w-full">
      <li v-for="car in listings" :key="car.id" class="border rounded overflow-hidden w-full mb-3">
        <div class="flex justify-between flex-col lg:flex-row">
          <img @click="navigateTo(`/cars/${car.id}-${car.name}`)" class="cursor-pointer	w-100 lg:w-2/5 hover:brightness-75 transition duration-500" :src="car.image_url" alt="" />
          <div class="w-full flex flex-col text-left justify-between p-3 lg:p-5">
            <div class="flex justify-between items-start lg:flex-row flex-col">
              <h2 @click="navigateTo(`/cars/${car.id}-${car.name}`)" class="cursor-pointer text-xl font-bold hover:text-green-700 transition duration-500 lg:w-[70%]">
                {{ car.name }}
              </h2>
              <div class="mt-3 lg:mt-0">
                <NuxtLink class="cursor-pointer lg:ml-3 ml-auto rounded px-2 py-1 border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition duration-300" :to="`/account/listings/view/${car.id}`">查看回覆</NuxtLink>
                <a href="#" @click.prevent="deleteCar(car)" class="cursor-pointer ml-3 rounded px-2 py-1 border border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition duration-300">刪除</a>
              </div>
            </div>
            <p class="mt-3 leading-8">
              <span>{{ car.seats }}</span> / <span>{{ car.enginesize }}</span>
              <br>
              ※ {{ car.features }}
            </p>
            <span class="font-bold text-lg text-right text-green-700">NTD $ {{ car.price }} 萬</span>
          </div>
        </div>
      </li>
    </ul>
    <h2 class="text-2xl my-8 text-center" v-else>
      您尚未上架任何車輛！
    </h2>
  </template>
</template>

<script setup>
const user = useSupabaseUser()
const { pending, data: listings, refresh } = await useFetch('/api/car/listings/user/' + user.value.id, {
  lazy: true
})
const deleteCar = (car) => {
  if (!confirm('您是否確定要刪除車輛：' + car.name + '\n注意 - 該動作不可復原！')) return

  useFetch('/api/car/' + car.id, { method: 'delete' }).then(() => listings.value = listings.value.filter(l => l != car))
}
useHead({
  title: '你發布的車輛 - CARTRADER',
});

definePageMeta({
  layout: 'custom',
})
</script>