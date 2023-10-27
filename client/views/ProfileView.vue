<script setup lang="ts">
import { fetchy } from "../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["username"]);

let karma = ref(0);

async function getKarma() {
  let karmaResults;
  try {
    karmaResults = await fetchy(`/api/users/${props.username}/karma`, "GET");
  } catch (_) {
    return;
  }
  karma.value = karmaResults;
}
</script>

<template>
  <div class="profile-wrapper">
    <div v-if="isLoggedIn" class="logged-in">
      <p class="username">{{ currentUsername }}</p>
      <p class="karma">{{ currentKarma > 0 ? "+" : currentKarma < 0 ? "-" : "" }}{{ currentKarma }} realness</p>
    </div>
    <div v-else>
      <p class="username logged-out">Not logged in!</p>
    </div>
  </div>
</template>

<style scoped>
.username {
  font-weight: bold;
  font-size: 1.2em;
  border-bottom-style: solid;
  border-bottom-color: lightgray;
}

.profile-wrapper {
  background-color: var(--base-bg);
  border-radius: 1em;
  padding: 1em;
}

.logged-out {
  text-align: center;
}
</style>
