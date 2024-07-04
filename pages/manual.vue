<script setup lang="ts">
definePageMeta({ favicon: "📦" });

useSeoMeta({
  title: "How to play p4nth3rworld",
  description:
    "p4nth3rworld is a multiplayer text-based game powered by a live coding stream at twitch.tv/whitep4nth3r",
});
</script>

<template>
  <div>
    <section class="mb-12">
      <h1 class="text-4xl font-bold">How to play p4nth3rworld</h1>
    </section>

    <section>
      <p class="text-base mb-2">
        p4nth3rworld is a multiplayer text-based game powered by a live coding stream at
        <a href="https://twitch.tv/whitep4nth3r/chat">twitch.tv/whitep4nth3r</a>.
      </p>
      <p class="text-base mb-2">
        When events happen on the stream (follow, channel point redemption, subscription, etc), a random "world item"
        will spawn in a random "world zone", and a notification message will be sent to the stream chat.
      </p>
      <h2 class="text-3xl font-bold my-8">Your objective</h2>
      <p class="text-base mb-2">!claim items and fill up your inventory.</p>
      <p class="text-base mb-2">Your objective will change as the game evolves.</p>
    </section>
    <section>
      <h2 class="text-3xl font-bold my-8">Player commands</h2>
      <table class="table-auto border-collapse">
        <thead>
          <th colspan="2" class="border border-zinc-500 p-2">Command</th>
          <th class="border border-zinc-500 p-2">Details</th>
        </thead>
        <tbody>
          <tr>
            <td class="border border-zinc-500 p-2">🗺️</td>
            <td class="border border-zinc-500 p-2">!map</td>
            <td class="border border-zinc-500 p-2">Get a list of available world zones</td>
          </tr>
          <tr>
            <td class="border border-zinc-500 p-2">➡️</td>
            <td class="border border-zinc-500 p-2">!move [zone]</td>
            <td class="border border-zinc-500 p-2">Travel to a zone</td>
          </tr>
          <tr>
            <td class="border border-zinc-500 p-2">📍</td>
            <td class="border border-zinc-500 p-2">!locate</td>
            <td class="border border-zinc-500 p-2">Find out which zone you're in</td>
          </tr>
          <tr>
            <td class="border border-zinc-500 p-2">🎒</td>
            <td class="border border-zinc-500 p-2">!claim [item]</td>
            <td class="border border-zinc-500 p-2">Claim a spawned or dropped item</td>
          </tr>
          <tr>
            <td class="border border-zinc-500 p-2">🫳</td>
            <td class="border border-zinc-500 p-2">!drop [item]</td>
            <td class="border border-zinc-500 p-2">Drop an item in your current zone</td>
          </tr>
          <tr>
            <td class="border border-zinc-500 p-2">🎁</td>
            <td class="border border-zinc-500 p-2">!gift [receiver/random] [item]</td>
            <td class="border border-zinc-500 p-2">Gift an item in your current zone</td>
          </tr>
          <tr>
            <td class="border border-zinc-500 p-2">🎒</td>
            <td class="border border-zinc-500 p-2">!inventory</td>
            <td class="border border-zinc-500 p-2">List your items</td>
          </tr>
          <tr>
            <td class="border border-zinc-500 p-2">📊</td>
            <td class="border border-zinc-500 p-2">!population</td>
            <td class="border border-zinc-500 p-2">List how many players are in each zone</td>
          </tr>
          <tr>
            <td class="border border-zinc-500 p-2">📗</td>
            <td class="border border-zinc-500 p-2">!manual</td>
            <td class="border border-zinc-500 p-2">View commands on the stream when the stream is live</td>
          </tr>
        </tbody>
      </table>
      <h2 class="text-3xl font-bold my-8">Other commands (world leader only)</h2>
      <table>
        <thead>
          <th colspan="2" class="border border-zinc-500 p-2">Command</th>
          <th class="border border-zinc-500 p-2">Details</th>
        </thead>
        <tbody>
          <tr>
            <td class="border border-zinc-500 p-2">📦</td>
            <td class="border border-zinc-500 p-2">!release</td>
            <td class="border border-zinc-500 p-2">Releases unclaimed items in a random zone for claiming</td>
          </tr>
          <tr>
            <td class="border border-zinc-500 p-2">🥇</td>
            <td class="border border-zinc-500 p-2">!leaderboard</td>
            <td class="border border-zinc-500 p-2">Shows the top three players with the most items</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2 class="text-3xl font-bold my-8">Play when the stream is offline</h2>
      <p class="text-base mb-2">The game doesn't stop when the stream ends.</p>
      <p class="text-base mb-2">
        <a href="https://discord.gg/theclaw" class="underline">Join The Claw Discord</a>
        and monitor the #p4nth3rworld-feed channel to be notified of item spawns when the stream is offline.
      </p>
    </section>
  </div>
</template>
