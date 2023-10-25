<script setup lang="ts">
import CreateCommentForm from "./CreateCommentForm.vue";
import EditPostForm from "@/components/Post/EditPostForm.vue";
import CommentComponent from "./CommentComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import SearchPostForm from "./SearchPostForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let comments = ref<Array<Record<string, string>>>([]);
let editing = ref("");

async function getComments(target?: string) {
  let commentResults;
  try {
    commentResults = await fetchy(`/api/posts/${target}/comments`, "GET");
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
  <section v-if="isLoggedIn">
    <h2>Create a post:</h2>
    <CreateCommentForm @refreshComments="getComments" />
  </section>
  <section class="posts" v-if="loaded && comments.length !== 0">
    <article v-for="post in comments" :key="post._id">
      <CommentComponent v-if="editing !== post._id" :post="post" @refreshPosts="getComments" @editPost="updateEditing" />
      <EditPostForm v-else :post="post" @refreshPosts="getComments" @editPost="updateEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No posts found</p>
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
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
