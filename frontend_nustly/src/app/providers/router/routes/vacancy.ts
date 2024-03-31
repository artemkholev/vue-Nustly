import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/widgets/MainLayout/MainLayout.vue';

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