<template>
  <div class="buttonContainer">
    <button
      class="buttonContainer_button"
      :class="{
        buttonContainer_buttonDefault: type === 'default' || !type,
        buttonContainer_buttonPrimary: type === 'primary',
        buttonContainer_buttonError: type === 'error',
        buttonContainer_buttonSuccess: type === 'success',
        buttonContainer_buttonCircleBorder: circleBorder,
        buttonContainer_buttonNoBorder: withoutBorder,
      }"
      :type="htmlType"
      :disabled="disabled || loading"
      @click="onClick"
    >
      <div
        v-if="!loading"
        :class="{
          buttonContainer_buttonIcon: slots.icon,
          buttonContainer_buttonIconRightSpace: slots.default && slots.icon,
        }"
      >
        <slot name="icon" />
      </div>
      <div
        v-else
        class="buttonContainer_buttonIcon"
        :class="{
          buttonContainer_buttonIconRightSpace: slots.default,
        }"
      >
        <circle-spin
          :type="type === 'default' || !type ? 'primary' : 'default'"
        />
      </div>
      <slot />
    </button>
  </div>
</template>

<style lang="scss">
.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s ease-in-out;

  & .buttonContainer_button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--span);
    border-radius: 5px;
    padding: 0.7rem;
    box-shadow: var(--box-shadow-1);
    transition: all 0.1s ease-in-out;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        opacity: 0.5;
      }
    }

    & .buttonContainer_buttonIcon {
      display: flex;
      align-content: center;

      & svg {
        width: 0.7rem;

        & path {
          fill: white;
        }
      }
    }

    & .buttonContainer_buttonIconRightSpace {
      padding: 0 0.5rem 0 0;
    }
  }

  & .buttonContainer_buttonDefault {
    border: 1px solid var(--lightgray-2);

    & svg path {
      fill: var(--black) !important;
    }

    &:hover {
      border: 1px solid var(--primary);
      & svg path {
        fill: var(--primary) !important;
      }
    }
  }
  & .buttonContainer_buttonPrimary {
    background: var(--primary);
    color: white;

    &:hover {
      opacity: 0.8;
    }
  }

  & .buttonContainer_buttonError {
    background: var(--error);
    color: white;

    &:hover {
      opacity: 0.8;
    }
  }

  & .buttonContainer_buttonSuccess {
    background: var(--success);
    color: white;

    &:hover {
      opacity: 0.8;
    }
  }

  & .buttonContainer_buttonCircleBorder {
    border-radius: 50%;
  }

  & .buttonContainer_buttonNoBorder {
    border: none !important;
  }
}
</style>

<script setup lang="ts">
import { defineProps, useSlots } from "vue";
// @ts-ignore
import CircleSpin from "./CircleSpin.vue";

interface IButtonProps {
  type?: "primary" | "error" | "success" | "default";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  circleBorder?: boolean;
  withoutBorder?: boolean;
  htmlType?: "button" | "submit" | "reset";
}

const slots = useSlots();

defineProps<IButtonProps>();
</script>
