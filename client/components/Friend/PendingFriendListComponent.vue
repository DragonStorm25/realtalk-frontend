<script setup lang="ts">
import FriendComponent from "./FriendComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername } = storeToRefs(useUserStore());

const loaded = ref(false);
let requests = ref();

async function getFriendRequests() {
  let requestResults;
  try {
    requestResults = await fetchy(`/api/friend/requests`, "GET");
  } catch (_) {
    return;
  }
  requests.value = requestResults;
}

onBeforeMount(async () => {
  await getFriendRequests();
  loaded.value = true;
});
</script>

<template>
  <div class="list-wrapper">
    <section class="request" v-if="loaded && requests.length !== 0">
      <article v-for="request in requests" :key="request._id">
        <FriendComponent v-if="request.from != currentUsername && request.status == `pending`" :username="request.from" />
      </article>
    </section>
    <p v-else-if="loaded">No pending friend requests</p>
    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
.list-wrapper {
  margin-top: 1em;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 65em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 65em;
}

p {
  background-color: var(--base-bg);
  border-radius: 1em;
  padding: 1em;
}
</style>
