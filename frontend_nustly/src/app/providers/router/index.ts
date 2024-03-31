import { routes } from './routes'
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/shared/store/auth";
import { storeToRefs } from "pinia";
import { PathNames } from '@/shared/constants/route.constants';

export { pages as AppPages } from './pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { isAuth } = storeToRefs(authStore);
  if (to.meta.requiredAuth && !isAuth.value) {
    alert('Нужна авторизация!');
    next({ name: PathNames.HOME });
  } else {
    next();
  }
});

export { router };