<template>
  <form @submit.prevent>
    <h4 :style="{marginBottom: '20px'}">Вход</h4>
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
import { reactive, ref, watch } from 'vue'
import store from '@/store'
import router from '@/router';
 
const isValid = ref(false); 
const error = ref(''); 
const loginInfo = reactive({
  email: '',
  password: '',
});

const emit = defineEmits(['login']);

const login = () => {
  emit('login', loginInfo);
  loginInfo.email = '';
  loginInfo.password = '';
  store.commit('isAuthConvert');
  router.push('/');
}

const setErrorMessage = (message: string) => {
  error.value = message;
}

const handlerButton = async () => {
  if (isValid.value) {
    await login();
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