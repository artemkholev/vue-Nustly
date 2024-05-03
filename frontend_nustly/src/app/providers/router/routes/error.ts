import type { RouteRecordRaw } from 'vue-router';

export const routeName = 'ErrorPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/:pathMatch(.*)*',
  component: () => import('@/pages/error-page'),
  meta: {
    title: 'Error'
  }
}