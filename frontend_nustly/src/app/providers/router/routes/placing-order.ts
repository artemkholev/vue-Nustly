import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/main-layout';

export const routeName = 'PlacingOrderPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/placing-order',
  component: () => import('@/pages/ placing-order-page'),
  meta: {
    layout: MainLayout,
    title: 'Placing Order'
  }
}