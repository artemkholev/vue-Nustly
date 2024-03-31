import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/MainLayout/MainLayout.vue';

export const routeName = 'AgreementPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/agreement',
  component: () => import('@/pages/agreement-page'),
  meta: {
    layout: MainLayout,
    title: 'Agreement'
  }
}