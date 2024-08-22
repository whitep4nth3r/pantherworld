<script setup lang="ts">
import { getData, setData } from "nuxt-storage/local-storage";
import { onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";

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
const showNotifications = useState("showNotifications", () => getData("show_notifications") === true);

function toggleNotifications() {
  const currentValue = getData("show_notifications");

  if (currentValue === "true") {
    setData("show_notifications", "false");
    showNotifications.value = false;
  } else {
    setData("show_notifications", "true");
    showNotifications.value = true;
  }
}

const target = ref(null);
onClickOutside(target, (event) => (open.value = false));

onMounted(() => {
  const currentValue = getData("show_notifications");
  showNotifications.value = currentValue === "true";
});
</script>

<template>
  <button
    type="button"
    class="notificationToggleButton flex gap-1 justify-between rounded-lg px-4 py-2 bottom-2 left-2 fixed focus:outline-none focus:ring focus:ring-emerald-300 active:ring active:ring-emerald-300 z-10 bg-zinc-700 shadow"
    @click="() => toggleNotifications()"
    v-bind:aria-label="showNotifications ? 'Turn off event feed in sidebar' : 'Turn on event feed in sidebar'">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="size-6"
      v-if="showNotifications">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path
        fill-rule="evenodd"
        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
        clip-rule="evenodd" />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="size-6"
      v-if="!showNotifications">
      <path
        d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
      <path
        d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
      <path
        d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
    </svg>
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
