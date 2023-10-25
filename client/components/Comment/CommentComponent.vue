<script setup lang="ts">
import { formatDate } from "@/utils/formatDate";

const props = defineProps(["comment"]);
</script>

<template>
  <div class="comment-box">
    <p class="author">Author: {{ props.comment.author }}</p>
    <p>Content: {{ props.comment.content }}</p>
    <div class="base">
      <article class="timestamp">
        <p v-if="props.comment.dateCreated !== props.comment.dateUpdated">Edited on: {{ formatDate(props.comment.dateUpdated) }}</p>
        <p v-else>Created on: {{ formatDate(props.comment.dateCreated) }}</p>
      </article>
    </div>
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
