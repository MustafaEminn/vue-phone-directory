<template>
  <router-view />
  <button
    :class="{ dark: theme === 'dark' }"
    @click="onToggleTheme"
    class="lightDarkButtonContainer"
  >
    {{ theme === "dark" ? "🌞" : "🌛" }}
  </button>
</template>

<style lang="scss">
@import "./styles/index.scss";

.lightDarkButtonContainer {
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: 50px;
  width: 50px;
  font-size: 26px;
  background: var(--black);
  border-radius: 50%;
}
</style>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { users } from "./datas";

if (!localStorage.contacts) {
  localStorage.contacts = JSON.stringify(users);
}

const theme = ref<"light" | "dark">("light");
const onToggleTheme = () => {
  document.body.classList.toggle("dark");
  if (theme.value === "dark") {
    return (theme.value = "light");
  }
  return (theme.value = "dark");
};
</script>
