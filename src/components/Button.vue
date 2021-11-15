<template>
  <div class="buttonContainer">
    <button
      class="buttonContainer_button"
      :class="
        classNames({
          buttonContainer_buttonDefault:
            props.type === 'default' || !props.type,
          buttonContainer_buttonPrimary: props.type === 'primary',
          buttonContainer_buttonError: props.type === 'error',
          buttonContainer_buttonSuccess: props.type === 'success',
        })
      "
      :disabled="props.disabled"
    >
      <div
        :class="classNames({
            buttonContainer_buttonIcon: (this as any).$slots.icon,
            buttonContainer_buttonIconRightSpace: (this as any).$slots.default,
      })"
      >
        <slot name="icon" />
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
      & svg {
        padding: 0 0.5rem 0 0;
      }
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
}
</style>

<script setup lang="ts">
import { defineProps, defineExpose } from "vue";
import classNames from "classnames";

interface IButtonProps {
  type?: "primary" | "error" | "success" | "default";
  loading?: boolean;
  disabled?: boolean;
}

const props = defineProps<IButtonProps>();

defineExpose({ props, classNames });
</script>
