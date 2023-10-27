<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["target_id", "target_type"]);
let trusts = ref({ trusts: 0, mistrusts: 0 });

async function getTrusts() {
  let trustResults;
  try {
    if (props.target_type == "post") {
      trustResults = await fetchy(`/api/posts/${props.target_id}/trusts`, "GET");
    } else if (props.target_type == "comment") {
      trustResults = await fetchy(`/api/comments/${props.target_id}/trusts`, "GET");
    }
  } catch (_) {
    return;
  }
  trusts.value = trustResults;
}

async function trustPost() {
  try {
    if (props.target_type == "post") {
      await fetchy(`/api/posts/${props.target_id}/trust`, "PATCH");
    } else if (props.target_type == "comment") {
      await fetchy(`/api/comments/${props.target_id}/trust`, "PATCH");
    }
    await getTrusts();
  } catch (_) {
    return;
  }
}

async function mistrustPost() {
  try {
    if (props.target_type == "post") {
      await fetchy(`/api/posts/${props.target_id}/mistrust`, "PATCH");
    } else if (props.target_type == "comment") {
      await fetchy(`/api/comments/${props.target_id}/mistrust`, "PATCH");
    }
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
    <div class="tooltip">
      <button class="pure-button" @click="trustPost">&#129309; {{ trusts.trusts }}</button>
      <span class="tooltiptext">Trust</span>
    </div>
    <div class="tooltip">
      <button class="pure-button" @click="mistrustPost">&#129317; {{ trusts.mistrusts }}</button>
      <span class="tooltiptext">Distrust</span>
    </div>
  </div>
</template>

<style scoped>
button {
  margin: 0em;
  margin-right: 1em;
  background-color: var(--darker-bg);
  color: var(--font-color);
}

.trusts-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
