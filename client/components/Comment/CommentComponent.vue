<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["post_id"]);
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
