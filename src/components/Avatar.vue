<template>
  <div
    class="avatarContainer"
    :class="{
      avatarContainerLarge: size === 'large',
    }"
  >
    <div class="avatarContainer_firstLetter">
      {{ avatarText[0] }}
    </div>
    <div class="avatarContainer_secondLetter">
      {{ avatarText[1] }}
    </div>
  </div>
</template>

<style lang="scss">
.avatarContainer {
  background: var(--dark-green);
  height: 3rem;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  border-radius: 9999px;

  & .avatarContainer_firstLetter {
    font-size: var(--h5);
  }
  & .avatarContainer_secondLetter {
    font-size: var(--h5);
  }

  &.avatarContainerLarge {
    height: 5rem;
    width: 5rem;
    & .avatarContainer_firstLetter {
      font-size: var(--h4);
    }
    & .avatarContainer_secondLetter {
      font-size: var(--h4);
    }
  }
}
</style>

<script lang="ts" setup>
import { defineProps, onBeforeMount, ref, watchEffect } from "vue";

interface IAvatarProps {
  firstName: string;
  lastName: string;
  size?: "default" | "large";
}

const props = defineProps<IAvatarProps>();

const avatarText = ref<string>("");

onBeforeMount(() => {
  avatarText.value = `${props.firstName.charAt(0)}${props.lastName.charAt(
    0
  )}`.toUpperCase();
});

watchEffect(() => {
  avatarText.value = `${props.firstName.charAt(0)}${props.lastName.charAt(
    0
  )}`.toUpperCase();
});
</script>
