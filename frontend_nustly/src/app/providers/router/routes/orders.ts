import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/main-layout';

export const routeName = 'OrdersPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/user/orders',
  component: () => import('@/pages/orders-page'),
  meta: {
    layout: MainLayout,
    requiredAuth: true,
    title: 'Orders'
  }
}