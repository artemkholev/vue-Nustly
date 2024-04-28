<template>
  <div class="container">
    <div class="container__info">
      <div class="container__info__photo">
        <img src="@/app/assets/photo/user-placeholder.jpg" alt="фото отсутствует">
      </div>
      <div class="container__info__discription">
        <div class="container__info__discription__email">
          <p><strong>Email: </strong>{{ user?.email }}</p>
        </div>
        <div class="container__info__discription__roles">
          <p><strong>Роли: </strong></p>
          <ul>
            <li v-for="role in user?.roles" @key="role">{{ role.description }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '../../module';
import { storeToRefs } from 'pinia';

const accountStore = useAccountStore();
const { user } = storeToRefs(accountStore);
</script>

<style src="./AccountItem.style.scss" lang="scss" scoped></style>