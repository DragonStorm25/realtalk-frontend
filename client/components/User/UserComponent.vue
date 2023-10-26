<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn, currentKarma } = storeToRefs(useUserStore());
</script>

<template>
  <div v-if="isLoggedIn" class="logged-in">
    <p class="username">{{ currentUsername }}</p>
    <p class="karma">{{ currentKarma }} karma</p>
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
