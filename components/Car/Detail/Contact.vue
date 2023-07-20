<template>
  <form @submit.prevent="createMessage" class="text-center leading-loose px-4 mb-5 md:mb-10">
    <h3 class="mt-5 text-xl uppercase mb-3 text-green-700 font-bold">
      contact us
    </h3>
    <p class="mb-3">
      如果您對本車有興趣或有任何相關問題，歡迎您藉由下方表單與我們聯絡！
    </p>
    <div class="flex flex-col mb-3">
      <label class="mb-2 text-left" for="name">姓名:</label>
      <input required v-model="inputs.name" class="border px-2 py-1 rounded" type="text" id="name" />
    </div>
    <div class="flex flex-col mb-3">
      <label class="mb-2 text-left" for="email">電子信箱:</label>
      <input required v-model="inputs.email" class="border px-2 py-1 rounded" type="email" id="email" />
    </div>
    <div class="flex flex-col mb-3">
      <label class="mb-2 text-left" for="phone">聯絡電話:</label>
      <input required v-model="inputs.phone" class="border px-2 py-1 rounded" type="tel" id="phone" />
    </div>
    <div class="flex flex-col mb-3">
      <label class="mb-2 text-left" for="memo">備註:</label>
      <textarea required v-model="inputs.memo" class="border px-2 py-1 rounded w-full" id="memo" rows="4"></textarea>
    </div>
    <button :disabled="isDisabled" type="submit" class="disabled:bg-green-500 bg-green-700 px-10 py-1 rounded text-white">
      提交
    </button>
    <p v-if="errorMsg" class="text-red-800">提交失敗：{{ errorMsg }}</p>
  </form>
</template>

<script setup>
const route = useRoute()

const inputs = ref({
  name: "",
  email: "",
  phone: "",
  memo: "",
})
const errorMsg = ref('')

const isDisabled = computed(() => {
  for (let key in inputs.value) {
    if (!inputs.value[key]) return true
  }
  return false
})
const createMessage = async () => {
  errorMsg.value = ''
  try {
    const res = await $fetch(`/api/car/listings/${route.params.id}/message`, {
      method: 'POST',
      body: inputs.value
    })
    inputs.value = {
      name: "",
      email: "",
      phone: "",
      memo: "",
    }
    alert('填寫成功，已將資訊傳送給賣家，請靜候賣家聯繫，謝謝！')
  } catch (error) {
    errorMsg.value = error.data.message
  }
}
</script>