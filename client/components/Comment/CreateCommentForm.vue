<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["target"]);

const content = ref("");
const emit = defineEmits(["refreshComments"]);

const createComment = async (target: string, content: string) => {
  try {
    await fetchy("/api/comments", "POST", {
      body: { content, target },
    });
  } catch (_) {
    return;
  }
  emit("refreshComments");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createComment(props.target, content)">
    <textarea id="content" v-model="content" placeholder="Comment something..." required> </textarea>
    <button type="submit" class="pure-button-primary pure-button submit">Create Comment</button>
  </form>
</template>

<style scoped>
form {
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  color: var(--font-color);
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
  background-color: var(--darker-bg);
  color: var(--font-color);
  border-color: var(--border-color);
}
</style>
