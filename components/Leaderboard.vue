<script lang="ts" setup>
const props = defineProps<{
  players: LeaderBoardPlayer[];
}>();

function sortByWealthIndexDesc(a: LeaderBoardPlayer, b: LeaderBoardPlayer) {
  if (a.wealth_index > b.wealth_index) {
    return -1;
  }

  if (b.wealth_index > a.wealth_index) {
    return 1;
  }

  return 0;
}

const sortedPlayers = computed(() => props.players.sort(sortByWealthIndexDesc));
</script>

<template>
  <h2 class="font-bold uppercase text-xl text-center mb-8">🏆 Leaderboard</h2>
  <div class="grid gap-4 grid-cols-2 leaderboardGrid">
    <div class="player1 grid gap-1 items-center justify-center">
      <LeaderboardItem :player="sortedPlayers[0]" :rank="1" />
    </div>
    <div class="player2 grid justify-end items-center">
      <LeaderboardItem :player="sortedPlayers[1]" :rank="2" />
    </div>
    <div class="player3 grid justify-start items-center">
      <LeaderboardItem :player="sortedPlayers[2]" :rank="3" />
    </div>
  </div>
</template>

<style>
.leaderboardGrid {
  grid-template-areas:
    "player_first player_first"
    "player_second player_third";
}

.player1 {
  grid-area: player_first;
}

.player2 {
  grid-area: player_second;
}

.player3 {
  grid-area: player_third;
}
</style>
