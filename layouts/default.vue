<script setup lang="ts">
const route = useRoute();

const pageContainerStyles = computed(() => ({
  maxWidth: route.meta?.width || '1080px',
  margin: '0 auto'
}));

const moveExternalLink = async (url: string) => {
  await navigateTo(url, {
    external: true,
    open: {
      target: '_blank'
    }
  });
};
</script>

<template>
  <q-layout
    view="lHh LpR lff"
    class="bg-grey-2"
  >
    <q-header
      bordered
      class="bg-white text-grey-9"
    >
      <q-toolbar>
        <NuxtLink
          v-slot="{ navigate }"
          custom
          to="/"
        >
          <q-btn
            flat
            dense
            @click="navigate"
          >
            <q-toolbar-title>
              <q-avatar>
                <img
                  src="/nuxt-logo.svg"
                  alt="header nuxt logo"
                />
              </q-avatar>
              짐코딩 클럽
            </q-toolbar-title>
          </q-btn>
        </NuxtLink>

        <q-space />

        <NuxtLink
          v-slot="{ navigate }"
          custom
          to="/home"
        >
          <q-btn
            stretch
            flat
            label="Home"
            @click="navigate"
          />
        </NuxtLink>
        <q-btn
          stretch
          flat
          label="수강하기"
          @click="moveExternalLink('https://google.com')"
        />
        <q-btn
          stretch
          flat
          label="온라인강의"
          @click="moveExternalLink('https://www.gymcoding.co/')"
        />
        <q-btn
          stretch
          flat
          label="유튜브"
          @click="moveExternalLink('https://www.youtube.com/@gymcoding')"
        />
        <q-separator
          class="q-my-md q-mr-md"
          vertical
        />
        <q-btn
          unelevated
          rounded
          color="primary"
          label="로그인 / 회원가입"
        />
      </q-toolbar>
    </q-header>

    <q-page-container :style="pageContainerStyles">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
