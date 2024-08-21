<script setup lang="ts">
const config = useRuntimeConfig();

definePageMeta({
  favicon: "🎒",
  middleware: () => {
    const { loggedIn, user, session, clear } = useUserSession();
    if (!loggedIn.value) {
      return navigateTo("/");
    }
  },
});

useSeoMeta({
  title: "Inventory",
  description: "View your items",
});

const { loggedIn, user, session, clear } = useUserSession();

const nuxtApp = useNuxtApp();

const { status, data, error, refresh } = useFetch<InventoryResponse>(`inventory/`, {
  baseURL: config.public.world_api_url,
  headers: {
    token: user.value!.accessToken,
  },
  lazy: true,
  onResponse(context) {
    if (context.response.status === 401) {
      clear();
      return nuxtApp.runWithContext(() => navigateTo("/"));
    }
  },
});

const locationBg = computed(() => {
  switch (data.value?.inventory.location) {
    case "beach":
      return "from-orange-400";
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

const population = computed(() => {
  if (data.value!.inventory.players_in_zone > 0) {
    return `(${data.value?.inventory.players_in_zone})`;
  }

  return "";
});

const spawnDaysAgo = computed(() => {
  if (!data.value?.inventory.spawn_date) {
    return "Unavailable";
  }
  const today = new Date();
  const spawnedOn = new Date(data.value?.inventory.spawn_date);
  const msInDay = 24 * 60 * 60 * 1000;

  spawnedOn.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = (+today - +spawnedOn) / msInDay;

  if (diff === 0) {
    return "Earlier today";
  }
  if (diff === 1) {
    return "Yesterday";
  }

  return `${diff} days ago`;
});

onMounted(() => {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      refresh();
    }
  });
});
</script>

<template>
  <h1 class="text-4xl font-bold mb-12">Inventory</h1>

  <div v-if="data">
    <section
      class="flex flex-col rounded-lg p-6 justify-center items-center align gap-2 bg-gradient-to-b to-zinc-950 relative"
      :class="locationBg">
      <button
        type="button"
        @click="refresh()"
        aria-label="Refresh inventory"
        class="m-auto p-2 rounded-full bg-zinc-600 s-14 text-2xl leading-none absolute top-2 right-2 focus:bg-emerald-700 active:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-300">
        <img
          src="/icons/utils/refresh.svg"
          alt="loading"
          height="24"
          width="24"
          :class="{ 'animate-spin': status === `pending` }" />
      </button>
      <img
        :src="user?.image"
        height="124"
        width="124"
        :alt="`${user?.name} profile picture`"
        class="rounded-full drop-shadow-xl" />
      <h2 class="text-3xl font-bold">@{{ user?.name }}</h2>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4" v-auto-animate>
      <InventoryInfoItem
        :icon="`/icons/zones/${data.inventory.location.replace(' ', '-').toLowerCase()}.svg`"
        iconSecondary="/icons/utils/population.svg"
        iconSecondaryAlt="people representing population"
        :iconAlt="data.inventory.location"
        :topText="data.inventory.location"
        :bottomText="`Zone ${population}`" />
      <InventoryInfoItem
        icon="/icons/utils/move.svg"
        iconAlt="Arrow pointing right to straight vertical line"
        :topText="spawnDaysAgo"
        bottomText="Spawned" />
      <InventoryInfoItem
        icon="/icons/utils/pack.svg"
        iconAlt="Backpack"
        :topText="data.inventory.total"
        bottomText="Items" />
      <InventoryInfoItem
        icon="/icons/utils/trophy.svg"
        iconAlt="Backpack"
        :topText="Intl.NumberFormat().format(data.inventory.wealth_index)"
        bottomText="Wealth Index" />
    </section>

    <section class="my-4">
      <div
        v-if="data.inventory.items.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
        v-auto-animate>
        <InventoryItem
          v-for="item in data.inventory.items"
          :key="item.name"
          :name="item.name"
          :count="item.count"
          :rarity="item.rarity"
          :cooked="item.cooked !== null" />
      </div>

      <h2
        v-if="data.inventory.items.length === 0"
        class="flex flex-col gap-1 bg-zinc-800 rounded-lg relative text-center p-4 font-bold">
        No items!
      </h2>
    </section>
  </div>

  <section v-else>
    <div class="flex flex-col rounded-lg p-6 justify-center items-center align gap-2">
      <USkeleton class="w-[124px] h-[124px]" :ui="{ rounded: 'rounded-full' }" />
      <USkeleton class="h-8 w-[250px]" :ui="{ rounded: 'rounded-lg' }" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
      <USkeleton class="flex flex-row gap-4 rounded-lg p-4 items-center h-16" />
      <USkeleton class="flex flex-row gap-4 rounded-lg p-4 items-center h-16" />
      <USkeleton class="flex flex-row gap-4 rounded-lg p-4 items-center h-16" />
      <USkeleton class="flex flex-row gap-4 rounded-lg p-4 items-center h-16" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <USkeleton class="rounded-lg h-32" />
      <USkeleton class="rounded-lg h-32" />
      <USkeleton class="rounded-lg h-32" />
      <USkeleton class="rounded-lg h-32" />
      <USkeleton class="rounded-lg h-32" />
      <USkeleton class="rounded-lg h-32" />
    </div>
  </section>
</template>
