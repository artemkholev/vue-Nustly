import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/main-layout';

export const routeName = 'VacancyPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/vacancy',
  component: () => import('@/pages/vacancy-page'),
  meta: {
    layout: MainLayout,
    title: 'Vacancy'
  }
}