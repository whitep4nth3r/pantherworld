<script setup lang="ts">
const props = defineProps<{
  name: string;
  rarity: number;
  count?: number;
  extraInfo?: string;
  cooked?: boolean;
}>();

const displayCount = computed(() => props.count && props.count > 1);
const irradiated = computed(() => props.name.includes("irradiated"));
</script>

<template>
  <div
    class="grid grid-cols-[2fr_5fr] grow gap-4 bg-zinc-800 rounded-lg relative items-center p-4 bg-gradient-to-t via-10% to-zinc-800 to-60%"
    :class="{ 'from-lime-600 via-lime-800': irradiated }">
    <span
      v-if="displayCount"
      class="font-display absolute text-slate-50 bg-zinc-600 rounded-xl py1 px-2 -right-2 -top-2 font-bold"
      >{{ count }}x</span
    >
    <span
      v-if="extraInfo"
      class="font-display absolute text-slate-50 bg-zinc-600 rounded-xl py1 px-2 -right-2 -top-2 font-bold"
      >{{ extraInfo }}</span
    >
    <span
      v-if="cooked"
      class="font-display absolute text-slate-50 bg-zinc-600 rounded-xl py1 px-2 -right-2 -top-2 font-bold"
      >cooked</span
    >

    <span class="justify-center w-[4rem] h-[4rem] p-4 rounded-full items-center flex bg-zinc-600 text-2xl leading-none">
      <template v-if="InventoryItemImages[name.replace(' ', '-')] !== undefined">
        {{ InventoryItemImages[name.replace(" ", "-")] }}
      </template>

      <span v-else-if="cooked">🍳</span>
      <img v-else src="/icons/items/circle.svg" height="24" width="24" :alt="name" />
    </span>

    <div>
      <span class="text-slate-50 text-base capitalize mb-2 block">{{ name }}</span>
      <span class="text-slate-50 block">{{ Intl.NumberFormat().format(rarity) }}</span>
    </div>
  </div>
</template>
