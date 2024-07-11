<script setup lang="ts">
import { getQuery } from "ufo";
const config = useRuntimeConfig();
const { loggedIn, user, session, clear } = useUserSession();

function logout() {
  clear();
  return navigateTo("/");
}
</script>

<template>
  <header class="flex justify-between items-center mb-6">
    <nav class="text-xl font-bold flex flex-col sm:flex-row gap-4">
      <NuxtLink href="/" class="p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg">Home</NuxtLink>
      <NuxtLink href="/manual" class="p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
        >How to play</NuxtLink
      >
      <NuxtLink
        href="/inventory"
        class="p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
        v-if="loggedIn"
        >Inventory</NuxtLink
      >
      <a
        href="https://github.com/whitep4nth3r/pantherworld/issues"
        class="p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
        target="_blank"
        >GitHub</a
      >
    </nav>

    <div>
      <button
        type="button"
        v-if="loggedIn"
        @click="logout"
        class="text-white font-medium focus:outline-none focus:ring focus:ring-emerald-300 text-xl p-2 rounded-lg transition">
        Log out
      </button>
      <NuxtLink
        href="/api/auth/twitch"
        external
        v-if="!loggedIn"
        class="text-white font-medium bg-violet-700 hover:bg-violet-500 focus:bg-emerald-700 active:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-300 text-2l p-2 rounded-lg transition"
        >Log in with Twitch</NuxtLink
      >
    </div>
  </header>
</template>
