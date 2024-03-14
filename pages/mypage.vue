<script setup lang="ts"></script>

<template>
  <div>
    <div class="text-h4">MyPage</div>
    <ul>
      <li>
        <NuxtLink to="/mypage/profile">Profile</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/mypage/password">Password</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/mypage/bookmark">Bookmark</NuxtLink>
      </li>
    </ul>
    <NuxtPage />
  </div>
</template>

<style scoped></style>
