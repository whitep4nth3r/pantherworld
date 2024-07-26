<script setup lang="ts">
const route = useRoute();

useHead({
  link: [
    {
      rel: "icon",
      href: () =>
        `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%25%22 y=%220.95em%22 text-anchor=%22middle%22 font-size=%2290px%22>${
          route.meta.favicon || `🌍`
        }</text></svg>`,
    },
  ],
  bodyAttrs: {
    class: "m-auto p-4 max-w-screen-md bg-zinc-900 text-zinc-100",
  },
});
</script>

<template>
  <HeaderNav :title="route.name as string" />
  <main>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </main>
</template>
