import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/main-layout';

export const routeName = 'RegistrPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/reg',
  component: () => import('@/pages/registr-page'),
  meta: {
    layout: MainLayout,
    title: 'Reg'
  }
}