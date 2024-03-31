import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/MainLayout/MainLayout.vue';

export const routeName = 'PoliticsPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/politics',
  component: () => import('@/pages/politics-page'),
  meta: {
    layout: MainLayout,
    title: 'Pjlitics'
  }
}