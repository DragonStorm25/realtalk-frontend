<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <div class="split left">
      <h1>Home Page</h1>
      <section>
        <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
        <h1 v-else>Please login!</h1>
      </section>
    </div>
    <div class="split middle">
      <PostListComponent />
    </div>
    <div class="split right">
      <p>Test</p>
    </div>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}

/* Split the screen in half */
.split {
  height: 100%;
  float: left;
}

/* Control the left side */
.left {
  width: 30%;
  left: 0;
}

/* Control the right side */
.middle {
  width: 50%;
}

.right {
  width: 20%;
  right: 0;
}
</style>
