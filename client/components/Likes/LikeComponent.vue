<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["target_id", "target_type"]);
let likes = ref({ likes: 0, dislikes: 0 });

async function getLikes() {
  let likeResults;
  try {
    if (props.target_type == "post") {
      likeResults = await fetchy(`/api/posts/${props.target_id}/likes`, "GET");
    } else if (props.target_type == "comment") {
      likeResults = await fetchy(`/api/comments/${props.target_id}/likes`, "GET");
    }
  } catch (_) {
    return;
  }
  likes.value = likeResults;
}

async function likeTarget() {
  try {
    if (props.target_type == "post") {
      await fetchy(`/api/posts/${props.target_id}/like`, "PATCH");
    } else if (props.target_type == "comment") {
      await fetchy(`/api/comments/${props.target_id}/like`, "PATCH");
    }
    await getLikes();
  } catch (_) {
    return;
  }
}

async function dislikeTarget() {
  try {
    if (props.target_type == "post") {
      await fetchy(`/api/posts/${props.target_id}/dislike`, "PATCH");
    } else if (props.target_type == "comment") {
      await fetchy(`/api/comments/${props.target_id}/dislike`, "PATCH");
    }
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
    <button class="pure-button" @click="likeTarget">Likes: {{ likes.likes }}</button>
    <button class="pure-button" @click="dislikeTarget">Dislikes: {{ likes.dislikes }}</button>
  </div>
</template>

<style scoped>
button {
  margin: 0em;
  margin-right: 1em;
}

.likes-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
