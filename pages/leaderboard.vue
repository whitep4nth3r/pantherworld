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

const { loggedIn, user, session, clear } = useUserSession();

// ${user?.name}
</script>

<template>
  <section>
    <table class="m-auto table-auto text-left">
      <thead>
        <tr>
          <th scope="col" class="border border-slate-300 p-2">Rank</th>
          <th scope="col" class="border border-slate-300 p-2">Username</th>
          <th scope="col" class="border border-slate-300 p-2">Items</th>
          <th scope="col" class="border border-slate-300 p-2">Wealth index</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(player, index) in data!.leaderboard.players"
          :class="{ 'bg-violet-700 text-white': user?.name === player.username }">
          <td class="border border-slate-300 p-2">
            {{ index + 1 }}
          </td>
          <td class="border border-slate-300 p-2">
            {{ player.username }}
          </td>
          <td class="border border-slate-300 p-2">
            {{ player.items }}
          </td>
          <td class="border border-slate-300 p-2">
            {{ player.wealth_index }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
