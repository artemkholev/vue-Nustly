import type { RouteRecordRaw } from 'vue-router';

import { route as about } from './about';
import { route as agreement } from './agreement';
import { route as articles } from './articles';
import { route as auth } from './auth';
import { route as bucket } from './bucket';
import { route as catalog } from './catalog';
import { route as favorites } from './favorites';
import { route as main } from './main';
import { route as orders } from './orders';
import { route as politics } from './politics';
import { route as products } from './products';
import { route as registr } from './registr';
import { route as vacancy } from './vacancy';
import { route as account } from './account';

export const routes: readonly RouteRecordRaw[] = [
  account,
  about,
  agreement,
  articles,
  auth,
  bucket,
  catalog,
  favorites,
  main,
  orders,
  politics,
  products,
  registr,
  vacancy,
] as const