import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/main-layout';

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