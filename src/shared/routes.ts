import { getProduct, getProducts } from './store/actions/goods';
import home from 'shared/pages/home';
import products from 'shared/pages/products';
import productsProduct from 'shared/pages/products.product';
import pageNotFound from 'shared/pages/page-not-found';

const routes = [
  {
    path: '/',
    exact: true,
    component: home
  },
  {
    path: '/products',
    exact: true,
    component: products,
    initialAction: getProducts
  },
  {
    path: '/products/:id',
    exact: true,
    component: productsProduct,
    initialAction: getProduct
  },
  {
    path: '*',
    exact: false,
    component: pageNotFound
  }
];

export default routes;
