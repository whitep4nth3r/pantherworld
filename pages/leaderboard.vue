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
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Username</th>
        <th>Items</th>
        <th>Wealth index</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(player, index) in data!.leaderboard.players">
        <td>{{ index + 1 }}</td>
        <td>{{ player.username }}</td>
        <td>{{ player.items }}</td>
        <td>{{ player.wealth_index }}</td>
      </tr>
    </tbody>
  </table>
</template>
