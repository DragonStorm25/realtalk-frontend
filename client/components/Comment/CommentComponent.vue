<script setup lang="ts">
const props = defineProps(["comment"]);
</script>

<template>
  <div class="comment-box">
    <p class="author">{{ props.comment.author }}</p>
    <p>{{ props.comment.context }}</p>
  </div>
</template>

<style scoped>
button {
  margin: 0em;
  margin-left: 1em;
}
</style>
