import '@/app/styles/main.scss';
import '@/app/styles/vars.scss';
import { createApp } from 'vue';
import { router, store, registerComponents } from './providers';
import App from './App.vue';

const application = createApp(App);

registerComponents(application);

application
  .use(router)
  .use(store)

export { application };