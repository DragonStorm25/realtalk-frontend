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

async function likePost() {
  try {
    await fetchy(`/api/posts/${props.post_id}/like`, "PATCH");
    await getLikes();
  } catch (_) {
    return;
  }
}

async function dislikePost() {
  try {
    await fetchy(`/api/posts/${props.post_id}/dislike`, "PATCH");
    await getLikes();
  } catch (_) {
    return;
  }
}

onBeforeMount(async () => {
  await getLikes();
});
</script>

<template>
  <div class="likes-box">
    <button class="pure-button" @click="likePost">Likes: {{ likes.likes }}</button>
    <button class="pure-button" @click="dislikePost">Dislikes: {{ likes.dislikes }}</button>
  </div>
</template>

<style scoped>
button {
  margin: 0em;
  margin-left: 1em;
}

.likes-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
