import React from 'react';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { shoppingCartSelector } from './slice/selectors';
import ShoppingCartItem from './ShoppingCartItem';
import { useShoppingCartSlice } from './slice';
import { Box } from '@mui/system';
import { Divider, Grid } from '@mui/material';

interface Props {}
export default function ShoppingCart(props: Props) {
  useShoppingCartSlice();
  const shopingCartItems = useSelector(shoppingCartSelector);

  return (
    <Container>
      <h1>ShoppingCart</h1>

      <Grid container>
        <Grid item md={8}>
          <Box sx={{}}>
            {shopingCartItems.map(shoppingItem => (
              <>
                <Divider />
                <ShoppingCartItem
                  key={shoppingItem.gridId}
                  shoppingItem={shoppingItem}
                />
              </>
            ))}
          </Box>
        </Grid>
        <Grid item md={4}>
          Checkoout section
        </Grid>
      </Grid>
    </Container>
  );
}
