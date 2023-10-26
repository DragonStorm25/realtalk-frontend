<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import UserComponent from "@/components/User/UserComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <div class="split left">
      <PostListComponent />
    </div>
    <div class="split right">
      <UserComponent :username="currentUsername" :loggedIn="isLoggedIn" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
}

h1 {
  text-align: center;
}

/* Split the screen in half */
.split {
  height: 100%;
  padding-left: 10px;
  float: left;
  background: var(--darker-bg);
}

/* Control the left side */
.left {
  width: 75%;
}

/* Control the right side */
.middle {
  width: 50%;
}

.right {
  flex-grow: 1;
  padding: 1em;
}
</style>
