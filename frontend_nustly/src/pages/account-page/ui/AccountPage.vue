<template>
  <div class="account">
    <h1 class="account__header">Аккаунт пользователя</h1>
    <AccountContainer/>
  </div>
</template>

<script setup lang="ts">
import { AccountContainer } from '@/widgets/account-module';
import { onMounted } from 'vue';
import { AccountModule } from '@/entities/account-item'

const accountStore = AccountModule.useAccountStore();
const { getUser } = accountStore;

onMounted(() => {
  getUser();
})
</script>

<style src="./AccountPage.style.scss" lang="scss" scoped></style>