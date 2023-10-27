<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const { currentFriends } = storeToRefs(useUserStore());

const props = defineProps(["target", "outgoing"]);

let requested = ref(false);
let isFriend = ref(false);

async function checkFriend() {
  return currentFriends.value.includes(props.target);
}

async function friendRequest() {
  try {
    await fetchy(`/api/friend/requests/${props.target}`, "POST");
    requested.value = true;
  } catch (_) {
    return;
  }
}

async function cancelRequest() {
  try {
    await fetchy(`/api/friend/requests/${props.target}`, "DELETE");
    requested.value = false;
  } catch (_) {
    return;
  }
}

async function unfriend() {
  try {
    await fetchy(`/api/friend/${props.target}`, "DELETE");
  } catch (_) {
    return;
  }
}

onBeforeMount(async () => {
  isFriend.value = await checkFriend();
});
</script>

<template>
  <div class="friend-box">
    <div v-if="!isFriend && props.outgoing" class="send-request">
      <button v-if="!requested" class="pure-button" @click="friendRequest">Send Friend Request</button>
      <button v-else class="pure-button" @click="cancelRequest">Cancel Request</button>
    </div>
    <div v-else class="recieve-request">
      <button class="pure-button">Accept Friend Request</button>
      <button class="pure-button">Reject Friend Request</button>
    </div>
    <button v-if="isFriend" class="pure-button" @click="unfriend">Unfriend</button>
  </div>
</template>

<style scoped>
button {
  margin: 0em;
  margin-right: 1em;
  background-color: var(--darker-bg);
  color: var(--font-color);
}

.friend-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
