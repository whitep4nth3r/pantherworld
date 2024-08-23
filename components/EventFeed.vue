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

function getNotifProgressBg(type: string): string {
  switch (type) {
    case "scanned":
    case "cook":
    case "claim":
      return "bg-notif-black dark:bg-notif-black";
    case "cookfail":
    case "release":
    case "move":
    case "drop":
    case "gift":
    case "spawn":
      return "bg-notif-white dark:bg-notif-white";
    default:
      return "";
  }
}

const { status, data, send, open, close } = useWebSocket("wss://p4nth3rb0t-mainframe.herokuapp.com/", {
  autoReconnect: true,
});

function getNotificationData(messageObj: Event): {
  title: string;
  avatar: { src: string; alt: string };
  ui: { background: string; text: string };
} {
  switch (messageObj.type) {
    case "scanned":
      return {
        title: `${messageObj.data.username} scanned ${messageObj.data.zone} zone and found ${messageObj.data.count} items`,
        avatar: { src: "/icons/notifications/scanned.png", alt: "eyes" },
        ui: { background: "bg-notif-scanned dark:bg-notif-scanned", text: "text-notif-black dark:text-notif-black" },
      };
    case "cookfail":
      return {
        title: `${messageObj.data.username} spoiled a recipe! They lost ${messageObj.data.ingredientList?.join(", ")}!`,
        avatar: { src: "/icons/notifications/cookfail.png", alt: "emoji being sick" },
        ui: { background: "bg-notif-cookfail dark:bg-notif-cookfail", text: "text-notif-white dark:text-notif-white" },
      };
    case "cook":
      return {
        title: `${messageObj.data.username} cooked ${messageObj.data.recipe}${messageObj.data.lost && messageObj.data.lost?.length > 0 ? `, but lost ${messageObj.data.lost.join(", ")}}!` : ``} (rarity: ${messageObj.data.rarity})`,
        avatar: { src: "/icons/notifications/cook.png", alt: "egg in frying pan" },
        ui: { background: "bg-notif-cook dark:bg-notif-cook", text: "text-notif-black dark:text-notif-black" },
      };
    case "release":
      return {
        title: `${messageObj.data.count} items released in the ${messageObj.data.zone} zone`,
        avatar: { src: "/icons/notifications/release.png", alt: "cardboard box" },
        ui: { background: "bg-notif-release dark:bg-notif-release", text: "text-notif-white dark:text-notif-white" },
      };
    case "move":
      return {
        title: `${messageObj.data.username} moved to the ${messageObj.data.toZone} zone`,
        avatar: { src: "/icons/notifications/move.png", alt: "arrow pointing right" },
        ui: { background: "bg-notif-move dark:bg-notif-move", text: "text-notif-white dark:text-notif-white" },
      };
    case "claim":
      return {
        title: `${messageObj.data.username} claimed ${messageObj.data.item} in the ${messageObj.data.zone} zone (rarity:
        ${messageObj.data.rarity})`,
        avatar: { src: "/icons/notifications/claim.png", alt: "back pack" },
        ui: { background: "bg-notif-claim dark:bg-notif-claim", text: "text-notif-black dark:text-notif-black" },
      };
    case "drop":
      return {
        title: `${messageObj.data.username} dropped ${messageObj.data.item} in the ${messageObj.data.zone} zone (rarity:
        ${messageObj.data.rarity})`,
        avatar: { src: "/icons/notifications/drop.png", alt: "hand with downward facing palm" },
        ui: { background: "bg-notif-drop dark:bg-notif-drop", text: "text-notif-white dark:text-notif-white" },
      };
    case "gift":
      return {
        title: `${messageObj.data.giver} gifted ${messageObj.data.item} to ${messageObj.data.receiver} in the
        ${messageObj.data.zone} zone (rarity: ${messageObj.data.rarity})`,
        avatar: { src: "/icons/notifications/gift.png", alt: "a gift wrapped up in a bow" },
        ui: { background: "bg-notif-gift dark:bg-notif-gift", text: "text-notif-white dark:text-notif-white" },
      };
    case "spawn":
      return {
        // @ts-ignore
        title: `${messageObj.data.item.name} spawned in the ${messageObj.data.zone} zone (rarity: ${messageObj.data.item.rarity})`,
        avatar: { src: "/icons/notifications/spawn.png", alt: "the world centred on africa and europe" },
        ui: { background: "bg-notif-spawn dark:bg-notif-spawn", text: "text-notif-white dark:text-notif-white" },
      };
    default:
      return { title: "", avatar: { src: "", alt: "" }, ui: { background: "", text: "" } };
  }
}

watch(data, (message) => {
  const messageObj = JSON.parse(message);

  if (validEvents.includes(messageObj.event)) {
    const notifData = getNotificationData(messageObj);

    toast.add({
      id: messageObj.id,
      title: notifData.title,
      timeout: 6000,
      avatar: { src: notifData.avatar.src, size: "sm", alt: notifData.avatar.alt },
      icon: "",
      // @ts-ignore
      closeButton: null,
      ui: {
        background: notifData.ui.background,
        title: notifData.ui.text,
        description: notifData.ui.text,
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
</script>

<template>
  <UNotifications :ui="{ wrapper: 'fixed flex flex-col justify-start z-[55] pointer-events-none' }" />
</template>
