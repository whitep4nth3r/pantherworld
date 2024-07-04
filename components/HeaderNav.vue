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
      <NuxtLink href="/" class="py-2">Home</NuxtLink>
      <NuxtLink href="/manual" class="py-2">How to play</NuxtLink>
      <NuxtLink href="/inventory" class="py-2" v-if="loggedIn">Inventory</NuxtLink>
    </nav>

    <div>
      <button
        type="button"
        v-if="loggedIn"
        @click="logout"
        class="text-white bg-violet-600 text-xl py-2 px-4 rounded-lg">
        Log out
      </button>
      <NuxtLink
        href="/api/auth/twitch"
        external
        v-if="!loggedIn"
        class="text-white bg-violet-600 text-2l py-2 px-4 rounded-lg"
        >Log in with Twitch</NuxtLink
      >
    </div>
  </header>
</template>
