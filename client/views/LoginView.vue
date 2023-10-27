<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
</script>

<template>
  <main class="column">
    <h1>Please login or register!</h1>
    <LoginForm />
    <RegisterForm />
  </main>
</template>

<style scoped>
.column {
  display: flex;
  min-height: 100vh;
  background: var(--darker-bg);
}

h1 {
  color: var(--font-color);
  text-align: center;
}
</style>
