<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["post_id"]);
let likes = ref({ likes: 0, dislikes: 0 });

async function getLikes() {
  let likeResults;
  try {
    likeResults = await fetchy(`/api/posts/${props.post_id}/likes`, "GET");
  } catch (_) {
    return;
  }
  likes.value = likeResults;
}

onBeforeMount(async () => {
  await getLikes();
});
</script>

<template>
  <p>Likes: {{ likes.likes }}</p>
  <p>Dislikes: {{ likes.dislikes }}</p>
</template>

<style scoped>
p {
  margin: 0em;
}
</style>
