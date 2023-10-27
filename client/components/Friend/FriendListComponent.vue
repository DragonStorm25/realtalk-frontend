<script setup lang="ts">
import FriendComponent from "./FriendComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["username"]);

const loaded = ref(false);
let friends = ref();

async function getFriends() {
  let friendResults;
  try {
    friendResults = await fetchy(`/api/friends`, "GET");
  } catch (_) {
    return;
  }
  friends.value = friendResults;
}

onBeforeMount(async () => {
  await getFriends();
  loaded.value = true;
});
</script>

<template>
  <div class="list-wrapper">
    <section class="friends" v-if="loaded && friends.length !== 0">
      <article v-for="friend in friends" :key="friend._id">
        <FriendComponent />
      </article>
    </section>
    <p v-else-if="loaded">No friends</p>
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
