<template>
  <div class="avatarContainer">
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
}
</style>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from "vue";

interface IAvatarProps {
  firstName: string;
  lastName: string;
}

const props = defineProps<IAvatarProps>();

const avatarText = ref<string>("");

onMounted(() => {
  avatarText.value = `${props.firstName.charAt(0)}${props.lastName.charAt(
    0
  )}`.toUpperCase();
});
</script>
