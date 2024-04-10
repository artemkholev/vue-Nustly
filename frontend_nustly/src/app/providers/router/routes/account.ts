import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/main-layout';

export const routeName = 'AccountPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/user/account',
  component: () => import('@/pages/account-page'),
  meta: {
    layout: MainLayout,
    title: 'AccountUser'
  }
}