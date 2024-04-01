import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/main-layout';

export const routeName = 'ProductsPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/catalog/:category_id',
  component: () => import('@/pages/products-page'),
  meta: {
    layout: MainLayout,
    title: 'Products',
  }
}