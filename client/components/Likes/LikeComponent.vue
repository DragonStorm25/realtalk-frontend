<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["post_id"]);
let likes = ref("");

async function getLikes() {
  let likeResults;
  try {
    likeResults = await fetchy(`/api/posts/${props.post_id}/likes`, "GET");
  } catch (_) {
    return;
  }
  likes.value = likeResults;
  console.log(likeResults);
}

onBeforeMount(async () => {
  await getLikes();
});
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
