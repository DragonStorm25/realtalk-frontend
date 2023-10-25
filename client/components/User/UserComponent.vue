<script setup lang="ts">
const props = defineProps(["user, loggedIn"]);
</script>

<template>
  <p class="username">{{ props.user.username }}</p>
</template>

<style scoped></style>
