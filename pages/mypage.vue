<script setup lang="ts"></script>

<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <div class="col-4">
        <AppsBaseCard>
          <q-list
            bordered
            separator
          >
            <NuxtLink
              v-slot="{ navigate }"
              custom
              to="/mypage/profile"
            >
              <q-item
                v-ripple
                clickable
                @click="navigate"
              >
                <q-item-section avatar>
                  <q-icon name="sym_o_account_circle" />
                </q-item-section>
                <q-item-section>프로필</q-item-section>
              </q-item>
            </NuxtLink>
            <NuxtLink
              v-slot="{ navigate }"
              custom
              to="/mypage/password"
            >
              <q-item
                v-ripple
                clickable
                @click="navigate"
              >
                <q-item-section avatar>
                  <q-icon name="sym_o_lock" />
                </q-item-section>
                <q-item-section>비밀번호 변경</q-item-section>
              </q-item>
            </NuxtLink>
            <NuxtLink
              v-slot="{ navigate }"
              custom
              to="/mypage/bookmark"
            >
              <q-item
                v-ripple
                clickable
                @click="navigate"
              >
                <q-item-section avatar>
                  <q-icon name="sym_o_bookmark" />
                </q-item-section>
                <q-item-section>북마크</q-item-section>
              </q-item>
            </NuxtLink>
          </q-list>
        </AppsBaseCard>
      </div>
      <div class="col-8">
        <NuxtPage />
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
