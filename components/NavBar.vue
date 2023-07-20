<template>
  <header class="fixed w-screen top-0 z-50 flex justify-between items-center space-x-1 p-4 shadow-md bg-green-700 text-white">
    <NuxtLink class="text-3xl font-mono" to="/">CARTRADER</NuxtLink>
    <nav>
      <ul class="flex gap-5">
        <template v-if="user">
          <li>
            <NuxtLink to="/account/listings">Listings</NuxtLink>
          </li>
          <li>
            <button @click="logout">Logout</button>
          </li>
        </template>
        <li v-else>
          <NuxtLink to='/login'>Login</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
const client = useSupabaseAuthClient()
const user = useSupabaseUser()

const logout = async () => {
  const { data, error } = await client.auth.signOut()

  if (error) {
    console.log(error)
  }

  navigateTo('/')
}

const supabase = useSupabaseClient()
const login = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })

  if (error) {
    console.log(error)
  }
}
</script>