<script setup>
const supabase = useSupabaseClient();
const email = ref('')
const password = ref('')
const isLogin = ref(true)
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
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    return alert(error)
  }
  alert('註冊成功！')
  loginByEmail()
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
  <div class="h-screen w-100">
    <div class="z-10 absolute w-full h-full flex justify-center items-center">
      <div class="text-center w-full lg:w-[360px] rounded-t-lg px-5">
        <ul class="flex text-center">
          <li class="w-1/2">
            <a href="#" @click="isLogin = true" :class="{ 'active': isLogin }" class="p-2 border hover:text-green-400 hover:border-green-400 block">LogIn</a>
          </li>
          <li class="w-1/2">
            <a href="#" @click="isLogin = false" :class="{ 'active': !isLogin }" class="p-2 border hover:text-green-400 hover:border-green-400 block">SignUp</a>
          </li>
        </ul>
        <div class="flex flex-col mx-auto gap-2 px-7 py-5 border border-t-0">
          <label class="text-left" for="email">信箱</label>
          <input v-model="email" class="rounded px-2 py-1 border mb-3" type="email" placeholder="請輸入信箱">
          <label class="text-left" for="password">密碼</label>
          <input v-model="password" class="rounded px-2 py-1 border mb-3" type="password" placeholder="請輸入密碼">
          <button v-if="isLogin" @click="loginByEmail" class="cursor-pointer rounded px-2 py-1 text-white bg-green-700 hover:bg-green-800 transition duration-300">登入</button>
          <button v-else @click="signUp" class="cursor-pointer rounded px-2 py-1 text-white bg-green-700 hover:bg-green-800 transition duration-300">註冊</button>
          <p>or</p>
          <button @click="loginByGoogle" class="cursor-pointer rounded px-2 py-1 text-white bg-red-700 hover:bg-red-800 transition duration-300">使用 Google 帳號登入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  color: white;
  border-color: #15803d;
  background-color: #15803d;
  font-weight: bold;
}
</style>