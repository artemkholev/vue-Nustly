import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/main-layout';

export const routeName = 'ArticlesPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/articles',
  component: () => import('@/pages/articles-page'),
  meta: {
    layout: MainLayout,
    title: 'Articles'
  }
}