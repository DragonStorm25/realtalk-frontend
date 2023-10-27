<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const { currentFriends } = storeToRefs(useUserStore());

const props = defineProps(["target"]);
let likes = ref({ likes: 0, dislikes: 0 });

let requested = ref(false);

async function checkFriend() {
  return currentFriends.value.includes(props.target);
}

async function friendRequest() {
  try {
    await fetchy(`/api/friends/requests/${props.target}`, "POST");
  } catch (_) {
    return;
  }
}

async function cancelRequest() {
  try {
    await fetchy(`/api/friends/requests/${props.target}`, "DELETE");
  } catch (_) {
    return;
  }
}

async function unfriend() {
  try {
    await fetchy(`/api/friends/${props.target}`, "DELETE");
  } catch (_) {
    return;
  }
}
</script>

<template>
  <div class="likes-box">
    <button class="pure-button" @click="friendRequest">Friend</button>
    <button class="pure-button" @click="dislikeTarget">{{ likes.dislikes }} &#128078;</button>
  </div>
</template>

<style scoped>
button {
  margin: 0em;
  margin-right: 1em;
  background-color: var(--darker-bg);
  color: var(--font-color);
}

.likes-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
