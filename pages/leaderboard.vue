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

onMounted(() => {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      refresh();
    }
  });
});

const { user } = useUserSession();
</script>

<template>
  <h1 class="text-4xl font-bold mb-12">Leaderboard</h1>

  <section class="overflow-x-auto">
    <table class="min-w-full divide-y divide-zinc-500">
      <thead class="bg-zinc-800">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase">Rank</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase">Username</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase">Items</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase">Wealth index</th>
        </tr>
      </thead>
      <tbody class="bg-black/90 divide-y divide-zinc-500">
        <tr
          v-for="(player, index) in data!.leaderboard.players.filter(p => !['Matty_nShoes','Matty_TwoShoes'].includes(p.username))"
          :key="player.username"
          :class="{ 'bg-violet-700 text-white': user?.name === player.username }">
          <td class="px-6 py-3 whitespace-nowrap">
            <span v-if="index === 0">🥇</span>
            <span v-else-if="index === 1">🥈</span>
            <span v-else-if="index === 2">🥉</span>
            <span v-else>{{ index + 1 }}</span>
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
