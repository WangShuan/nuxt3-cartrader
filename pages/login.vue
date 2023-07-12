<script setup>
const supabase = useSupabaseClient();
const email = ref('')
const password = ref('')

const loginByEmail = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    return alert(error);
  }

  navigateTo('/')
}

const signUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    return alert(error);
  }
  alert('註冊成功！請登入帳號。')
}

const loginByGoogle = async () => {
  const { error } = supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    return alert(error);
  }
};
</script>

<template>
  <div class="h-screen w-100 bg-green-100">
    <div class="z-10 absolute w-full h-full flex justify-center items-center">
      <div class="text-center w-1/2">
        <h1 class="text-3xl font-serif mb-10">Login</h1>
        <div class="flex flex-col max-w-[300px] mx-auto gap-3">
          <input v-model="email" class="rounded px-2 py-1" type="email" placeholder="請輸入信箱">
          <input v-model="password" class="rounded px-2 py-1" type="password" placeholder="請輸入密碼">
          <button @click="loginByEmail" class="cursor-pointer rounded px-2 py-1 text-white bg-green-700 hover:bg-green-800 transition duration-300">登入</button>
          <button @click="signUp" class="cursor-pointer rounded px-2 py-1 text-white bg-green-700 hover:bg-green-800 transition duration-300">建立帳戶</button>
          <p>or</p>
          <button @click="loginByGoogle" class="cursor-pointer rounded px-2 py-1 text-white bg-red-700 hover:bg-red-800 transition duration-300">使用 Google 帳號登入</button>
        </div>
      </div>
    </div>
  </div>
</template>