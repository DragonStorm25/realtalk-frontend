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
    <div class="tooltip">
      <button class="pure-button" @click="likeTarget">{{ likes.likes }} &#128077;</button>
      <span class="tooltiptext">Like</span>
    </div>
    <div class="tooltip">
      <button class="pure-button" @click="dislikeTarget">{{ likes.dislikes }} &#128078;</button>
      <span class="tooltiptext">Dislike</span>
    </div>
  </div>
</template>

<style scoped>
button {
  margin: 0em;
  margin-right: 1em;
  background-color: var(--darker-bg);
  color: var(--font-color);
}

.likes-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
