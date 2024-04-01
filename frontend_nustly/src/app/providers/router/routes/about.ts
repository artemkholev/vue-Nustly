import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/main-layout';

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