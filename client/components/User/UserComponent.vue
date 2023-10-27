<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn, currentKarma } = storeToRefs(useUserStore());
</script>

<template>
  <div class="profile-wrapper">
    <div v-if="isLoggedIn" class="logged-in">
      <p class="username">{{ currentUsername }}</p>
      <p class="karma">{{ currentKarma > 0 ? "+" : currentKarma < 0 ? "-" : "" }}{{ Math.abs(currentKarma) }} realness</p>
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
  border-bottom-color: var(--underline-color);
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
