<template>
  <div class="headerBarContainer">
    <div class="headerBarContainer_backButton">
      <router-link v-show="showBackButton" to="/">
        <Button :without-border="true" :disabled="false">
          <template #icon>
            <LeftArrowIcon class="headerBarContainer_backButtonIcon"
          /></template>
        </Button>
      </router-link>
    </div>
    <div
      class="headerBarContainer_search"
      v-show="showSearchBar === undefined ? true : showSearchBar"
      :class="{
        headerBarContainer_searchLeftPadding: !showBackButton,
      }"
    >
      <TextInput
        name="search"
        placeholder="Search..."
        :full-width="true"
        :rounded="true"
        :on-change="onSearchChange"
      >
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
import { defineProps } from "vue";
import LeftArrowIcon from "./icons/LeftArrowIcon.vue";
import SearchIcon from "./icons/SearchIcon.vue";
// @ts-ignore
import Button from "./Button.vue";
// @ts-ignore
import TextInput from "./TextInput.vue";

interface IHeaderBarProps {
  showBackButton?: boolean;
  showSearchBar?: boolean;
  onSearchChange?: (e?: Event) => void;
}

const props = defineProps<IHeaderBarProps>();
</script>
