import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/main-layout';

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