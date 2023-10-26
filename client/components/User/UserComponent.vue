<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

let karma = ref(0);

async function getKarma() {
  let karmaResults;
  try {
    karmaResults = await fetchy(`/api/users/${currentUsername.value}/karma`, "GET");
  } catch (_) {
    return;
  }
  karma.value = karmaResults;
}

onBeforeMount(async () => {
  await getKarma();
});
</script>

<template>
  <div v-if="isLoggedIn" class="logged-in">
    <p class="username">{{ currentUsername }}</p>
    <p class="karma">{{ karma > 0 ? "+" : "-" }}{{ karma }} karma</p>
  </div>
  <div v-else>
    <p class="username">Not logged in!</p>
  </div>
</template>

<style scoped>
.username {
  font-weight: bold;
  font-size: 1.2em;
  border-bottom-style: solid;
  border-bottom-color: lightgray;
}
</style>
