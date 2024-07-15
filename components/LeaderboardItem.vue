<script lang="ts" setup>
const props = defineProps<{
  player: LeaderBoardPlayer;
  rank: number;
}>();
</script>

<template>
  <div class="flex flex-col items-center text-center relative">
    <span v-if="rank === 1" class="text-4xl absolute -top-6 rotate-6">👑</span>
    <img
      :src="player.image_url"
      :alt="`${player.username} profile image`"
      class="rounded-full mb-2"
      :class="[
        rank === 1 ? 'w-24' : 'w-16',
        rank === 1 ? 'border-amber-400' : 'border-emerald-400',
        rank === 1 ? 'border-4' : 'border-2 ',
      ]" />
    <p class="font-bold">@{{ player.username }}</p>
    <p>{{ Intl.NumberFormat().format(player.items) }} items</p>
    <p>Wealth Index: {{ Intl.NumberFormat().format(player.wealthIndex) }}</p>
  </div>
</template>
