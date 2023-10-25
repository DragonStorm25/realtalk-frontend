<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["comment_id"]);
let comment = ref();

async function getComment() {
  let commentResult;
  try {
    commentResult = await fetchy(`/api/comments/${props.comment_id}`, "GET");
  } catch (_) {
    return;
  }
  comment.value = commentResult;
}

onBeforeMount(async () => {
  await getComment();
});
</script>

<template>
  <div class="comment-box">
    <p>Test text</p>
  </div>
</template>

<style scoped>
button {
  margin: 0em;
  margin-left: 1em;
}
</style>
