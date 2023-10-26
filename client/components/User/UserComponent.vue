<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn, currentKarma } = storeToRefs(useUserStore());

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

function printKarma() {
  console.log(currentKarma);
}

onBeforeMount(async () => {
  if (isLoggedIn.value) {
    // await getKarma();
  } else {
    karma.value = 0;
  }
  console.log(currentKarma.value);
});
</script>

<template>
  <div v-if="isLoggedIn" class="logged-in">
    <p class="username">{{ currentUsername }}</p>
    <p class="karma">{{ currentKarma > 0 ? "+" : currentKarma < 0 ? "-" : "" }}{{ currentKarma }} karma</p>
    <button @click="printKarma">Print Karma</button>
  </div>
  <div v-else>
    <p class="username logged-out">Not logged in!</p>
  </div>
</template>

<style scoped>
.username {
  font-weight: bold;
  font-size: 1.2em;
  border-bottom-style: solid;
  border-bottom-color: lightgray;
}

.logged-out {
  text-align: center;
}
</style>
