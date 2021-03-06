import type { FunctionComponent } from 'react';
import { useEffect } from 'react';
import { ProductsComponent } from '../components/products/Products';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../components/_common/Loading/Loading';
import { PageNotFound } from '../components/_common/PageNotFound/PageNotFound';
import type { Store, InitialAction } from '../../types';

interface Props {
  initialAction: InitialAction;
}

const products: FunctionComponent<Props> = ({ initialAction }) => {
  const { products } = useSelector(({ goods }: Store) => goods);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!products?.length) {
      dispatch(initialAction() as any);
    }
  }, []);
  return (
    products === null ?
      <PageNotFound/> :
      products ? <ProductsComponent products={products} /> : <Loading timeout={500}/>
  );
}

export default products;
