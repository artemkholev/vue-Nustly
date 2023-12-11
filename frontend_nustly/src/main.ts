import './assets/styles/main.scss'
import './assets/styles/vars.scss'
import components from './components/UI';

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