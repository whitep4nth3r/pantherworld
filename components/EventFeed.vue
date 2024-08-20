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
  id: string;
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
// check for ws connection and reconnect if disconnects
// decide on presentation
</script>

<template>
  <div>
    <h1>Event feed</h1>
    <div v-for="entry in history">
      <UNotification
        v-if="entry.type === 'scanned'"
        :description="`${entry.data.username} scanned ${entry.data.zone} zone and found ${entry.data.count} items`"
        :id="entry.id"
        :timeout="0"
        title="👀 Scan" />

      <UNotification
        v-if="entry.type === 'cookfail'"
        :description="`${entry.data.username} spoiled a recipe! They lost ${entry.data.ingredientList?.join(', ')}!`"
        :id="entry.id"
        :timeout="0"
        title="🤮 Cook failed" />

      <UNotification
        v-if="entry.type === 'cook'"
        :description="`${entry.data.username} cooked ${entry.data.recipe}${entry.data.lost && entry.data.lost?.length > 0 ? `, but lost ${entry.data.lost.join(', ')}}!` : ``} (rarity: ${entry.data.rarity})`"
        :id="entry.id"
        :timeout="0"
        title="🍳 Cooked" />

      <UNotification
        v-if="entry.type === 'release'"
        :description="`${entry.data.count} items released in the ${entry.data.zone} zone`"
        :id="entry.id"
        :timeout="0"
        title="📦 Release" />

      <UNotification
        v-if="entry.type === 'move'"
        :description="`${entry.data.username} moved to the ${entry.data.toZone} zone`"
        :id="entry.id"
        :timeout="0"
        title="➡️ Move" />

      <UNotification
        v-if="entry.type === 'claim'"
        :description="`${entry.data.username} claimed ${entry.data.item} in the ${entry.data.zone} zone (rarity:
        ${entry.data.rarity})`"
        :id="entry.id"
        :timeout="0"
        title="🎒 Claim" />

      <UNotification
        v-if="entry.type === 'drop'"
        :description="`${entry.data.username} dropped ${entry.data.item} in the ${entry.data.zone} zone (rarity:
        ${entry.data.rarity})`"
        :id="entry.id"
        :timeout="0"
        title="🫳 Drop" />

      <UNotification
        v-if="entry.type === 'gift'"
        :description="`${entry.data.giver} gifted ${entry.data.item} to ${entry.data.receiver} in the
        ${entry.data.zone} zone (rarity: ${entry.data.rarity})`"
        :id="entry.id"
        :timeout="0"
        title="🎁 Gift" />

      <UNotification
        v-if="entry.type === 'spawn' && entry.data.item !== undefined && typeof entry.data.item !== 'string'"
        :description="`${entry.data.item.name} spawned in the ${entry.data.zone} zone (rarity: ${entry.data.item.rarity})`"
        :id="entry.id"
        :timeout="0"
        title="🌏 Spawn" />
    </div>
  </div>
</template>
