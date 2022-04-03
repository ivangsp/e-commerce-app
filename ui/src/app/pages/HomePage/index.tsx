import { Container, Grid } from '@mui/material';
import ProductCard from 'app/components/ProductCard';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useShoppingCartSlice } from '../ShoppingCart/slice';
import { useHomePageSlice } from './slice';
import { productsSelector } from './slice/selectors';
import { HomePageProps } from './types';

export const HomePage = (props: HomePageProps) => {
  const { actions } = useHomePageSlice();
  const {
    actions: { addToCart },
  } = useShoppingCartSlice();

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
      <Container>
        <Grid
          container
          justifyContent="center"
          spacing={3}
          sx={{ marginTop: 0 }}
        >
          {products.map((product, index) => (
            <Grid item key={index}>
              <ProductCard
                key={product.id}
                product={product}
                handleOnClick={item => dispatch(addToCart(item))}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
