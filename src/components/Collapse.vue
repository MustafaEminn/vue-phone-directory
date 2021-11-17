<template>
  <div class="collapseContainer">
    <button class="collapseContainer_button" @click="toggleCollapse()">
      <div class="collapseContainer_buttonHeader">
        <div class="collapseContainer_buttonHeader_title">
          {{ title }}
        </div>

        <UpArrowIcon
          v-if="isCollapsed"
          class="collapseContainer_buttonHeader_icon"
        />
        <DownArrowIcon v-else class="collapseContainer_buttonHeader_icon" />
      </div>
    </button>

    <div
      class="collapseContainer_content"
      :class="
        classNames({
          collapseContainer_contentHide: !isCollapsed,
        })
      "
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.collapseContainer {
  display: flex;
  flex-direction: column;
  width: 100%;

  overflow: hidden;

  & .collapseContainer_button {
    padding: 0;
    width: 100%;
    z-index: 2;

    & .collapseContainer_buttonHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.8rem;
      font-size: var(--h6);
      background: var(--lightgray);
      width: 100%;

      & .collapseContainer_buttonHeader_icon {
        margin-right: 0.7rem;
        width: 1rem;
      }
    }
  }

  & .collapseContainer_content {
    width: 100%;
    box-shadow: var(--box-shadow-1);
    padding: 1rem;
    border: 1px solid var(--lightgray-3);
    transition: all 0.2s;
    max-height: 500px;
    overflow-y: auto;
    &.collapseContainer_contentHide {
      padding: 0 1rem;
      max-height: 0;
    }
  }
}
</style>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import classNames from "classnames";
import UpArrowIcon from "./icons/UpArrowIcon.vue";
import DownArrowIcon from "./icons/DownArrowIcon.vue";

const isCollapsed = ref(true);

interface ICollapseProps {
  title: string;
}

const props = defineProps<ICollapseProps>();

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>
