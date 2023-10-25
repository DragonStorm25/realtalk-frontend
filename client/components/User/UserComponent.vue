<script setup lang="ts">
const props = defineProps(["user"]);
</script>

<template>
  <p class="username">{{ props.user.username }}</p>
</template>

<style scoped></style>
