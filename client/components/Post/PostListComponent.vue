<script setup lang="ts">
import CreatePostForm from "@/components/Post/CreatePostForm.vue";
import EditPostForm from "@/components/Post/EditPostForm.vue";
import PostComponent from "@/components/Post/PostComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import SearchPostForm from "./SearchPostForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const props = defineProps(["isFullView", "startingFilter"]);

const loaded = ref(false);
let posts = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchAuthor = ref("");

async function getPosts(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let postResults;
  try {
    postResults = await fetchy("/api/posts", "GET", { query });
  } catch (_) {
    return;
  }
  searchAuthor.value = author ? author : "";
  posts.value = postResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  if (props.startingFilter) {
    await getPosts(props.startingFilter);
  } else {
    await getPosts();
  }
  loaded.value = true;
});
</script>

<template>
  <div class="scroll">
    <section v-if="isLoggedIn && props.isFullView">
      <h2>Create a post:</h2>
      <CreatePostForm @refreshPosts="getPosts" />
    </section>
    <div class="row" v-if="props.isFullView">
      <h2 v-if="!searchAuthor">Posts</h2>
      <h2 v-else>Posts by {{ searchAuthor }}</h2>
      <SearchPostForm @getPostsByAuthor="getPosts" />
    </div>
    <section class="posts" v-if="loaded && posts.length !== 0">
      <article v-for="post in posts" :key="post._id">
        <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
        <EditPostForm v-else :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
      </article>
    </section>
    <p v-else-if="loaded">No posts found</p>
    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

h2 {
  color: var(--font-color);
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 70em;
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

.scroll {
  height: 90%;
  overflow-y: auto;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 3em;
  max-width: 70em;
}
</style>
