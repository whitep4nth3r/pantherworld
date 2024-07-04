<script setup lang="ts">
useSeoMeta({
  title: "Welcome to p4nth3rworld",
  description: "The game doesn't stop when the stream ends.",
});
</script>

<template>
  <section class="flex flex-col gap-3 justify-center items-center m-8">
    <div class="emojis">
      <span>🎒</span>
      <span>📦</span>
      <span>🌍</span>
      <span>📍</span>
      <span>🌳</span>
      <span>🗺️</span>
    </div>
    <h1 class="text-4xl font-bold">This is p4nth3rworld</h1>
    <h2 class="text-2xl mb-6">The game doesn't stop when the stream ends.</h2>
    <a href="https://twitch.tv/whitep4nth3r/chat" class="bg-white text-slate-950 py-4 px-8 rounded-lg text-xl"
      >Play at twitch.tv/whitep4nth3r</a
    >
    <NuxtLink href="/manual" class="underline my-8">Read the manual</NuxtLink>
  </section>
</template>

<style>
.emojis {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  width: max-content;
  margin: auto;
  font-size: clamp(2rem, 4vw, 4rem);
}
</style>
