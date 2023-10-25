<script setup lang="ts">
const props = defineProps(["username, loggedIn"]);
</script>

<template>
  <p class="username">{{ props.username }}</p>
</template>

<style scoped></style>
