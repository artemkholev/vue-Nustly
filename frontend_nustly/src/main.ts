import './app/assets/styles/main.scss'
import './app/assets/styles/vars.scss'
import components from './shered/UI';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/pages';
import store from '@/shered/store';

const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})


app
  .use(createPinia())
  .use(router)
  .use(store)
  .mount('#app')