<script setup lang="ts">
const props = defineProps(["username"]);
</script>

<template>
  <div class="friend-wrapper">
    <p class="username">{{ props.username }}</p>
  </div>
</template>

<style scoped>
.username {
  font-weight: bold;
  font-size: 1.2em;
  border-bottom-style: solid;
  border-bottom-color: var(--underline-color);
}

.friend-wrapper {
  background-color: var(--base-bg);
  border-radius: 1em;
}
</style>
