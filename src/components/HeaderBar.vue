<template>
  <div class="headerBarContainer">
    <div class="headerBarContainer_backButton">
      <router-link to="/">
        <Button type="success" :disabled="false">
          <template #icon>
            <LeftArrow class="headerBarContainer_backButtonIcon"
          /></template>
        </Button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.headerBarContainer {
  display: flex;

  & .headerBarContainer_backButton {
    & .headerBarContainer_backButtonIcon {
    }
  }
}
</style>

<script setup lang="ts">
import LeftArrow from "./icons/LeftArrow.vue";
import Button from "./Button.vue";
</script>
