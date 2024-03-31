import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/MainLayout/MainLayout.vue';

export const routeName = 'AuthPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/auth',
  component: () => import('@/pages/auth-page'),
  meta: {
    layout: MainLayout,
    title: 'Auth'
  }
}