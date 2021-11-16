<template>
  <div
    class="circleSpin"
    :class="
      classNames({
        circleSpin_primary: props.type === 'primary',
        circleSpin_error: props.type === 'error',
        circleSpin_success: props.type === 'success',
        circleSpin_default: props.type === 'default' || !props.type,
      })
    "
  ></div>
</template>

<style lang="scss">
@keyframes circleSpinRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.circleSpin {
  width: 100%;
  height: 100%;
  min-width: 1rem;
  min-height: 1rem;
  border: 0.15rem solid;
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;
  transition: all 0.5s ease-in;
  animation-name: circleSpinRotate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background: transparent;

  & .circleSpin_primary {
    border-color: var(--primary);
  }
  & .circleSpin_error {
    border-color: var(--error);
  }
  & .circleSpin_success {
    border-color: var(--success);
  }
  & .circleSpin_default {
    border-color: var(--white);
  }
}
</style>

<script setup lang="ts">
import { defineExpose, defineProps } from "vue";
import classNames from "classnames";

interface ICircleSpin {
  type?: "primary" | "error" | "success" | "default";
}

const props = defineProps<ICircleSpin>();

defineExpose({ props, classNames });
</script>
