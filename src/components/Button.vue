<template>
  <div class="buttonContainer">
    <button
      class="buttonContainer_button"
      :class="
        classNames({
          buttonContainer_buttonDefault: type === 'default' || !type,
          buttonContainer_buttonPrimary: type === 'primary',
          buttonContainer_buttonError: type === 'error',
          buttonContainer_buttonSuccess: type === 'success',
          buttonContainer_buttonCircleBorder:
            circleBorder === undefined ? true : circleBorder,
          buttonContainer_buttonBorder: border,
        })
      "
      :disabled="disabled || loading"
      @click="onClick"
    >
      <div
        v-if="!loading"
        :class="classNames({
            buttonContainer_buttonIcon: (this as any).$slots.icon,
            buttonContainer_buttonIconRightSpace: (this as any).$slots.default,
      })"
      >
        <slot name="icon" />
      </div>
      <div
        v-else
        class="buttonContainer_buttonIcon"
        :class="classNames({
             buttonContainer_buttonIconRightSpace: (this as any).$slots.default,
      })"
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
      }
    }

    & .buttonContainer_buttonIconRightSpace {
      padding: 0 0.5rem 0 0;
    }
  }

  & .buttonContainer_buttonDefault {
    border: 1px solid var(--lightgray-2);
    color: var(--black);

    &:hover {
      border: 1px solid var(--primary);
      color: var(--primary);
    }
  }
  & .buttonContainer_buttonPrimary {
    background: var(--primary);
    color: var(--white);

    &:hover {
      opacity: 0.8;
    }
  }

  & .buttonContainer_buttonError {
    background: var(--error);
    color: var(--white);

    &:hover {
      opacity: 0.8;
    }
  }

  & .buttonContainer_buttonSuccess {
    background: var(--success);
    color: var(--white);

    &:hover {
      opacity: 0.8;
    }
  }

  & .buttonContainer_buttonCircleBorder {
    border-radius: 50%;
  }

  & .buttonContainer_buttonBorder {
    border: none !important;
  }
}
</style>

<script setup lang="ts">
import { defineProps } from "vue";
import classNames from "classnames";
import CircleSpin from "./CircleSpin.vue";

interface IButtonProps {
  type?: "primary" | "error" | "success" | "default";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  circleBorder?: boolean;
  border?: boolean;
}

defineProps<IButtonProps>();
</script>
