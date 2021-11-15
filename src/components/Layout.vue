<template>
  <div class="layoutContainer">
    <div class="layoutContainer_header">
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.layoutContainer {
  display: flex;
  flex-direction: column;

  & .layoutContainer_header {
  }
}
</style>
