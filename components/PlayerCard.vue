<script lang="ts" setup>
const props = defineProps<{
  title: string;
  player: Player;
  item?: Item;
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-lg uppercase font-bold m-auto text-center mb-2 bg-yellow-500 text-zinc-900 rounded-lg w-full">
      {{ title }}
    </h2>
    <div class="flex flex-row gap-4 justify-center">
      <div class="flex flex-col items-center justify-between gap-2">
        <img
          :src="player.image_url"
          :alt="`${player.username} profile image`"
          class="rounded-full mb-2 border-4 border-yellow-500 w-32" />
        <p class="font-bold text-center">@{{ player.username }}</p>
        <p v-if="item" class="capitalize text-center">{{ item!.zone }} Zone</p>
        <p v-else class="capitalize text-center">{{ player.zone }} Zone</p>
        <p v-if="player.wealth_index">Wealth Index: {{ Intl.NumberFormat().format(player.wealth_index) }}</p>
      </div>
      <InventoryItem v-if="item" :name="item?.name" :rarity="item?.rarity" />
    </div>
  </div>
</template>
