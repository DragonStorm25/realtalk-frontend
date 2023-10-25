<script setup lang="ts">
import { ref } from "vue";

let open = ref(false);
const emit = defineEmits(["toggleCommentCreate"]);

function toggleOpen() {
  open.value = !open.value;
  emit("toggleCommentCreate");
}
</script>

<template>
  <button class="pure-button" @click="toggleOpen">Comment</button>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
