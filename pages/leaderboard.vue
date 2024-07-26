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
    <table class="min-w-full divide-y divide-gray-700">
      <thead class="bg-gray-800">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Username</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Items</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Wealth index</th>
        </tr>
      </thead>
      <tbody class="bg-black divide-y divide-gray-700">
        <tr
          v-for="(player, index) in data!.leaderboard.players"
          :key="player.username"
          :class="{ 'bg-violet-700 text-white': user?.name === player.username }">
          <td class="px-6 py-3 whitespace-nowrap text-gray-300">
            <span v-if="index === 0">🥇</span>
            <span v-else-if="index === 1">🥈</span>
            <span v-else-if="index === 2">🥉</span>
            <span v-else>{{ index + 1 }}</span>
          </td>
          <td class="px-6 py-3 whitespace-nowrap flex items-center text-gray-300">
            {{ player.username }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap text-gray-300">
            {{ player.items }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap text-gray-300">
            {{ player.wealth_index }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
