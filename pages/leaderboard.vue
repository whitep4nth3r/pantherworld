<script setup lang="ts">
const config = useRuntimeConfig();

definePageMeta({
  favicon: "🏆",
});

useSeoMeta({
  title: "Leaderboard",
  description: "Where do you rank?",
});

const { status, data, error, refresh } = useFetch<FullLeaderboardResponse | null>(`leaderboard/`, {
  baseURL: config.public.world_api_url,
  lazy: true,
});

const state = reactive({
  username: "",
});

type RankedPlayer = Player & {
  rank: number;
};

const rankedPlayers = computed<RankedPlayer[]>(() => {
  if (!data.value) {
    return [];
  }

  return data.value.leaderboard.players.map((player, index) => {
    return { ...player, rank: index };
  });
});

onMounted(() => {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      refresh();
    }
  });
});

const { user } = useUserSession();

const sortSetting = ref({
  column: "rank" as keyof RankedPlayer,
  direction: "asc" as "asc" | "desc",
});

const sortedPlayers = computed(() => {
  if (!data.value) {
    return [];
  }

  if (!sortSetting.value) {
    return rankedPlayers.value;
  }

  const columnValue = sortSetting.value.column;
  return [...rankedPlayers.value].sort((playerA, playerB) => {
    const valueA = playerA[columnValue];
    const valueB = playerB[columnValue];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortSetting.value.direction === "asc" ? valueA - valueB : valueB - valueA;
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return sortSetting.value.direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }

    return 0;
  });
});

function onSortClicked(column: keyof RankedPlayer) {
  if (sortSetting.value.column !== column) {
    sortSetting.value.column = column;
  } else {
    sortSetting.value.direction = sortSetting.value.direction === "asc" ? "desc" : "asc";
  }
}

function filteredWithUsername(){
  return rankedPlayers.value.filter((player) => player.username.toLowerCase().includes(state.username.toLowerCase()))
}

function scrollToUser() {
  const player = filteredWithUsername()[0]
  if(player) {
    const targetElement = document.getElementById(player.username);
    targetElement?.scrollIntoView({ behavior: 'smooth', block:"center" });
  }
}

const columns: { key: keyof RankedPlayer; title: string; type: "num" | "az" }[] = [
  { key: "rank", title: "Rank", type: "num" },
  { key: "username", title: "Username", type: "az" },
  { key: "items", title: "Items", type: "num" },
  { key: "wealth_index", title: "Wealth index", type: "num" },
];
</script>

<template>
  <h1 class="text-4xl font-bold mb-4">leaderboard</h1>
  <p class="mb-12">Click the column headers to sort and re-order.</p>

  <section class="overflow-x-auto" v-if="data">
    <UForm
      :state="state"
      class="w-full p-1 pb-4"
      @submit="scrollToUser"
      >
      <UFormGroup size="lg" :label="!state.username ? 'Search for a player' : 'Search for a player (Found: ' + filteredWithUsername().length + ')' " class="w-full flex flex-col gap-2" description="Submit a search query to scroll to the results.">
        <div class="flex gap-2">
          <UInput
            class="w-full"
            v-model="state.username"
            trailing
            color="emerald"
            placeholder="whitep4nth3r"
          />
          <UButton type="submit" color="emerald"icon="i-heroicons-magnifying-glass-16-solid">Search</UButton>
        </div>
      </UFormGroup>
    </UForm>

    <table class="min-w-full divide-y divide-zinc-500 table-auto">
      <thead class="bg-zinc-800">
        <tr>
          <th v-for="column of columns" scope="col" class="px-6 py-3 text-left">
            <button
              type="button"
              class="text-xs font-medium min-w-max text-zinc-300 uppercase flex items-center gap-1 p-2 focus:outline-none active:outline-none focus:ring focus:ring-emerald-300 active:ring active:ring-emerald-300 rounded-lg"
              @click="onSortClicked(column.key)">
              <span>
                {{ column.title }}
              </span>
              <img
                v-if="sortSetting.column === column.key && sortSetting.direction === 'asc' && column.type === 'num'"
                src="/icons/utils/sort_num_asc.svg"
                alt="up arrow next to 0-9"
                height="16"
                width="16" />
              <img
                v-if="sortSetting.column === column.key && sortSetting.direction === 'desc' && column.type === 'num'"
                src="/icons/utils/sort_num_desc.svg"
                alt="down arrow next to 0-9"
                height="16"
                width="16" />
              <img
                v-if="sortSetting.column === column.key && sortSetting.direction === 'asc' && column.type === 'az'"
                src="/icons/utils/sort_az_asc.svg"
                alt="up arrow next to a-z"
                height="16"
                width="16" />
              <img
                v-if="sortSetting.column === column.key && sortSetting.direction === 'desc' && column.type === 'az'"
                src="/icons/utils/sort_az_desc.svg"
                alt="down arrow next to a-z"
                height="16"
                width="16" />
              <span v-if="sortSetting.column !== column.key" class="h-4 w-4"></span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody class="bg-black/90 divide-y divide-zinc-500">
        <tr
          v-for="player in sortedPlayers"
          :id="player.username"
          :key="player.username"
          :class="{
            'bg-emerald-300 text-zinc-900': state.username && player.username.toLowerCase().includes(state.username.toLowerCase()),
            'bg-violet-700 text-white': !state.username && user?.name === player.username }">
          <td class="px-6 py-3 whitespace-nowrap">
            <span v-if="player.rank === 0">🥇</span>
            <span v-else-if="player.rank === 1">🥈</span>
            <span v-else-if="player.rank === 2">🥉</span>
            <span v-else>{{ player.rank + 1 }}</span>
          </td>
          <td class="px-6 py-3 whitespace-nowrap flex items-center">
            {{ player.username }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap">
            {{ player.items }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap">
            {{ Intl.NumberFormat().format(player.wealth_index as number) }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <section v-else class="flex flex-col gap-2">
    <USkeleton class="w-full h-8" />
    <USkeleton class="w-full h-8" />
    <USkeleton class="w-full h-8" />
    <USkeleton class="w-full h-8" />
    <USkeleton class="w-full h-8" />
    <USkeleton class="w-full h-8" />
    <USkeleton class="w-full h-8" />
  </section>
</template>