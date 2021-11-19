<template>
  <Layout
    :header="contact ? contact.firstName + ' ' + contact.lastName : ''"
    :show-back-button="true"
    :show-search-bar="false"
  >
    <Modal
      title="Edit Contact"
      :on-close="onEditModalClose"
      :visible="editModalVisible"
    >
      <form @keydown="onFormKeyDown" ref="formEl" @submit="onSaveEditModal">
        <TextInput
          full-width
          direction="vertical"
          placeholder="First Name"
          label="First Name"
          required
          name="firstName"
          :default-value="contact?.firstName || ''"
          :on-change="
            (e) => {
              onEditFormFieldChange(e, 'firstName');
            }
          "
        />
        <TextInput
          full-width
          direction="vertical"
          placeholder="Last Name"
          label="Last Name"
          required
          name="lastName"
          :default-value="contact?.lastName || ''"
          :on-change="
            (e) => {
              onEditFormFieldChange(e, 'lastName');
            }
          "
        />
        <TextInput
          full-width
          direction="vertical"
          placeholder="Email"
          label="Email"
          name="email"
          :default-value="contact?.email || ''"
          :on-change="
            (e) => {
              onEditFormFieldChange(e, 'email');
            }
          "
        />
        <TextInput
          full-width
          direction="vertical"
          placeholder="Phone"
          label="Phone"
          required
          name="phone"
          :default-value="contact?.phoneNumber || ''"
          :on-change="
            (e) => {
              onEditFormFieldChange(e, 'phoneNumber');
            }
          "
        />
      </form>
      <template #footer>
        <div class="editModal_footer">
          <Button
            type="primary"
            :disabled="
              editFormValues.firstName.length === 0 ||
              editFormValues.lastName.length === 0 ||
              editFormValues.phoneNumber.length === 0
            "
            html-type="submit"
            @click="onSaveEditModal"
          >
            <template #icon>
              <SaveIcon />
            </template>
            Save
          </Button>
        </div>
      </template>
    </Modal>

    <div class="userView">
      <Card class="userView_card" full-width>
        <div class="userView_cardContainer">
          <div class="userView_cardContainerLeft">
            <div class="userView_cardContainerLeft_avatar">
              <Avatar
                :first-name="contact?.firstName || ''"
                :last-name="contact?.lastName || ''"
                size="large"
              />
            </div>
            <div class="userView_cardContainerLeft_name">
              {{ contact?.firstName }} {{ contact?.lastName }}
            </div>
          </div>
          <div class="userView_cardContainerRight">
            <Button
              @click="onEditModalOpen"
              class="userView_cardContainerRight_button"
              type="primary"
              ><template #icon
                ><PencilIcon
                  class="userView_cardContainerRight_buttonIcon" /></template
            ></Button>
            <Button
              @click="onDeleteContact"
              class="userView_cardContainerRight_button"
              type="error"
              ><template #icon
                ><TrashIcon
                  class="userView_cardContainerRight_buttonIcon" /></template
            ></Button>
          </div>
        </div>
      </Card>
      <Card full-width class="userView_detailCardContainer">
        <div class="userView_detailCardContainer_head">Phone</div>
        <div class="userView_detailCardContainer_content">
          {{ contact?.phoneNumber }}
        </div>
      </Card>
      <Card
        v-show="contact?.email"
        full-width
        class="userView_detailCardContainer"
      >
        <div class="userView_detailCardContainer_head">Email</div>
        <div class="userView_detailCardContainer_content">
          {{ contact?.email }}
        </div>
      </Card>
    </div>
  </Layout>
</template>

<style lang="scss">
@import "../styles/base/mediaQueries.scss";
.editModal_footer {
  display: flex;
  justify-content: flex-end;
}

.userView {
  padding: 1rem;
  & .userView_card {
    & .userView_cardContainer {
      display: flex;
      justify-content: space-between;

      @include MQXsm {
        flex-direction: column;
      }
      @include MQMd {
        flex-direction: row;
      }
      & .userView_cardContainerLeft {
        display: flex;
        align-items: center;

        @include MQXsm {
          justify-content: center;
        }
        @include MQMd {
          justify-content: flex-start;
        }

        & .userView_cardContainerLeft_name {
          margin-left: 1rem;
          font-size: var(--h3);
        }
      }

      & .userView_cardContainerRight {
        display: flex;

        & .userView_cardContainerRight_button {
          @include MQXsm {
            margin-top: 0.7rem;
            flex: 1;
            & button {
              width: 100%;
            }
          }
          @include MQMd {
            margin-top: 0;
            & button {
              width: auto;
            }
          }
          margin: 0 0.5rem;
          & .userView_cardContainerRight_buttonIcon {
            width: 1.2rem !important;
            height: 1.2rem !important;
          }
        }
      }
    }
  }

  & .userView_detailCardContainer {
    & .userView_detailCardContainer_head {
      font-size: var(--span);
      margin-bottom: 0.5rem;
      color: var(--darkgray);
    }
    & .userView_detailCardContainer_content {
      font-size: var(--h6);
      margin-bottom: 0.5rem;
    }
  }
}
</style>

<script lang="ts" setup>
// @ts-ignore
import Layout from "@/components/Layout.vue";
// @ts-ignore
import Modal from "@/components/Modal.vue";
// @ts-ignore
import Card from "@/components/Card.vue";
// @ts-ignore
import Avatar from "@/components/Avatar.vue";
// @ts-ignore
import Button from "@/components/Button.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import SaveIcon from "@/components/icons/SaveIcon.vue";
// @ts-ignore
import TextInput from "@/components/TextInput.vue";
import { IUser } from "@/datas";
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const formEl = ref<HTMLFormElement>();

const contact = ref<IUser>();

const findContact = () => {
  const users = JSON.parse(localStorage.contacts);

  for (let index = 0; index < users.length; index++) {
    if (users[index].id === Number(route.params.id as string)) {
      contact.value = users[index];
      break;
    }
  }
};

onBeforeMount(() => {
  findContact();
});

const editModalVisible = ref<boolean>(false);

const onEditModalOpen = (): void => {
  editModalVisible.value = true;
  editFormValues.firstName = contact.value?.firstName || "";
  editFormValues.lastName = contact.value?.lastName || "";
  editFormValues.email = contact.value?.email || "";
  editFormValues.phoneNumber = contact.value?.phoneNumber || "";
};
const onEditModalClose = (): void => {
  editModalVisible.value = false;
};

interface IEditFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const editFormValues = reactive<IEditFormValues>({
  firstName: contact.value?.firstName || "",
  lastName: contact.value?.lastName || "",
  phoneNumber: contact.value?.phoneNumber || "",
  email: contact.value?.email || "",
});

const onEditFormFieldChange = (
  e: Event,
  fieldName: "firstName" | "lastName" | "email" | "phoneNumber"
) => {
  editFormValues[fieldName] = (e.target as HTMLInputElement).value;
};

const onSaveEditModal = (e: Event | undefined) => {
  if (typeof e !== "undefined") {
    e.preventDefault();
  }

  const users = JSON.parse(localStorage.contacts);

  for (let index = 0; index < users.length; index++) {
    if (users[index].id === Number(route.params.id as string)) {
      users[index] = {
        ...users[index],
        ...editFormValues,
      };
      contact.value = {
        ...users[index],
        ...editFormValues,
      };
      break;
    }
  }

  localStorage.contacts = JSON.stringify(users);

  onEditModalClose();
};

const onFormKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    formEl.value?.requestSubmit();
  }
};

const onDeleteContact = () => {
  try {
    const users: IUser[] = JSON.parse(localStorage.contacts);

    const newUsers = users.filter((user) => {
      return contact.value?.id !== user.id;
    });

    localStorage.contacts = JSON.stringify(newUsers);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>
