import type { RouteRecordRaw } from 'vue-router';
import MainPage from "@/pages/main-page";
import MainLayout from '@/widgets/MainLayout/MainLayout.vue';

export const routeName = 'MainPage'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/',
  component: MainPage,
  meta: {
    layout: MainLayout,
    title: 'Main Page'
  }
}