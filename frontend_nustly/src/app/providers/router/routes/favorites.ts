import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/MainLayout/MainLayout.vue';

export const routeName = 'FavoritesPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/user/favorites',
  component: () => import('@/pages/favorites-page'),
  meta: {
    layout: MainLayout,
    requiredAuth: true,
    title: 'Favorites'
  }
} 