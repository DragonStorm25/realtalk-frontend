<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const { currentFriends } = storeToRefs(useUserStore());

const props = defineProps(["target_id"]);
let likes = ref({ likes: 0, dislikes: 0 });

let requested = ref(false);
async function checkFriend() {
  try {
    await fetchy(`/api/friends/requests/${props.target_id}`, "POST");
  } catch (_) {
    return;
  }
}

async function friendRequest() {
  try {
    await fetchy(`/api/friends/requests/${props.target_id}`, "POST");
  } catch (_) {
    return;
  }
}

async function cancelRequest() {
  try {
    await fetchy(`/api/friends/requests/${props.target_id}`, "DELETE");
  } catch (_) {
    return;
  }
}

async function unfriend() {
  try {
    await fetchy(`/api/friends/${props.target_id}`, "DELETE");
  } catch (_) {
    return;
  }
}

onBeforeMount(async () => {
  await getLikes();
});
</script>

<template>
  <div class="likes-box">
    <div class="tooltip">
      <button class="pure-button" @click="likeTarget">{{ likes.likes }} &#128077;</button>
      <span class="tooltiptext">Like</span>
    </div>
    <div class="tooltip">
      <button class="pure-button" @click="dislikeTarget">{{ likes.dislikes }} &#128078;</button>
      <span class="tooltiptext">Dislike</span>
    </div>
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

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: var(--darker-bg);
  color: var(--font-color);
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -70px;
  margin-bottom: 5px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
