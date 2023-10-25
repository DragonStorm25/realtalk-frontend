<script setup lang="ts">
const props = defineProps(["comment"]);
</script>

<template>
  <div class="comment-box">
    <p class="author">Author: {{ props.comment.author }}</p>
    <p>Content: {{ props.comment.content }}</p>
    <div class="base"></div>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
