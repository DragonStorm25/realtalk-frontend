<script setup lang="ts">
import LikeComponent from "../Likes/LikeComponent.vue";
import TrustComponent from "../Trusts/TrustComponent.vue";
import { formatDate } from "@/utils/formatDate";

const props = defineProps(["comment"]);
</script>

<template>
  <div class="comment-box">
    <p class="author">{{ props.comment.author }}</p>
    <p>{{ props.comment.content }}</p>
    <div class="base">
      <div class="base">
        <LikeComponent :target_id="props.comment._id" target_type="comment" />
        <TrustComponent :target_id="props.comment._id" target_type="comment" />
      </div>
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

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
