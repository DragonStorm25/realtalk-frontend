<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["post_id"]);
let trusts = ref({ trusts: 0, mistrusts: 0 });

async function getTrusts() {
  let trustResults;
  try {
    trustResults = await fetchy(`/api/posts/${props.post_id}/trusts`, "GET");
  } catch (_) {
    return;
  }
  trusts.value = trustResults;
}

async function trustPost() {
  try {
    await fetchy(`/api/posts/${props.post_id}/trust`, "PATCH");
    await getTrusts();
  } catch (_) {
    return;
  }
}

async function mistrustPost() {
  try {
    await fetchy(`/api/posts/${props.post_id}/mistrust`, "PATCH");
    await getTrusts();
  } catch (_) {
    return;
  }
}

onBeforeMount(async () => {
  await getTrusts();
});
</script>

<template>
  <div class="trusts-box">
    <button class="pure-button" @click="trustPost">Trusts: {{ trusts.trusts }}</button>
    <button class="pure-button" @click="mistrustPost">Mistrusts: {{ trusts.mistrusts }}</button>
  </div>
</template>

<style scoped>
button {
  margin: 0em;
  margin-left: 1em;
}

.trusts-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
