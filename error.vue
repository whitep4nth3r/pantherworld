<script setup lang="ts">
const route = useRoute();
const error = useError();
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
  <div class="h-screen" v-if="error.statusCode === 404">
    <section class="flex h-full flex-col justify-center items-center gap-12">
      <h1 class="text-4xl font-bold text-center">
        404 - 😭 Oh no, you seem to be lost!
      </h1>

      <p class="text-base mb-2 text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <a
        href="/"
        class="bg-violet-700 hover:bg-violet-500 focus:bg-emerald-700 active:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-300 text-white font-bold uppercase py-2 px-4 rounded-lg text-xl transition"
        >Take me back</a
      >
    </section>
  </div>
</template>
