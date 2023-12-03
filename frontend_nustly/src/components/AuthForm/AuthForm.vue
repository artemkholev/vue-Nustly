<template>
  <form @submit.prevent>
    <h4 :style="{marginBottom: '20px', display: 'flex', justifyContent: 'center', fontSize: '100%'}">Вход</h4>
    <input-elem 
      v-model="loginInfo.email"
      :typeInput="'text'"
      :placeholderInput="'email'"
    />
    <input-elem
      v-model="loginInfo.password"
      :typeInput="'password'"
      :placeholderInput="'пароль'"
    />
    <div :style="{margin: '5px'}">
      <p v-if="error" :style="{color: 'red'}">{{ error }}</p>
    </div>
    <button-elem
      :clName="null"
      :title="'Войти'"
      :handler="handlerButton"
      :width="'100%'"
      :height="'48px'"
      :background="'#70C05B'"
      :textColor="null"
      :fontSize="null"
      :fontWeight="null"
      :margin="'24px 0 0 0'"
      :borderRadius="'10px'"
      :icon="null"
    />
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import store from '@/store'
import router from '@/router';
import { useAuthStore } from '@/store/auth';
import type { ILogin } from '@/shered/api/authApi/authApi.types';

const authStore = useAuthStore();
const { login } = authStore; 
const isValid = ref(false); 
const error = ref(''); 
const loginInfo = reactive({
  email: '',
  password: '',
});

const userForm = computed<ILogin>(() => {
  return {
    login: loginInfo.email,
    password: loginInfo.password
  };
});

const loginAction = () => {
  login(userForm.value)
  store.commit('isAuthConvert');
  loginInfo.email = '';
  loginInfo.password = '';
}

const setErrorMessage = (message: string) => {
  error.value = message;
}

const handlerButton = async () => {
  if (isValid.value) {
    await loginAction();
  } else {
    setErrorMessage('Заполните обязательные поля!');
    setTimeout(() => setErrorMessage(''), 3000);
  }
};

const handlerIsValid = (status: boolean) => {
  isValid.value = status;
};

watch(loginInfo, (newValues) => {
  if (newValues.password.length > 0 &&  loginInfo.email.length > 0) {
    handlerIsValid(true);
  } else {
    handlerIsValid(false);
  }
})
</script>

<style scoped>

</style>