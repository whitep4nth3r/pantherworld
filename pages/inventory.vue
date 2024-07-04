<script setup lang="ts">
const config = useRuntimeConfig();

definePageMeta({ favicon: "🎒" });
useSeoMeta({
  title: "Inventory",
  description: "View your items",
});

const { loggedIn, user, session, clear } = useUserSession();

if (!loggedIn.value) {
  await navigateTo("/");
}

const nuxtApp = useNuxtApp();

const { status, data, error, refresh } = await useFetch(`inventory/`, {
  baseURL: config.public.world_api_url,
  headers: {
    token: user.value?.accessToken,
  },
  onResponse(context) {
    if (context.response.status === 401) {
      return nuxtApp.runWithContext(() => navigateTo("/"));
    }
  },
});

const locationBg = computed(() => {
  switch (data.value?.inventory.location) {
    case "mountain":
      return "from-indigo-400";
    case "forest":
      return "from-emerald-400";
    case "swamp":
      return "from-lime-400";
    case "city":
      return "from-cyan-400";
    case "desert":
      return "from-yellow-400";
    case "Not found":
      return "from-red-400";
    default:
      return "";
  }
});
</script>

<template>
  <div>
    <button
      type="button"
      @click="refresh"
      class="refresh-button text-white bg-green-800 text-xl py-2 px-4 rounded-lg m-auto mb-4 flex gap-2 items-center">
      <img
        src="/icons/utils/loading.svg"
        alt="loading"
        height="24"
        width="24"
        class="text-white"
        v-if="status === `pending`" />
      <img src="/icons/utils/refresh.svg" alt="refresh" height="24" width="24" class="text-white" v-else />
      Refresh
    </button>
    <section
      class="flex flex-col rounded-t-lg p-6 rounded-r-lg justify-center items-center align gap-2 bg-gradient-to-b to-zinc-950"
      :class="locationBg">
      <img
        :src="user?.image"
        height="124"
        width="124"
        :alt="`${user?.name} profile picture`"
        class="rounded-full drop-shadow-xl" />
      <h1 class="text-3xl font-bold">@{{ user?.name }}</h1>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4" v-auto-animate>
      <InventoryInfoItem
        :icon="`/icons/zones/${data.inventory.location.replace(' ', '-').toLowerCase()}.svg`"
        :iconAlt="data.inventory.location"
        :topText="data.inventory.location"
        bottomText="Zone" />
      <InventoryInfoItem
        icon="/icons/utils/move.svg"
        iconAlt="Arrow pointing right to straight vertical line"
        topText="Date TBC"
        bottomText="Last moved" />
      <InventoryInfoItem
        icon="/icons/utils/pack.svg"
        iconAlt="Backpack"
        :topText="data.inventory.total"
        bottomText="Items" />
      <InventoryInfoItem
        v-if="data.inventory.items.length > 0"
        icon="/icons/utils/trophy.svg"
        iconAlt="Trophy"
        :topText="data.inventory.items[0].name"
        :bottomText="`Rarest item (${data.inventory.items[0].rarity})`" />
    </section>

    <section class="my-4" v-if="data">
      <ol v-if="data.inventory.items.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-3" v-auto-animate>
        <InventoryItem
          v-for="item in data.inventory.items"
          :key="item.name"
          :name="item.name"
          :count="item.count"
          :rarity="item.rarity" />
      </ol>

      <h2
        v-if="data.inventory.items.length === 0"
        class="flex flex-col gap-1 bg-zinc-800 rounded-lg relative text-center p-4 font-bold">
        No items!
      </h2>
    </section>
  </div>
</template>
