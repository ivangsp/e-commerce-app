import { Grid } from '@mui/material';
import ProductCard from 'app/components/ProductCard';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useHomePageSlice } from './slice';
import { productsSelector } from './slice/selectors';
import { HomePageProps } from './types';

export function HomePage(props: HomePageProps) {
  const { actions } = useHomePageSlice();
  const products = useSelector(productsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>product list</title>
        <meta name="description" content="List of products" />
      </Helmet>
      <Grid container justifyContent="center" spacing={3}>
        {products.map((product, index) => (
          <Grid item key={index}>
            <ProductCard key={product.id} product={product} />{' '}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
