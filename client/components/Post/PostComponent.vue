<script setup lang="ts">
import LikeComponent from "../Likes/LikeComponent.vue";
import TrustComponent from "../Trusts/TrustComponent.vue";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";
import CommentListComponent from "../Comment/CommentListComponent.vue";
import CreateCommentToggle from "../Comment/CreateCommentToggle.vue";
import { ref } from "vue";

const props = defineProps(["post"]);
const emit = defineEmits(["editPost", "refreshPosts"]);
const { currentUsername } = storeToRefs(useUserStore());

let createComment = ref(false);

const deletePost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshPosts");
};

function toggleCommentCreate() {
  createComment.value = !createComment.value;
}
</script>

<template>
  <RouterLink @click="emit('refreshPosts', props.post.author)" :to="{ name: 'Profile', params: { username: props.post.author } }" class="author"> {{ props.post.author }} </RouterLink>
  <p class="content">{{ props.post.content }}</p>
  <article class="timestamp">
    <p v-if="props.post.dateCreated !== props.post.dateUpdated">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
    <p v-else>Created on: {{ formatDate(props.post.dateCreated) }}</p>
  </article>
  <div class="base upper-border">
    <div class="base">
      <TrustComponent :target_id="props.post._id" target_type="post" />
      <CreateCommentToggle @toggle-comment-create="toggleCommentCreate" />
      <div class="likes">
        <LikeComponent :target_id="props.post._id" target_type="post" />
      </div>
    </div>
    <menu v-if="props.post.author == currentUsername">
      <li><button class="btn-small pure-button" @click="emit('editPost', props.post._id)">Edit</button></li>
      <li><button class="button-error btn-small pure-button" @click="deletePost">Delete</button></li>
    </menu>
  </div>
  <div class="comments">
    <CommentListComponent :target="$props.post._id" :toggleOpen="createComment" @refreshPosts="(author) => emit('refreshPosts', author)" />
  </div>
</template>

<style scoped>
p {
  color: var(--font-color);
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
  border-bottom-style: solid;
  border-bottom-color: var(--underline-color);
}

.author:link {
  color: var(--font-color);
}

.author:visited {
  color: var(--font-color);
}

.author:hover {
  color: var(--underline-color);
}

.content {
  margin: 1em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upper-border {
  border-top-style: solid;
  border-top-color: var(--underline-color);
}

.base article:only-child {
  margin-left: auto;
}

.likes {
  float: right;
}
</style>
