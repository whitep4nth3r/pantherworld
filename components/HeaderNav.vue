<script setup lang="ts">
const config = useRuntimeConfig();
const { loggedIn, user, session, clear } = useUserSession();

function logout() {
  clear();
  return navigateTo("/");
}

const open = useState("open", () => false);
</script>

<template>
  <header class="flex flex-col w-full items-center mb-6">
    <div class="flex flex-row justify-between w-full relative">
      <button
        type="button"
        aria-label="Toggle menu"
        v-bind:aria-expanded="open === true"
        @click="() => (open = !open)"
        class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg">
        <img src="/icons/menu/burger.svg" alt="an actual hamburger" height="44" width="44" />
      </button>

      <nav
        class="text-xl font-bold flex flex-col gap-2 bg-zinc-700 w-full absolute top-16 rounded-lg py-4 z-50"
        v-if="open">
        <NuxtLink
          href="/"
          @click="() => (open = false)"
          class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
          >Home</NuxtLink
        >
        <NuxtLink
          href="/manual"
          @click="() => (open = false)"
          class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
          >How to play</NuxtLink
        >
        <NuxtLink
          href="/inventory"
          @click="() => (open = false)"
          class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
          v-if="loggedIn"
          >Inventory</NuxtLink
        >
        <NuxtLink
          href="/leaderboard"
          @click="() => (open = false)"
          class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
          >Leaderboard</NuxtLink
        >
        <a
          href="https://github.com/whitep4nth3r/pantherworld/issues"
          @click="() => (open = false)"
          class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
          target="_blank"
          >GitHub</a
        >
      </nav>

      <div v-if="loggedIn" class="flex flex-row gap-1 items-center">
        <img
          :src="user?.image"
          :alt="`${user?.name} profile image`"
          height="44"
          width="44"
          class="rounded-full border-2 border-white size-10" />
        <button
          type="button"
          @click="logout"
          class="text-white font-medium focus:outline-none focus:ring focus:ring-emerald-300 text-base p-2 rounded-lg transition">
          Log out
        </button>
      </div>
      <NuxtLink
        href="/api/auth/twitch"
        external
        v-if="!loggedIn"
        class="text-white font-medium bg-violet-700 hover:bg-violet-500 focus:bg-violet-500 active:bg-violet-500 focus:outline-none focus:ring focus:ring-violet-700 text-2l p-2 rounded-lg transition self-center flex flex-row gap-1 justify-between items-center"
        ><span><img src="/icons/menu/twitch.svg" role="presentation" height="22" width="22" /></span>
        <span>Log in<span class="sr-only">with Twitch</span></span></NuxtLink
      >
    </div>
  </header>
</template>
