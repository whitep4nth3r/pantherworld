<script setup lang="ts">
const config = useRuntimeConfig();

useSeoMeta({
  title: "Welcome to p4nth3rworld",
  description: "The game doesn't stop when the stream ends.",
});

const { status, data, error, refresh } = useFetch<MetaResponse | null>(`meta/`, {
  baseURL: config.public.world_api_url,
  lazy: true,
});

onMounted(() => {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      refresh();
    }
  });
});

type locationKeyValue = { [key: string]: string };

const locationBgClass: locationKeyValue = {
  beach: "from-orange-400",
  mountain: "from-indigo-400",
  forest: "from-emerald-400",
  swamp: "from-lime-400",
  city: "from-cyan-400",
  desert: "from-yellow-400",
};
</script>

<template>
  <section class="flex flex-col gap-3 justify-center items-center m-8 mb-16">
    <div class="emojis">
      <span>🎒</span>
      <span>📦</span>
      <span>🌍</span>
      <span>📍</span>
      <span>🌳</span>
      <span>🗺️</span>
    </div>
    <h1 class="text-4xl mb-6 text-center font-bold">
      The game doesn't stop<br />
      when the stream ends.
    </h1>
    <a
      href="https://twitch.tv/whitep4nth3r/chat"
      class="bg-violet-700 hover:bg-violet-500 focus:bg-emerald-700 active:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-300 text-white font-bold uppercase py-2 px-4 rounded-lg text-xl transition"
      >Play now</a
    >
  </section>

  <section v-auto-animate>
    <div class="mb-16 grid grid-cols-1 sm:grid-cols-2 gap-8 justify-between items-start" v-if="data !== null">
      <PlayerCard title="Latest claim" :player="data.meta.latestClaim.player" :item="data.meta.latestClaim.item" />
      <PlayerCard title="Latest cook" :player="data.meta.latestCook.player" :item="data.meta.latestCook.item" />
    </div>
    <div class="mb-16 grid grid-cols-1 sm:grid-cols-2 gap-8 justify-between items-start" v-else>
      <div>
        <USkeleton class="mb-2 w-full h-8" />
        <USkeleton class="w-full h-24" />
      </div>
      <div>
        <USkeleton class="mb-2 w-full h-8" />
        <USkeleton class="w-full h-24" />
      </div>
    </div>
  </section>
  <section v-auto-animate>
    <div class="mb-16 grid grid-cols-1 sm:grid-cols-3 gap-3 my-4" v-if="data !== null">
      <div class="flex flex-col justify-between">
        <p class="font-bold uppercase text-lg mb-4 bg-yellow-500 text-zinc-900 text-center rounded-lg">Latest Spawn</p>
        <InventoryItem
          :name="data.meta.latestSpawned.name"
          :rarity="data.meta.latestSpawned.rarity"
          :extraInfo="data.meta.latestSpawned.zone" />
      </div>
      <div class="flex flex-col justify-between">
        <p class="font-bold uppercase text-lg mb-4 bg-yellow-500 text-zinc-900 text-center rounded-lg">Most Spawned</p>
        <InventoryItem
          :name="data.meta.mostSpawned.name"
          :count="data.meta.mostSpawned.number"
          :rarity="data.meta.mostSpawned.rarity" />
      </div>
      <div class="flex flex-col justify-between">
        <p class="font-bold uppercase text-lg mb-4 bg-yellow-500 text-zinc-900 text-center rounded-lg">Least Spawned</p>
        <InventoryItem
          :name="data.meta.leastSpawned.name"
          :count="data.meta.leastSpawned.number"
          :rarity="data.meta.leastSpawned.rarity" />
      </div>
    </div>
    <div class="mb-16 grid grid-cols-1 sm:grid-cols-3 gap-3 my-4" v-else>
      <div>
        <USkeleton class="mb-2 w-full h-8" />
        <USkeleton class="w-full h-24" />
      </div>
      <div>
        <USkeleton class="mb-2 w-full h-8" />
        <USkeleton class="w-full h-24" />
      </div>
      <div>
        <USkeleton class="mb-2 w-full h-8" />
        <USkeleton class="w-full h-24" />
      </div>
    </div>
  </section>

  <section class="mb-16" v-auto-animate>
    <div v-if="data !== null">
      <h2 class="font-bold uppercase text-xl bg-yellow-500 text-zinc-900 text-center rounded-lg">Current Population</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4" v-auto-animate>
        <InventoryInfoItem
          v-for="(count, zone) in data.meta.population"
          class="bg-gradient-to-bl via-zinc-950 via-50% to-zinc-950 to-100%"
          :class="locationBgClass[zone]"
          :key="zone"
          :icon="`/icons/zones/${zone}.svg`"
          iconSecondary="/icons/utils/population.svg"
          iconSecondaryAlt="people representing population"
          :iconAlt="zone.toString()"
          :topText="zone"
          :bottomText="`Zone ${count}`" />
      </ul>
    </div>
    <div v-else>
      <USkeleton class="mb-2 w-full h-8" />
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        <USkeleton class="w-full h-16" />
        <USkeleton class="w-full h-16" />
        <USkeleton class="w-full h-16" />
        <USkeleton class="w-full h-16" />
        <USkeleton class="w-full h-16" />
        <USkeleton class="w-full h-16" />
      </div>
    </div>
  </section>
</template>

<style>
.emojis {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  width: max-content;
  margin: auto;
  font-size: clamp(2rem, 4vw, 4rem);
}
</style>
