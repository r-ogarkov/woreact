import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from '../constants/goods';
import type { Product, Products, ThunkAction } from '../../../types';
import type { Dispatch } from 'react';
import { request } from '../../api/request';

const receiveProduct = (product?: Product) => ({ type: RECEIVE_PRODUCT, payload: { product } });
const receiveProducts = (products: Products) => ({ type: RECEIVE_PRODUCTS, payload: { products } });

const getProduct = (req?: { originalUrl: string }): ThunkAction => {
  const { originalUrl = '' } = req || {};
  const [,,id] = originalUrl.split('/');
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data: product } = await request('product', { id });
      dispatch(receiveProduct(product));
    } catch (e) {
      console.error(e);
    }
  }
};

const getProducts = (): ThunkAction => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data: products } = await request('products');
      dispatch(receiveProducts(products));
    } catch (e) {
      console.error(e);
    }
  };
};

export { receiveProduct, getProduct, getProducts };
