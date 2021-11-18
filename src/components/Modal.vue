<template>
  <div class="modalBG" v-show="visible">
    <div ref="modalContainerEl" class="modalContainer">
      <div class="modalContainer_header">
        <div class="modalContainer_headerTitle">
          {{ title }}
        </div>
        <div class="modalContainer_headerClose">
          <button @click="onModalClose">
            <CloseIcon />
          </button>
        </div>
      </div>
      <div class="modalContainer_body">
        <slot />
      </div>
      <div v-show="(this as any).$slots.footer" class="modalContainer_footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modalBG {
  background: var(--black-opacity);
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modalContainer {
  background: var(--white);
  transition: all 0.2s;
  transform: scale(1);
  min-width: 50vw;
  min-height: 50vh;
  border-radius: 5px;
  max-width: 95vw;
  max-height: 95vh;
  &.modalContainer_hide {
    background: pink;
    transform: scale(0);
  }

  & .modalContainer_header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem;
    border-bottom: 2px solid var(--lightgray-3);

    & .modalContainer_headerTitle {
      flex: 1;
      font-size: var(--h6);
      padding-left: 0.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & .modalContainer_headerClose {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      padding: 0.4rem;

      & svg {
        fill: var(--black);
        width: 0.8rem;
      }
    }
  }

  & .modalContainer_body {
    padding: 0.8rem;
    overflow: auto;
  }

  & .modalContainer_footer {
    border-top: 2px solid var(--lightgray-3);
    padding: 0.8rem;
    overflow: auto;
  }
}
</style>

<script lang="ts" setup>
import { defineProps, onUnmounted, ref, toRefs, watch } from "vue";
import CloseIcon from "./icons/CloseIcon.vue";

const modalContainerEl = ref<HTMLDivElement>();

interface IModalProps {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
}

const propsWithoutRef = defineProps<IModalProps>();
const props = toRefs(propsWithoutRef);

const visible = ref<boolean>(props.visible?.value as boolean);

watch(
  () => props.visible?.value,
  (newVal) => {
    // Timeout for run the command after onClick event
    setTimeout(() => {
      visible.value = newVal as boolean;
    }, 0);
  }
);

const onModalClose = () => {
  (modalContainerEl.value as HTMLDivElement).classList.add(
    "modalContainer_hide"
  );

  setTimeout(() => {
    visible.value = false;
    (modalContainerEl.value as HTMLDivElement).classList.remove(
      "modalContainer_hide"
    );
    if (props.onClose?.value) {
      props.onClose.value();
    }
  }, 200);
};

// Close modal when click the bg
document.addEventListener("click", (e: MouseEvent) => {
  if (
    !e.composedPath().includes(modalContainerEl.value as HTMLDivElement) &&
    visible.value
  ) {
    onModalClose();
  }
});

onUnmounted(() => {
  document.removeEventListener("click", onModalClose);
});
</script>
