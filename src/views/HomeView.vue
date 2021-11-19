<template>
  <Layout
    :on-search-change="onSearch"
    :show-search-bar="true"
    header="Directory"
  >
    <Modal
      title="Add Contact"
      :on-close="onAddContactModalClose"
      :visible="addContactModalVisible"
    >
      <form @keydown="onFormKeyDown" ref="formEl" @submit="onAddContact">
        <TextInput
          full-width
          direction="vertical"
          placeholder="First Name"
          label="First Name"
          required
          :default-value="addFormValues.firstName"
          name="firstName"
          :on-change="
            (e) => {
              onAddContactFormFieldChange(e, 'firstName');
            }
          "
        />
        <TextInput
          full-width
          direction="vertical"
          placeholder="Last Name"
          label="Last Name"
          required
          :default-value="addFormValues.lastName"
          name="lastName"
          :on-change="
            (e) => {
              onAddContactFormFieldChange(e, 'lastName');
            }
          "
        />
        <TextInput
          full-width
          direction="vertical"
          placeholder="Email"
          label="Email"
          :default-value="addFormValues.email"
          name="email"
          :on-change="
            (e) => {
              onAddContactFormFieldChange(e, 'email');
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
          :default-value="addFormValues.phoneNumber"
          :on-change="
            (e) => {
              onAddContactFormFieldChange(e, 'phoneNumber');
            }
          "
        />
      </form>
      <template #footer>
        <div class="addContactModal_footer">
          <Button
            type="primary"
            :disabled="
              addFormValues.firstName.length === 0 ||
              addFormValues.lastName.length === 0 ||
              addFormValues.phoneNumber.length === 0
            "
            html-type="submit"
            @click="onAddContact"
          >
            <template #icon>
              <SaveIcon />
            </template>
            Save
          </Button>
        </div>
      </template>
    </Modal>
    <div class="homeHeader">
      <Button @click="onAddContactModalOpen" type="success"
        ><template #icon><PlusIcon /> </template> Add Contact</Button
      >
    </div>
    <div
      v-show="searchInputValue.length === 0"
      v-for="(letter, index) in alphabet"
      :key="index"
    >
      <Collapse :title="letter.toLocaleUpperCase('TR')">
        <div class="homeContacts_cardsContainer">
          <router-link
            class="homeContacts_card"
            v-for="(contact, index) in getContactsStartsWith(letter)"
            :key="index"
            :to="
              '/' +
              slug(`${contact.firstName}${contact.lastName}`) +
              '/' +
              contact.id
            "
          >
            <Card :full-width="true">
              <div class="homeContacts_cardContainer">
                <div class="homeContacts_cardContainerLeft">
                  <div class="homeContacts_cardContainerHeader">
                    <div class="homeContacts_cardContainerAvatar">
                      <Avatar
                        :first-name="contact.firstName"
                        :last-name="contact.lastName"
                      />
                    </div>
                    <div class="homeContacts_cardContainerName">
                      {{ contact.firstName }} {{ contact.lastName }}
                    </div>
                  </div>

                  <div class="homeContacts_cardContainerDetails">
                    <div
                      class="homeContacts_cardContainerDetails_detailContainer"
                    >
                      <div
                        class="
                          homeContacts_cardContainerDetails_detailContainerPrefix
                        "
                      >
                        Phone:
                      </div>
                      <div
                        class="
                          homeContacts_cardContainerDetails_detailContainerDetail
                        "
                      >
                        {{ contact.phoneNumber }}
                      </div>
                    </div>
                    <div
                      v-show="contact.email"
                      class="homeContacts_cardContainerDetails_detailContainer"
                    >
                      <div
                        class="
                          homeContacts_cardContainerDetails_detailContainerPrefix
                        "
                      >
                        Email:
                      </div>
                      <div
                        class="
                          homeContacts_cardContainerDetails_detailContainerDetail
                        "
                      >
                        {{ contact.email }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="homeContacts_cardContainerRight">
                  <RightArrowIcon
                    class="homeContacts_cardContainerRight_icon"
                  />
                </div>
              </div>
            </Card>
          </router-link></div
      ></Collapse>
    </div>
    <div v-show="searchInputValue.length !== 0" class="">
      <div class="homeContacts_cardsContainer">
        <router-link
          class="homeContacts_card"
          v-for="(contact, index) in contacts"
          :key="index"
          :to="
            '/' +
            slug(`${contact.firstName}${contact.lastName}`) +
            '/' +
            contact.id
          "
        >
          <Card :full-width="true">
            <div class="homeContacts_cardContainer">
              <div class="homeContacts_cardContainerLeft">
                <div class="homeContacts_cardContainerHeader">
                  <div class="homeContacts_cardContainerAvatar">
                    <Avatar
                      :first-name="contact.firstName"
                      :last-name="contact.lastName"
                    />
                  </div>
                  <div class="homeContacts_cardContainerName">
                    {{ contact.firstName }} {{ contact.lastName }}
                  </div>
                </div>

                <div class="homeContacts_cardContainerDetails">
                  <div
                    class="homeContacts_cardContainerDetails_detailContainer"
                  >
                    <div
                      class="
                        homeContacts_cardContainerDetails_detailContainerPrefix
                      "
                    >
                      Phone:
                    </div>
                    <div
                      class="
                        homeContacts_cardContainerDetails_detailContainerDetail
                      "
                    >
                      {{ contact.phoneNumber }}
                    </div>
                  </div>
                  <div
                    v-show="contact.email"
                    class="homeContacts_cardContainerDetails_detailContainer"
                  >
                    <div
                      class="
                        homeContacts_cardContainerDetails_detailContainerPrefix
                      "
                    >
                      Email:
                    </div>
                    <div
                      class="
                        homeContacts_cardContainerDetails_detailContainerDetail
                      "
                    >
                      {{ contact.email }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="homeContacts_cardContainerRight">
                <RightArrowIcon class="homeContacts_cardContainerRight_icon" />
              </div>
            </div>
          </Card>
        </router-link>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss">
@import "../styles/base/mediaQueries.scss";

.homeHeader {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0.7rem 0;
}

.homeContacts_cardsContainer {
  display: grid;

  @include MQMd {
    grid-template-columns: 1fr 1fr;
  }
  @include MQLg {
    grid-template-columns: 1fr 1fr 1fr;
  }
  grid-gap: 1rem;
  & .homeContacts_card {
    display: flex;
    width: 100%;
    height: max-content;

    align-items: center;
    & .homeContacts_cardContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      & .homeContacts_cardContainerLeft {
        & .homeContacts_cardContainerHeader {
          display: flex;
          align-items: center;

          & .homeContacts_cardContainerName {
            font-size: var(--h6);
            margin-left: 0.6rem;
            white-space: nowrap;
          }
        }

        & .homeContacts_cardContainerDetails {
          display: flex;
          flex-direction: column;

          & .homeContacts_cardContainerDetails_detailContainer {
            display: flex;
            align-items: center;
            margin-top: 0.5rem;

            & .homeContacts_cardContainerDetails_detailContainerPrefix {
              font-size: var(--span-s);
              margin-right: 0.5rem;
            }

            & .homeContacts_cardContainerDetails_detailContainerDetail {
              font-size: var(--span-m);
              white-space: nowrap;
            }
          }
        }
      }

      & .homeContacts_cardContainerRight {
        & .homeContacts_cardContainerRight_icon {
          width: 0.8rem;
        }
      }
    }
  }
}

.addContactModal_footer {
  display: flex;
  justify-content: flex-end;
}
</style>

<script setup lang="ts">
// @ts-ignore
import Layout from "@/components/Layout.vue";
// @ts-ignore
import Collapse from "@/components/Collapse.vue";

import slug from "slug";
import { IUser, alphabet } from "@/datas";
// @ts-ignore
import Card from "@/components/Card.vue";
// @ts-ignore
import Avatar from "@/components/Avatar.vue";
import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import SaveIcon from "@/components/icons/SaveIcon.vue";
// @ts-ignore
import Button from "@/components/Button.vue";
import { reactive, ref } from "@vue/reactivity";
// @ts-ignore
import Modal from "@/components/Modal.vue";
// @ts-ignore
import TextInput from "@/components/TextInput.vue";

const contacts = ref<IUser[]>();
const formEl = ref<HTMLFormElement>();
const searchInputValue = ref<string>("");

const getContactsStartsWith = (letter: string): IUser[] => {
  const users: IUser[] = JSON.parse(localStorage.contacts);
  return users.filter((item) =>
    item.firstName
      .toLocaleLowerCase("TR")
      .startsWith(letter.toLocaleLowerCase("TR"))
  );
};

interface IAddFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const addFormValues = reactive<IAddFormValues>({
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
});

const addContactModalVisible = ref<boolean>(false);

const onAddContactFormFieldChange = (
  e: Event,
  fieldName: "firstName" | "lastName" | "email" | "phoneNumber"
) => {
  addFormValues[fieldName] = (e.target as HTMLInputElement).value;
};

const onAddContact = () => {
  const newContacts = JSON.parse(localStorage.contacts);

  const newContact: IUser = {
    id: newContacts.length + Math.floor(Math.random() * 100),
    firstName: addFormValues.firstName,
    lastName: addFormValues.lastName,
    email: addFormValues.email,
    phoneNumber: addFormValues.phoneNumber,
  };

  newContacts.push(newContact);
  contacts.value = newContacts;
  onAddContactModalClose();
  addFormValues.email = "";
  addFormValues.firstName = "";
  addFormValues.lastName = "";
  addFormValues.phoneNumber = "";
  localStorage.contacts = JSON.stringify(newContacts);
};

const onAddContactModalOpen = (): void => {
  addContactModalVisible.value = true;
};
const onAddContactModalClose = (): void => {
  addContactModalVisible.value = false;
};

const onFormKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    formEl.value?.requestSubmit();
  }
};

// Search
const onSearch = (e?: Event) => {
  const searchValue = (e.target as HTMLInputElement).value;
  searchInputValue.value = searchValue;
  const pureContacts = JSON.parse(localStorage.contacts);

  if (searchValue.length === 0) {
    contacts.value = JSON.parse(localStorage.contacts);
    return;
  }

  const filteredContacts = pureContacts.filter(
    (item: IUser) =>
      item.firstName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      item.lastName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      item.phoneNumber.replaceAll(" ", "").includes(searchValue) ||
      item.phoneNumber.includes(searchValue)
  );
  contacts.value = filteredContacts;
};
</script>
