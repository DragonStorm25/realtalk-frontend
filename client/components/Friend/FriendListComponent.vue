<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import UserComponent from "../User/UserComponent.vue";
import FriendOptionComponent from "../Friend/FriendOptionComponent.vue";

const props = defineProps(["username", "friends"]);

const loaded = ref(false);

onBeforeMount(async () => {
  loaded.value = true;
});
</script>

<template>
  <div class="list-wrapper">
    <section class="friends" v-if="loaded && friends.length !== 0">
      <p>Friends</p>
      <article v-for="friend in friends" :key="friend._id">
        <UserComponent :overrideUsername="friend" />
        <FriendOptionComponent :from="props.username" :to="friend" />
      </article>
    </section>
    <p v-else-if="loaded">No friends</p>
    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
.list-wrapper {
  margin-top: 1em;
}

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

section {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0em;
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 65em;
}

p {
  background-color: var(--base-bg);
  border-radius: 1em;
  padding: 1em;
}
</style>
