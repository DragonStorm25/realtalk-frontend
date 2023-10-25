<script setup lang="ts">
import CreateCommentForm from "./CreateCommentForm.vue";
import EditCommentForm from "./EditCommentForm.vue";
import CommentComponent from "./CommentComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const props = defineProps(["target", "toggleOpen"]);

const loaded = ref(false);
let comments = ref<Array<Record<string, string>>>([]);
let editing = ref("");

async function getComments() {
  let commentResults;
  try {
    commentResults = await fetchy(`/api/posts/${props.target}/comments`, "GET");
  } catch (_) {
    return;
  }
  comments.value = commentResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getComments();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn && props.toggleOpen.value">
    <CreateCommentForm @refreshComments="getComments" :target="props.target" />
  </section>
  <section class="comments" v-if="loaded && comments.length !== 0">
    <article v-for="comment in comments" :key="comment._id">
      <CommentComponent v-if="editing !== comment._id" :comment="comment" @refreshComments="getComments" @editComment="updateEditing" />
      <EditCommentForm v-else :comment="comment" @refreshComments="getComments" @editComment="updateEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No comments found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 65em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 65em;
}
</style>
