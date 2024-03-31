import { Links, PathNames } from '@/shered/constants/route.constants';
import MainLayout from '@/widgets/MainLayout/MainLayout.vue';
import MainPage from "@/pages/main-page";

export const routes = [
  {
    path: Links.HOME,
    name: PathNames.HOME,
    component: MainPage,
    meta: {
      layout: MainLayout,
      // title: 'Main Page'
    }
  },
  {
    path: Links.ABOUT,
    name: PathNames.ABOUT,
    component: () => import('@/pages/about-page'),
    meta: {
      layout: MainLayout,
      // title: 'About'
    }
  },
  {
    path: Links.BUCKET,
    name: PathNames.BUCKET,
    component: () => import('@/pages/bucket-page'),
    meta: {
      layout: MainLayout,
      requiredAuth: true,
      // title: 'Bucket'
    }
  },
  {
    path: Links.ORDERS,
    name: PathNames.ORDERS,
    component: () => import('@/pages/orders-page'),
    meta: {
      layout: MainLayout,
      requiredAuth: true,
      title: 'Orders'
    }
  }, 
  {
    path: Links.FAVORITES,
    name: PathNames.FAVORITES,
    component: () => import('@/pages/favorites-page'),
    meta: {
      layout: MainLayout,
      requiredAuth: true,
      title: 'Favorites'
    }
  },
  {
    path: Links.VACANCY,
    name: PathNames.VACANCY,
    component: () => import('@/pages/vacancy-page'),
    meta: {
      layout: MainLayout,
      title: 'Vacancy'
    }
  },
  {
    path: Links.ARTICLES,
    name: PathNames.ARTICLES,
    component: () => import('@/pages/articles-page'),
    meta: {
      layout: MainLayout,
      title: 'Articles'
    }
  },
  {
    path: Links.POLITICS,
    name: PathNames.POLITICS,
    component: () => import('@/pages/politics-page'),
    meta: {
      layout: MainLayout,
      title: 'Pjlitics'
    }
  },
  {
    path: Links.AUTH,
    name: PathNames.AUTH,
    component: () => import('@/pages/auth-page'),
    meta: {
      layout: MainLayout,
      title: 'Auth'
    }
  },
  {
    path: Links.REG,
    name: PathNames.REG,
    component: () => import('@/pages/registr-page'),
    meta: {
      layout: MainLayout,
      title: 'Reg'
    }
  },
  {
    path: Links.AGREEMENT,
    name: PathNames.AGREEMENT,
    component: () => import('@/pages/agreement-page'),
    meta: {
      layout: MainLayout,
      title: 'Agreement'
    }
  },
  {
    path: Links.CATALOG,
    name: PathNames.CATALOG,
    component: () => import('@/pages/catalog-page'),
    meta: {
      layout: MainLayout,
      title: 'Catalog'
    }
  },
  {
    path: `${Links.CATALOG}/:category_id`,
    name: PathNames.PRODUCTS,
    component: () => import('@/pages/products-page'),
    meta: {
      layout: MainLayout,
      title: 'Products',
    }
  },
]