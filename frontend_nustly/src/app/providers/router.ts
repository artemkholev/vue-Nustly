import { routes } from "@/pages";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/shered/store/auth";
import { storeToRefs } from "pinia";
import { PathNames } from '@/shered/constants/route.constants';

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