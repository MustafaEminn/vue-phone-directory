<template>
  <router-view />
</template>

<style lang="scss">
@import "./styles/base/index.scss";
</style>

<script setup lang="ts">
import { users } from "./datas";

if (!localStorage.contacts) {
  localStorage.contacts = JSON.stringify(users);
}
</script>
