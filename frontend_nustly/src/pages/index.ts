import { createRouter, createWebHistory } from "vue-router";
import { Links, PathNames } from '@/shered/constants/route.constants';
import MainLayout from '@/widgets/MainLayout/MainLayout.vue';
import MainPage from "@/pages/MainPage/MainPage.vue";
import store from "@/shered/store";
import { useAuthStore } from "@/shered/store/auth";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: Links.HOME,
      name: PathNames.HOME,
      component: MainPage,
      meta: {
        layout: MainLayout,
        // title: 'Main Page'
      }
    },
    {
      path: Links.ABOUT,
      name: PathNames.ABOUT,
      component: () => import('@/pages/About/AboutPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'About'
      }
    },
    {
      path: Links.BUCKET,
      name: PathNames.BUCKET,
      component: () => import('@/pages/BucketPage/BucketPage.vue'),
      meta: {
        layout: MainLayout,
        requiredAuth: true,
        // title: 'Bucket'
      }
    },
    {
      path: Links.ORDERS,
      name: PathNames.ORDERS,
      component: () => import('@/pages/OrdersPage/OrdersPage.vue'),
      meta: {
        layout: MainLayout,
        requiredAuth: true,
        // title: 'Orders'
      }
    }, 
    {
      path: Links.FAVORITES,
      name: PathNames.FAVORITES,
      component: () => import('@/pages/FavoritesPage/FavoritesPage.vue'),
      meta: {
        layout: MainLayout,
        requiredAuth: true,
        // title: 'Favorites'
      }
    },
    {
      path: Links.VACANCY,
      name: PathNames.VACANCY,
      component: () => import('@/pages/VacancyPage/VacancyPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Vacancy'
      }
    },
    {
      path: Links.ARTICLES,
      name: PathNames.ARTICLES,
      component: () => import('@/pages/ArticlesPage/ArticlesPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Articles'
      }
    },
    {
      path: Links.POLITICS,
      name: PathNames.POLITICS,
      component: () => import('@/pages/PoliticsPage/PoliticsPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Pjlitics'
      }
    },
    {
      path: Links.AUTH,
      name: PathNames.AUTH,
      component: () => import('@/pages/AuthPage/AuthPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Auth'
      }
    },
    {
      path: Links.REG,
      name: PathNames.REG,
      component: () => import('@/pages/RegistrPage/RegistrPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Reg'
      }
    },
    {
      path: Links.AGREEMENT,
      name: PathNames.AGREEMENT,
      component: () => import('@/pages/AgreementPage/AgreementPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Agreement'
      }
    },
    {
      path: Links.CATALOG,
      name: PathNames.CATALOG,
      component: () => import('@/pages/CatalogPage/CatalogPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Catalog'
      }
    },
  ]
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

export default router;