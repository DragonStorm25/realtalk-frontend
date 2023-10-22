<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post_id"]);

async function getLikes() {
  let likeResults;
  try {
    likeResults = await fetchy(`/api/posts/${props.post_id}/likes`, "GET");
  } catch (_) {
    return;
  }
}
</script>

<template>
  <p>Likes:</p>
  <p>Dislikes:</p>
</template>

<style scoped>
p {
  margin: 0em;
}
</style>
