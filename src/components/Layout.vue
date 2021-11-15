<template>
  <div class="layoutContainer">
    <div class="layoutContainer_header">
      {{ props.header }}
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineExpose, defineComponent } from "vue";

defineComponent({
  name: "Layout",
});

interface IProps {
  header: string;
}
const props = defineProps<IProps>();

defineExpose({
  props,
});
</script>

<style lang="scss">
.layoutContainer {
  display: flex;
  flex-direction: column;
  max-width: 1396px;
  margin: 0 auto;

  & .layoutContainer_header {
    border: 2px solid gray;
    font-size: var(--h2);
  }
}
</style>
