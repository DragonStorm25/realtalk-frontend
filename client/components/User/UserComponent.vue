<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <div v-if="isLoggedIn" class="logged-in">
    <p class="username">{{ currentUsername }}</p>
  </div>
  <div v-else>
    <p>Not logged in!</p>
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
