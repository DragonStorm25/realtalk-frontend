<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn, currentKarma } = storeToRefs(useUserStore());

const props = defineProps(["overrideUsername"]);
let override = ref(false);
let overrideKarma = ref(0);

async function getOverridenUserKarma() {
  let karmaRequest;
  try {
    karmaRequest = await fetchy(`/api/users/${props.overrideUsername}/karma`, "GET");
  } catch (_) {
    return;
  }
  overrideKarma.value = karmaRequest;
}

onBeforeMount(async () => {
  if (props.overrideUsername) {
    override.value = true;
    await getOverridenUserKarma();
  }
});
</script>

<template>
  <div class="profile-wrapper">
    <div v-if="!override">
      <div v-if="isLoggedIn" class="logged-in">
        <p class="username">{{ currentUsername }}</p>
        <p class="karma">{{ currentKarma > 0 ? "+" : currentKarma < 0 ? "-" : "" }}{{ Math.abs(currentKarma) }} realness</p>
      </div>
      <div v-else>
        <p class="username logged-out">Not logged in!</p>
      </div>
    </div>
    <div v-else>
      <p class="username">{{ props.overrideUsername }}</p>
      <p class="karma">{{ overrideKarma > 0 ? "+" : overrideKarma < 0 ? "-" : "" }}{{ Math.abs(overrideKarma) }} realness</p>
    </div>
  </div>
</template>

<style scoped>
.username {
  font-weight: bold;
  font-size: 1.2em;
  border-bottom-style: solid;
  border-bottom-color: var(--underline-color);
}

.profile-wrapper {
  background-color: var(--base-bg);
  border-radius: 1em;
  padding: 1em;
}

.logged-out {
  text-align: center;
}
</style>
