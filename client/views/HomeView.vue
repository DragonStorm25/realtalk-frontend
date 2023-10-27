<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import UserComponent from "@/components/User/UserComponent.vue";
import FriendListComponent from "@/components/Friend/FriendListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <div class="split-wrapper">
      <div class="split left">
        <PostListComponent :isFullView="true" />
      </div>
      <div class="split right">
        <UserComponent :username="currentUsername" :loggedIn="isLoggedIn" />
        <FriendListComponent />
      </div>
    </div>
  </main>
</template>

<style scoped>
.split-wrapper {
  display: flex;
  min-height: 100vh;
}

h1 {
  text-align: center;
}

/* Split the screen in half */
.split {
  padding: 1em;
  float: left;
  background: var(--darker-bg);
}

/* Control the left side */
.left {
  height: 100%;
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
