<template>
  <li class="border rounded overflow-hidden w-full mb-3">
    <div class="flex justify-between flex-col md:flex-row">
      <img @click="navigateTo(`/cars/${car.id}-${car.name}`)" class="cursor-pointer	w-100 md:w-2/5 hover:brightness-75 transition duration-500" :src="car.image_url" alt="" />
      <div class="w-full flex flex-col text-left justify-between p-3 md:p-5">
        <div class="flex justify-between items-start">
          <h2 @click="navigateTo(`/cars/${car.id}-${car.name}`)" class="cursor-pointer text-xl font-bold hover:text-emerald-700 transition duration-500">{{ car.name }}
          </h2>
          <ClientOnly>
            <img @click.stop="emit('favor', car.id)" class="cursor-pointer	w-5 ml-3 mt-1 hover:scale-75 transition duration-300" :src="props.favored ? heartFilled : heartOutline" />
          </ClientOnly>
        </div>
        <p class="mt-3 leading-8">
          <span>{{ car.seats }}</span> / <span>{{ car.enginesize }}</span>
          <br>
          ※ {{ car.features }}
        </p>
        <div class="flex justify-between items-center">
          <div class="gap-3">
            <span class="text-emerald-700">
              #{{ toZh(car.city) }}
            </span>
            <span class="text-emerald-700">
              #{{ car.make }}
            </span>
          </div>
          <span class="font-bold text-lg text-emerald-700">NTD $ {{ car.price }} 萬</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import heartFilled from "@/assets/heartFilled.png";
import heartOutline from "@/assets/heartOutline.png";
const props = defineProps({
  car: Object,
  favored: Boolean,
});

const { toZh } = useCars();

const emit = defineEmits(['favor']);
</script>