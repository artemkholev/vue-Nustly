import { createRouter, createWebHistory } from "vue-router";
import { Links, PathNames } from '@/constants/route.constants';
import MainLayout from '@/layouts/MainLayout/MainLayout.vue';
import MainPage from "@/components/Main/MainPage.vue";

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
      component: () => import('@/Pages/BucketsPage/BucketsPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Bucket'
      }
    },
    {
      path: Links.ORDERS,
      name: PathNames.ORDERS,
      component: () => import('@/Pages/OrdersPage/OrdersPage.vue'),
      meta: {
        layout: MainLayout,
        // title: 'Orders'
      }
    }, 
    {
      path: Links.FAVORITES,
      name: PathNames.FAVORITES,
      component: () => import('@/Pages/FavoritesPage/FavoritesPage.vue'),
      meta: {
        layout: MainLayout,
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
  ]
});

export default router;