<script setup lang="ts">
const props = defineProps<{
  name: string;
  rarity: number;
  count?: number;
  extraInfo?: string;
}>();

const displayCount = computed(() => props.count && props.count > 1);
const irradiated = computed(() => props.name.includes("irradiated"));
</script>

<template>
  <div
    class="flex flex-col flex-grow gap-1 bg-zinc-800 rounded-lg relative text-center p-4 bg-gradient-to-t via-10% to-zinc-800 to-60%"
    :class="{ 'from-lime-600 via-lime-800': irradiated }">
    <span v-if="displayCount" class="absolute text-white bg-zinc-600 rounded-xl py1 px-2 left-2 -top-2 italic font-bold"
      >{{ count }}x</span
    >
    <span
      v-if="extraInfo"
      class="absolute text-white bg-zinc-600 rounded-xl py1 px-2 left-2 -top-2 italic font-bold capitalize"
      >{{ extraInfo }}</span
    >
    <span class="m-auto p-4 rounded-full bg-zinc-600 s-14 text-2xl leading-none">
      <template v-if="InventoryItemImages[name.replace(' ', '-')] !== undefined">
        {{ InventoryItemImages[name.replace(" ", "-")] }}
      </template>

      <img v-else src="/icons/items/circle.svg" height="24" width="24" :alt="name" />
    </span>
    <span class="text-white text-lg capitalize">{{ name }}</span>
    <span class="text-white">{{ Intl.NumberFormat().format(rarity) }}</span>
  </div>
</template>
