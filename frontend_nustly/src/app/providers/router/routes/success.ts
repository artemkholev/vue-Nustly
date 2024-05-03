import type { RouteRecordRaw } from 'vue-router';

export const routeName = 'PlacingOrderSuccessPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/placing-order/success',
  component: () => import('@/pages/success-page'),
  meta: {
    title: 'Placing Order Success'
  }
}