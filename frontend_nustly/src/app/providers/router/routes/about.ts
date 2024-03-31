import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/MainLayout/MainLayout.vue';

export const routeName = 'AboutPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/about',
  component: () => import('@/pages/about-page'),
  meta: {
    layout: MainLayout,
    title: 'About'
  }
}