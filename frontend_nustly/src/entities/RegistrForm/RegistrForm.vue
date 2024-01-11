<template>
  <form @submit.prevent :class="formClasses">
    <h1 :style="{marginBottom: '20px', display: 'flex', justifyContent: 'center', fontSize: '2.2vw'}">Регистрация</h1>
    <input-elem 
      v-model="loginInfo.email"
      :typeInput="'email'"
      :placeholderInput="'email'"
    />
    <input-elem
      v-model="loginInfo.password"
      :typeInput="'password'"
      :placeholderInput="'пароль'"
    />
    <input-elem
      v-model="loginInfo.passwordRepeat"
      :typeInput="'password'"
      :placeholderInput="'повторите пароль'"
    />
    <checkbox-elem
      :id="1"
      :text="'Создавая учетную запись, вы соглашаетесь'"
      :textLink="'Условия использования и уведомление о конфиденциальности'"
      :checked="false"
      :handlerErMessage="handlerErMessage"
      :trackAgreement="handlerStatusAgreement"
      :handlerFilterValue="() => null"
      :handlerCheckedFlag="() => null"
      :deleteValue="() => null"
      :selectedFilters="null"
    />
    <div :style="{margin: '5px'}">
      <p v-if="error" :style="{color: 'red'}">{{ error }}</p>
      <p v-if="!passwordMatch" :style="{color: 'red'}">Пароли не совпадают!</p>
      <p v-if="errorMessageCheckbox" :style="{color: 'red'}">{{errorMessageCheckbox}}</p>
    </div>
    <button-elem
      :clName="null"
      :title="'Зарегистрироваться'"
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
import store from '@/shered/store'
import { useAuthStore } from '@/shered/store/auth';
import type { ILogin } from '@/shered/api/authApi/authApi.types';
import { useThemeStore } from '@/shered/store/theme';
import { storeToRefs } from 'pinia';
import { useCatalogStore } from '@/shered/store/catalog';

//white or dark theme
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const formClasses = computed(() => {
  return { containerForm: true, ['dark-containerForm']: isDarkTheme.value };
});

//login function from pinia 
const authStore = useAuthStore();
const { isError, errorMessage } = storeToRefs(authStore);
const { registration } = authStore; 

// send request to server
const isValid = ref(false); 
const passwordMatch = ref(true);
const error = ref(''); 
const errorMessageCheckbox = ref('');
const statusAgreement = ref(false);
const loginInfo = reactive({
  email: '',
  password: '',
  passwordRepeat: ''
});

const userForm = computed<ILogin>(() => {
  return {
    email: loginInfo.email,
    password: loginInfo.password
  };
});

const loginUser = async () => {
  await registration(userForm.value);
  if (!isError.value) {
    loginInfo.email = '';
    loginInfo.password = '';
  } else {
    setErrorMessage(errorMessage.value);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  }
}

const setErrorMessage = (message: string) => {
  error.value = message;
}

const handlerErMessage = (message: string) => {
  errorMessageCheckbox.value = message;
};

const setPasswordMatch = (value: boolean) => {
  passwordMatch.value = value;
}

const handlerButton = async () => {
  if (isValid.value && statusAgreement.value && loginInfo.email) {
    await loginUser();
  } else {
    setErrorMessage('Заполните обязательные поля!');
    setTimeout(() => setErrorMessage(''), 3000);
  }
};

const handlerStatusAgreement = (status: boolean) => {
  statusAgreement.value = status;
};

const handlerIsValid = (status: boolean) => {
  isValid.value = status;
};

watch(loginInfo, (newValues) => {
  if (newValues.password === newValues.passwordRepeat && newValues.password.length > 0) {
    handlerIsValid(true);
  } else {
    handlerIsValid(false);
  }
})

watch(loginInfo, (newValues) => {
  if (
    newValues.password !== newValues.passwordRepeat
    && newValues.password.length > 0
    && newValues.passwordRepeat.length > 0
  ) {
    setPasswordMatch(false);
  } else {
    setPasswordMatch(true);
  }
})
</script>

<style scoped>

</style>