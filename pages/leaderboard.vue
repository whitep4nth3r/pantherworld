<script setup lang="ts">
const config = useRuntimeConfig();

definePageMeta({
  favicon: "🏆",
});

useSeoMeta({
  title: "Leaderboard",
  description: "Where do you rank?",
});

const { status, data, error, refresh } = await useFetch<FullLeaderboardResponse | null>(`leaderboard/`, {
  baseURL: config.public.world_api_url,
});

type RankedPlayer = Player & {
  rank: number
}

const rankedPlayers = computed<RankedPlayer[]>(() => {
  if(!data.value)
  {
    return [];
  }

  return data.value.leaderboard.players.map((player, index) => {
    return {...player, rank: index};
  })
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
  direction: "asc" as "asc"|"desc"
});

const sortedPlayers = computed(() => {
  if(!data.value)
  {
    return []; 
  }

  if(!sortSetting.value)
  {
    return rankedPlayers.value;
  } 

  const columnValue = sortSetting.value.column;
  return [...rankedPlayers.value].sort((playerA, playerB) => {
    const valueA = playerA[columnValue];
    const valueB = playerB[columnValue];

    if(typeof valueA === "number" && typeof valueB === "number")
    {
      return sortSetting.value.direction === "asc" ? valueA - valueB : valueB - valueA;
    }
    else if(typeof valueA === "string" && typeof valueB === "string")
    {
      return sortSetting.value.direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }

    return 0;
  });  
});

function onSortClicked(column: keyof RankedPlayer)
{
  if(sortSetting.value.column !== column)
  {
    sortSetting.value.column = column; 
  }
  else
  {
    sortSetting.value.direction = sortSetting.value.direction === "asc" ? "desc" : "asc";
  }
}

const columns: {key: keyof RankedPlayer, title: string}[] = [
  {key: "rank", title: "Rank"},
  {key: "username", title: "Username"},
  {key: "items", title: "Items"},
  {key: "wealth_index", title: "Wealth index"},
]

</script>

<template>
  <h1 class="text-4xl font-bold mb-12">Leaderboard</h1>

  <section class="overflow-x-auto">
    <table class="min-w-full divide-y divide-zinc-500">
      <thead class="bg-zinc-800">
        <tr>
          <th v-for="column of columns" 
            scope="col" 
            class="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
            <button class="flex gap-1" @click="onSortClicked(column.key)">
              {{ column.title }}
              <img v-if="sortSetting.column === column.key && sortSetting.direction === 'asc'" src="/icons/utils/sort_asc.svg" alt="an ascending icon" height="16" width="16" />
              <img v-if="sortSetting.column === column.key && sortSetting.direction === 'desc'" src="/icons/utils/sort_desc.svg" alt="an descending icon" height="16" width="16" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody class="bg-black/90 divide-y divide-zinc-500">
        <tr
          v-for="player in sortedPlayers"
          :key="player.username"
          :class="{ 'bg-violet-700 text-white': user?.name === player.username }">
          <td class="px-6 py-3 whitespace-nowrap">
            <span v-if="player.rank === 0">🥇</span>
            <span v-else-if="player.rank === 1">🥈</span>
            <span v-else-if="player.rank === 2">🥉</span>
            <span v-else>{{ player.rank + 1 }}</span>
          </td>
          <td class="px-6 py-3 whitespace-nowrap flex items-center text-zinc-100">
            {{ player.username }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap text-zinc-100">
            {{ player.items }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap text-zinc-100">
            {{ player.wealth_index }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
