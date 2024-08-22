<script setup lang="ts">
import { onClickOutside, useStorage } from "@vueuse/core";

const props = defineProps<{
  title: string;
}>();

const config = useRuntimeConfig();
const { loggedIn, user, session, clear } = useUserSession();

function logout() {
  clear();
  return navigateTo("/");
}

const open = useState("open", () => false);
const showNotifications = useStorage("show_notifications", true);

function toggleNotifications() {
  showNotifications.value = !showNotifications.value;
}

const target = ref(null);
onClickOutside(target, (event) => (open.value = false));
</script>

<template>
  <button
    type="button"
    class="text-white notificationToggleButton flex gap-2 justify-between rounded-lg px-4 py-2 bottom-2 left-2 fixed focus:outline-none focus:ring focus:ring-emerald-300 active:ring active:ring-emerald-300 z-10 bg-zinc-700 shadow"
    @click="() => toggleNotifications()"
    v-bind:aria-label="showNotifications ? 'Turn off event feed in sidebar' : 'Turn on event feed in sidebar'">
    <img src="/icons/utils/eye_open.svg" height="24" width="24" alt="eye" v-if="showNotifications" />
    <img src="/icons/utils/eye_slash.svg" height="24" width="24" alt="eye with a slash" v-if="!showNotifications" />
    <span>Event feed</span>
  </button>
  <header class="flex flex-col w-full items-center mb-6" ref="target">
    <div class="flex flex-row justify-between w-full relative">
      <button
        type="button"
        aria-label="Toggle menu"
        v-bind:aria-expanded="open === true"
        @click="() => (open = !open)"
        class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg">
        <img src="/icons/menu/burger.svg" alt="an actual hamburger" height="44" width="44" />
      </button>

      <NuxtLink href="/" @click="() => (open = false)" class="flex self-center font-bold font-display"
        >p4nth3r.world</NuxtLink
      >

      <nav
        class="text-xl font-bold flex flex-col gap-2 bg-zinc-700 w-full absolute top-16 rounded-lg py-4 z-50"
        v-if="open">
        <NuxtLink
          href="/"
          @click="() => (open = false)"
          class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
          :class="{ underline: title === 'index' }"
          >Home</NuxtLink
        >
        <NuxtLink
          href="/manual"
          @click="() => (open = false)"
          class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
          :class="{ underline: title === 'manual' }"
          >How to play</NuxtLink
        >
        <NuxtLink
          href="/inventory"
          @click="() => (open = false)"
          class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
          v-if="loggedIn"
          :class="{ underline: title === 'inventory' }"
          >Inventory</NuxtLink
        >
        <NuxtLink
          href="/recipes"
          @click="() => (open = false)"
          class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
          :class="{ underline: title === 'recipes' }"
          >Recipes</NuxtLink
        >
        <NuxtLink
          href="/leaderboard"
          @click="() => (open = false)"
          class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
          :class="{ underline: title === 'leaderboard' }"
          >Leaderboard</NuxtLink
        >
        <a
          href="https://p4nth3rworld-wiki.netlify.app/"
          @click="() => (open = false)"
          class="text-base p-2 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg"
          target="_blank"
          >Community Wiki</a
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
          class="font-display text-white font-medium focus:outline-none focus:ring focus:ring-emerald-300 text-lg p-2 rounded-lg transition">
          log out
        </button>
      </div>
      <NuxtLink
        href="/api/auth/twitch"
        external
        v-if="!loggedIn"
        class="font-display text-white font-medium bg-violet-700 hover:bg-violet-500 focus:bg-violet-500 active:bg-violet-500 focus:outline-none focus:ring focus:ring-violet-700 text-lg p-2 rounded-lg transition self-center flex flex-row gap-1 justify-between items-center"
        ><span><img src="/icons/menu/twitch.svg" role="presentation" height="22" width="22" /></span>
        <span>log in<span class="sr-only">with Twitch</span></span></NuxtLink
      >
    </div>
  </header>
  <EventFeed v-if="showNotifications" />
</template>
