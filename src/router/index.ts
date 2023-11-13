import { createRouter, createWebHistory } from "vue-router";
import App from '../App.vue';

const FavoritesPage = { template: '<h2>FavoritesPage</h2>' }
const OrdersPage = { template: '<h2>OrdersPage</h2>' }
const BucketPage = { template: '<h2>BucketPage</h2>' }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: App },
    { path: '/favorites', name: 'FavoritesPage', component: FavoritesPage },
    { path: '/orders', name: 'OrdersPage', component: OrdersPage },
    { path: '/bucket', name: 'BucketPage', component: BucketPage },
  ]
});

export default router;