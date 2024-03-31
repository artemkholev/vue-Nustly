import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/MainLayout/MainLayout.vue';

export const routeName = 'BucketPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/user/bucket',
  component: () => import('@/pages/bucket-page'),
  meta: {
    layout: MainLayout,
    requiredAuth: true,
    title: 'Bucket'
  }
}  