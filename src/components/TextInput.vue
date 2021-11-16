<template>
  <div
    class="textInputContainer"
    :class="
      classNames({
        textInputContainer_directionH: direction === 'horizontal',
        textInputContainer_directionV: direction === 'vertical',
        textInputContainer_fullWidth: fullWidth,
      })
    "
  >
    <label class="textInputContainer_label" v-if="label">{{ label }}</label>
    <div
      class="textInputContainer_subContainer"
      :class="
        classNames({
          textInputContainer_subContainerFullWidth: fullWidth,
        })
      "
    >
      <div
        class="textInputContainer_subContainer_icon"
        :class="
          classNames({
            textInputContainer_subContainer_iconFocus: isInputFocused,
          })
        "
        v-show="(this as any).$slots.icon"
      >
        <slot name="icon" />
      </div>

      <input
        class="textInputContainer_subContainer_input"
        :class="
          classNames({
            textInputContainer_subContainer_inputFullWidth: fullWidth,
            textInputContainer_subContainer_inputRounded: rounded,
            textInputContainer_subContainer_inputHasIcon: (this as any).$slots.icon,
          })
        "
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        @change="onChange"
        @focus="inputFocusToggle()"
        @blur="inputFocusToggle()"
      />
    </div>
  </div>
</template>

<style lang="scss">
.textInputContainer {
  display: flex;

  &.textInputContainer_fullWidth,
  & .textInputContainer_subContainerFullWidth,
  & .textInputContainer_subContainer_inputFullWidth {
    width: 100% !important;
  }

  &.textInputContainer_directionH {
    flex-direction: row;
    & .textInputContainer_label {
      margin-right: 10px;
    }
  }
  &.textInputContainer_directionV {
    flex-direction: column;

    & .textInputContainer_label {
      margin-bottom: 10px;
    }
  }

  & .textInputContainer_label {
    font-size: var(--span);
  }

  & .textInputContainer_subContainer {
    display: flex;
    align-items: center;
    position: relative;
    & .textInputContainer_subContainer_input {
      border: 2px solid var(--lightgray-3);
      height: 1.875rem;
      padding: 0 0.4rem;
      font-size: var(--span);
      width: 12.5rem;
      border-radius: 3px;
      transition: border-color 0.1s ease-in-out;

      &:focus {
        border-color: var(--primary);
      }

      &.textInputContainer_subContainer_inputRounded {
        border-radius: 3rem;
      }
    }

    & .textInputContainer_subContainer_inputHasIcon {
      padding-left: 2rem;
    }

    & .textInputContainer_subContainer_icon {
      position: absolute;
      width: 1.2rem;
      padding-left: 0.5rem;

      & path {
        fill: var(--lightgray-3);
      }

      &.textInputContainer_subContainer_iconFocus {
        & path {
          fill: var(--primary);
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { defineProps, defineExpose, ref } from "vue";
import classNames from "classnames";

const isInputFocused = ref<boolean>(false);

const inputFocusToggle = (): void => {
  isInputFocused.value = !isInputFocused.value;
};

interface ITextInputProps {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (event?: Event) => void;
  direction?: "vertical" | "horizontal";
  fullWidth?: boolean;
  rounded?: boolean;
}
const props = defineProps<ITextInputProps>();

defineExpose({
  props,
  classNames,
  isInputFocused,
  inputFocusToggle,
});
</script>
