<script setup lang="ts">
import LikeComponent from "../Likes/LikeComponent.vue";
import TrustComponent from "../Trusts/TrustComponent.vue";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["comment"]);
const emit = defineEmits(["editComment", "refreshComments", "refreshPosts"]);

const { currentUsername } = storeToRefs(useUserStore());

const deleteComment = async () => {
  try {
    await fetchy(`/api/comments/${props.comment._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshComments");
};
</script>

<template>
  <div class="comment-box">
    <RouterLink @click="emit('refreshPosts', props.comment.author)" :to="{ name: 'Profile', params: { username: props.comment.author } }" class="author"> {{ props.comment.author }} </RouterLink>
    <p class="content">{{ props.comment.content }}</p>
    <article class="timestamp">
      <p v-if="props.comment.dateCreated !== props.comment.dateUpdated">Edited on: {{ formatDate(props.comment.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.comment.dateCreated) }}</p>
    </article>
    <div class="base upper-border">
      <div class="base">
        <TrustComponent :target_id="props.comment._id" target_type="comment" />
        <div class="likes">
          <LikeComponent :target_id="props.comment._id" target_type="comment" />
        </div>
      </div>
      <menu v-if="props.comment.author == currentUsername">
        <li><button class="btn-small pure-button" @click="emit('editComment', props.comment._id)">Edit</button></li>
        <li><button class="button-error btn-small pure-button" @click="deleteComment">Delete</button></li>
      </menu>
    </div>
  </div>
</template>

<style scoped>
p {
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
