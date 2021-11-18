<template>
  <Layout header="Directory">
    <div
      v-for="(letter, index) in alphabet"
      :key="index"
      :class="'homeContacts_' + letter"
    >
      <Collapse :title="letter.toUpperCase()">
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
  </Layout>
</template>

<style lang="scss">
@import "../styles/base/mediaQueries.scss";
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
</style>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import Collapse from "@/components/Collapse.vue";

import slug from "slug";
import { IUser, alphabet } from "@/datas";
import Card from "@/components/Card.vue";
import Avatar from "@/components/Avatar.vue";
import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";
import { ref } from "@vue/reactivity";

const contacts = ref<IUser[]>();

const getContactsStartsWith = (letter: string): IUser[] => {
  const users: IUser[] = JSON.parse(localStorage.contacts);
  return users.filter((item) =>
    item.firstName.toLowerCase().startsWith(letter.toLowerCase())
  );
};
</script>
