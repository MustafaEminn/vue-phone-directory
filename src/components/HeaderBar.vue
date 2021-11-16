<template>
  <div class="headerBarContainer">
    <div class="headerBarContainer_backButton">
      <router-link v-show="showBackButton" to="/">
        <Button :circle-border="true" :border="false" :disabled="false">
          <template #icon>
            <LeftArrowIcon class="headerBarContainer_backButtonIcon"
          /></template>
        </Button>
      </router-link>
    </div>
    <div
      class="headerBarContainer_search"
      :class="
        classNames({
          headerBarContainer_searchLeftPadding: !showBackButton,
        })
      "
    >
      <TextInput placeholder="Search..." :full-width="true" :rounded="true">
        <template #icon>
          <SearchIcon class="headerBarContainer_searchIcon"
        /></template>
      </TextInput>
    </div>
  </div>
</template>

<style lang="scss">
.headerBarContainer {
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 0.6rem;

  & .headerBarContainer_backButton {
    & .headerBarContainer_backButtonIcon {
      width: 1.5rem;
    }
  }

  & .headerBarContainer_search {
    width: 100%;
    padding: 0 1rem 0 0;

    &.headerBarContainer_searchLeftPadding {
      padding-left: 1rem;
    }
    & .headerBarContainer_searchIcon {
      width: 1.2rem;
    }
  }
}
</style>

<script setup lang="ts">
import { defineProps, defineExpose } from "vue";
import classNames from "classnames";
import LeftArrowIcon from "./icons/LeftArrowIcon.vue";
import SearchIcon from "./icons/SearchIcon.vue";
import Button from "./Button.vue";
import TextInput from "./TextInput.vue";

interface IHeaderBarProps {
  showBackButton?: boolean;
}

const props = defineProps<IHeaderBarProps>();

defineExpose({
  props,
  classNames,
});
</script>
