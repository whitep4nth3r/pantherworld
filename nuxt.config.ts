// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      twitch_client_id: "", // NUXT_PUBLIC_TWITCH_CLIENT_ID
      world_api_url: "https://p4nth3rb0t-mainframe.herokuapp.com/world/", // NUXT_WORLD_API_URL
    },
    oauth: {
      twitch: {
        clientId: "", // NUXT_OAUTH_TWITCH_CLIENT_ID
        clientSecret: "", // NUXT_OAUTH_TWITCH_CLIENT_SECRET
      },
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },

  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/html-validator", "nuxt-auth-utils", "@formkit/auto-animate/nuxt"],
  compatibilityDate: "2024-07-04",
});
