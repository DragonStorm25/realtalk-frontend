<script setup lang="ts">
const props = defineProps(["likes", "dislikes"]);
</script>

<template>
  <p>Likes: {{ props.likes }}</p>
  <p>Dislikes: {{ props.dislikes }}</p>
</template>

<style scoped></style>
