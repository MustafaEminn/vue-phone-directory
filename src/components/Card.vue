<template>
  <div
    class="cardContainer"
    :class="
      classNames({
        cardContainerFullWidth: fullWidth,
      })
    "
  >
    <slot />
  </div>
</template>

<style lang="scss">
.cardContainer {
  width: min-content;
  box-shadow: var(--box-shadow-1);
  border: 2px solid var(--lightgray-3);
  padding: 0.75rem;
  border-radius: 4px;

  &.cardContainerFullWidth {
    width: 100%;
  }
}
</style>

<script lang="ts" setup>
import { defineProps } from "vue";
import classNames from "classnames";

interface ICardProps {
  fullWidth?: boolean;
}

defineProps<ICardProps>();
</script>
