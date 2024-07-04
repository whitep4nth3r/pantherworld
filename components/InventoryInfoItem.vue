<script setup lang="ts">
const props = defineProps<{
  icon: string;
  iconAlt: string;
  topText: string | number;
  bottomText: string;
}>();
</script>

<template>
  <div class="flex flex-row gap-4 bg-zinc-800 rounded-lg p-4 items-center">
    <div class="p-4 rounded-full bg-zinc-600 text-white">
      <img :src="icon" height="32" width="32" :alt="iconAlt" />
    </div>
    <div class="flex flex-col gap-1">
      <p class="text-white capitalize font-bold">{{ topText }}</p>
      <p class="text-white">{{ bottomText }}</p>
    </div>
  </div>
</template>
