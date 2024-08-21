<script setup lang="ts">
const config = useRuntimeConfig();
definePageMeta({ favicon: "🍳" });

useSeoMeta({
  title: "Learn how to cook in p4nth3rworld",
  description: "View recipes and get some hints about ingredients you can cook with in p4nth3rworld",
});

const { status, data, error, refresh } = await useFetch<RecipesResponse | null>(`recipes/`, {
  baseURL: config.public.world_api_url,
});
</script>

<template>
  <h1 class="text-4xl font-bold mb-4">recipes</h1>
  <p class="mb-12">See what you can cook!</p>

  <ul v-if="data !== null">
    <li v-for="recipe in data.recipes" class="mb-8">
      <h2 class="font-bold text-2xl text-emerald-300 lowercase">{{ recipe.title }}</h2>
      <p class="italic">{{ recipe.description }}</p>
    </li>
  </ul>
</template>
