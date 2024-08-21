<script lang="ts" setup>
import { useWebSocket } from "@vueuse/core";
const toast = useToast();

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

function getNotifTitle(event: Event): string {
  switch (event.type) {
    case "scanned":
      return `${event.data.username} scanned ${event.data.zone} zone and found ${event.data.count} items`;
    case "cookfail":
      return `${event.data.username} spoiled a recipe! They lost ${event.data.ingredientList?.join(", ")}!`;
    case "cook":
      return `${event.data.username} cooked ${event.data.recipe}${event.data.lost && event.data.lost?.length > 0 ? `, but lost ${event.data.lost.join(", ")}}!` : ``} (rarity: ${event.data.rarity})`;
    case "release":
      return `${event.data.count} items released in the ${event.data.zone} zone`;
    case "move":
      return `${event.data.username} moved to the ${event.data.toZone} zone`;
    case "claim":
      return `${event.data.username} claimed ${event.data.item} in the ${event.data.zone} zone (rarity:
        ${event.data.rarity})`;
    case "drop":
      return `${event.data.username} dropped ${event.data.item} in the ${event.data.zone} zone (rarity:
        ${event.data.rarity})`;
    case "gift":
      return `${event.data.giver} gifted ${event.data.item} to ${event.data.receiver} in the
        ${event.data.zone} zone (rarity: ${event.data.rarity})`;
    case "spawn":
      // @ts-ignore
      return `${event.data.item.name} spawned in the ${event.data.zone} zone (rarity: ${event.data.item.rarity})`;
    default:
      return "";
  }
}

function getNotifAvatar(type: string): string {
  switch (type) {
    case "scanned":
      return "/icons/notifications/scanned.png";
    case "cookfail":
      return "/icons/notifications/cookfail.png";
    case "cook":
      return "/icons/notifications/cook.png";
    case "release":
      return "/icons/notifications/release.png";
    case "move":
      return "/icons/notifications/move.png";
    case "claim":
      return "/icons/notifications/claim.png";
    case "drop":
      return "/icons/notifications/drop.png";
    case "gift":
      return "/icons/notifications/gift.png";
    case "spawn":
      return "/icons/notifications/spawn.png";
    default:
      return "";
  }
}

function getNotifColors(type: string): { background: string; text: string } {
  switch (type) {
    case "scanned":
      return { background: "bg-notif-scanned dark:bg-notif-scanned", text: "text-notif-black dark:text-notif-black" };
    case "cookfail":
      return { background: "bg-notif-cookfail dark:bg-notif-cookfail", text: "text-notif-white dark:text-notif-white" };
    case "cook":
      return { background: "bg-notif-cook dark:bg-notif-cook", text: "text-notif-black dark:text-notif-black" };
    case "release":
      return { background: "bg-notif-release dark:bg-notif-release", text: "text-notif-white dark:text-notif-white" };
    case "move":
      return { background: "bg-notif-move dark:bg-notif-move", text: "text-notif-white dark:text-notif-white" };
    case "claim":
      return { background: "bg-notif-claim dark:bg-notif-claim", text: "text-notif-black dark:text-notif-black" };
    case "drop":
      return { background: "bg-notif-drop dark:bg-notif-drop", text: "text-notif-white dark:text-notif-white" };
    case "gift":
      return { background: "bg-notif-gift dark:bg-notif-gift", text: "text-notif-white dark:text-notif-white" };
    case "spawn":
      return { background: "bg-notif-spawn dark:bg-notif-spawn", text: "text-notif-white dark:text-notif-white" };
    default:
      return { background: "", text: "" };
  }
}

function getNotifProgressBg(type: string): string {
  switch (type) {
    case "scanned":
      return "bg-notif-black dark:bg-notif-black";
    case "cookfail":
      return "bg-notif-white dark:bg-notif-white";
    case "cook":
      return "bg-notif-black dark:bg-notif-black";
    case "release":
      return "bg-notif-white dark:bg-notif-white";
    case "move":
      return "bg-notif-white dark:bg-notif-white";
    case "claim":
      return "bg-notif-black dark:bg-notif-black";
    case "drop":
      return "bg-notif-white dark:bg-notif-white";
    case "gift":
      return "bg-notif-white dark:bg-notif-white";
    case "spawn":
      return "bg-notif-white dark:bg-notif-white";
    default:
      return "";
  }
}

watch(data, (message) => {
  const messageObj = JSON.parse(message);

  if (validEvents.includes(messageObj.event)) {
    const uiColours = getNotifColors(messageObj.type);

    toast.add({
      id: messageObj.id,
      title: getNotifTitle(messageObj),
      timeout: 6000,
      avatar: { src: getNotifAvatar(messageObj.type), size: "sm" },
      icon: "",
      // @ts-ignore
      closeButton: null,
      ui: {
        background: uiColours.background,
        title: uiColours.text,
        description: uiColours.text,
        padding: "p-2",
        ring: "",
        shadow: "shadow-xl",
        progress: {
          background: getNotifProgressBg(messageObj.type),
        },
      },
    });
  }
});

// check for ws connection and reconnect if disconnects
</script>

<template>
  <UNotifications :ui="{ wrapper: 'fixed flex flex-col justify-start z-[55]' }" />
</template>
