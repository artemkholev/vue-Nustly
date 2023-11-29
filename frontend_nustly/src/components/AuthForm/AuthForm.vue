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
    <input-elem
      v-model="password"
      :typeInput="'password'"
      :placeholderInput="'повторите пароль'"
    />
    <button-elem
      :clName="null"
      :title="'Войти'"
      :handler="login"
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
import { reactive, ref } from 'vue'


const password = ref(''); 
const loginInfo = reactive({
  email: '',
  password: ''
});

const emit = defineEmits(['login']);

const login = () => {
  emit('login', loginInfo);
  loginInfo.email = '';
  loginInfo.password = '';
}
</script>

<style scoped>

</style>