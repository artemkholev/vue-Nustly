import { createRouter, createWebHistory } from "vue-router";
import { Links, PathNames } from '@/constants/route.constants';
import MainLayout from '@/layouts/MainLayout/MainLayout.vue';
import MainPage from "@/widgets/Main/MainPage.vue";
import store from "@/store";

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
      component: () => import('@/Pages/About/AboutPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'About'
      }
    },
    {
      path: Links.BUCKET,
      name: PathNames.BUCKET,
      component: () => import('@/Pages/BucketPage/BucketPage.vue'),
      meta: {
        layout: MainLayout,
        requiredAuth: true,
        // title: 'Bucket'
      }
    },
    {
      path: Links.ORDERS,
      name: PathNames.ORDERS,
      component: () => import('@/Pages/OrdersPage/OrdersPage.vue'),
      meta: {
        layout: MainLayout,
        requiredAuth: true,
        // title: 'Orders'
      }
    }, 
    {
      path: Links.FAVORITES,
      name: PathNames.FAVORITES,
      component: () => import('@/Pages/FavoritesPage/FavoritesPage.vue'),
      meta: {
        layout: MainLayout,
        requiredAuth: true,
        // title: 'Favorites'
      }
    },
    {
      path: Links.VACANCY,
      name: PathNames.VACANCY,
      component: () => import('@/Pages/VacancyPage/VacancyPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Vacancy'
      }
    },
    {
      path: Links.ARTICLES,
      name: PathNames.ARTICLES,
      component: () => import('@/Pages/ArticlesPage/ArticlesPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Articles'
      }
    },
    {
      path: Links.POLITICS,
      name: PathNames.POLITICS,
      component: () => import('@/Pages/PoliticsPage/PoliticsPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Pjlitics'
      }
    },
    {
      path: Links.AUTH,
      name: PathNames.AUTH,
      component: () => import('@/Pages/AuthPage/AuthPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Auth'
      }
    },
    {
      path: Links.REG,
      name: PathNames.REG,
      component: () => import('@/Pages/RegistrPage/RegistrPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Reg'
      }
    },
    {
      path: Links.AGREEMENT,
      name: PathNames.AGREEMENT,
      component: () => import('@/Pages/AgreementPage/AgreementPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Agreement'
      }
    },
    {
      path: Links.CATALOG,
      name: PathNames.CATALOG,
      component: () => import('@/Pages/CatalogPage/CatalogPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Catalog'
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  const isAuth = store.state.isAuth;
  if (to.meta.requiredAuth && !isAuth) {
    alert('Нужна авторизация!');
    next({ name: PathNames.HOME });
  } else {
    next();
  }
});

export default router;