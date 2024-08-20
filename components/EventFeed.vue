<script lang="ts" setup>
import { useWebSocket } from "@vueuse/core";

const validEvents = [
  "itemspawn",
  "playerscanned",
  "playercook",
  "playercookfail",
  "playermove",
  "playerclaim",
  "playerdrop",
  "playergift",
  "releaseunclaimed",
];

const { status, data, send, open, close } = useWebSocket("wss://p4nth3rb0t-mainframe.herokuapp.com/");

type Event = {
  data: {
    username?: string;
    count?: number;
    rarity?: number;
    zone?: string;
    toZone?: string;
    ingredientList?: string[];
    lost?: string[];
    recipe?: string;
    item?: string | { name?: string; rarity?: number };
    giver?: string;
    receiver?: string;
  };
  type: string;
};

const history = ref<Event[]>([]);

watch(data, (message) => {
  const messageObj = JSON.parse(message);

  if (validEvents.includes(messageObj.event)) {
    history.value.push(messageObj);
  }
});

// limit to 3 events?
// format events depending on "message.type?"
</script>

<template>
  <div>
    <h1>Event feed</h1>
    <div v-for="entry in history">
      <p v-if="entry.type === 'scanned'">
        👀 {{ entry.data.username }} scanned {{ entry.data.zone }} zone and found {{ entry.data.count }} items
      </p>
      <p v-if="entry.type === 'cookfail'">
        🤮 {{ entry.data.username }} spoiled a recipe! They lost {{ entry.data.ingredientList?.join(", ") }}!
      </p>
      <p v-if="entry.type === 'cook'">
        🍳 {{ entry.data.username }} cooked {{ entry.data.recipe }}
        <span v-if="entry.data.lost && entry.data.lost?.length > 0">, but lost {{ entry.data.lost.join(", ") }}!</span>
        (rarity: {{ entry.data.rarity }})
      </p>
      <p v-if="entry.type === 'release'">📦 {{ entry.data.count }} items released in the {{ entry.data.zone }} zone</p>
      <p v-if="entry.type === 'move'">➡️ {{ entry.data.username }} moved to the {{ entry.data.toZone }} zone</p>
      <p v-if="entry.type === 'claim'">
        🎒 {{ entry.data.username }} claimed {{ entry.data.item }} in the {{ entry.data.zone }} zone
      </p>
      <p v-if="entry.type === 'drop'">
        🫳 {{ entry.data.username }} dropped {{ entry.data.item }} in the {{ entry.data.zone }} zone (rarity:
        {{ entry.data.rarity }})
      </p>
      <p v-if="entry.type === 'gift'">
        🎁 {{ entry.data.giver }} gifted {{ entry.data.item }} to {{ entry.data.receiver }} in the
        {{ entry.data.zone }} zone (rarity: {{ entry.data.rarity }})
      </p>
      <p v-if="entry.type === 'spawn' && entry.data.item !== undefined && typeof entry.data.item !== 'string'">
        🌏 {{ entry.data.item.name }} spawned in the {{ entry.data.zone }} zone (rarity: {{ entry.data.item.rarity }})
      </p>
    </div>
  </div>
</template>
