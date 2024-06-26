import { routeName as about } from './routes/about';
import { routeName as agreement } from './routes/agreement';
import { routeName as articles } from './routes/articles';
import { routeName as auth } from './routes/auth';
import { routeName as bucket } from './routes/bucket';
import { routeName as catalog } from './routes/catalog';
import { routeName as favorites } from './routes/favorites';
import { routeName as main } from './routes/main';
import { routeName as orders } from './routes/orders';
import { routeName as politics } from './routes/politics';
import { routeName as products } from './routes/products';
import { routeName as registr } from './routes/registr';
import { routeName as vacancy } from './routes/vacancy';
import { routeName as account } from './routes/account';
import { routeName as error } from './routes/error';
import { routeName as success } from './routes/success';

export const pages = {
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
  error,
  success,
} as const