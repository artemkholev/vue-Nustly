import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/main-layout';

export const routeName = 'CatalogPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/catalog',
  component: () => import('@/pages/catalog-page'),
  meta: {
    layout: MainLayout,
    title: 'Catalog'
  }
}