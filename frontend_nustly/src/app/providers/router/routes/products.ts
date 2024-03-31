import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/MainLayout/MainLayout.vue';

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