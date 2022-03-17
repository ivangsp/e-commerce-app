import { createSelector } from '@reduxjs/toolkit';
import { initialShoppingCartState } from './index';
import { RootState } from 'types';

const domain = (state: RootState) =>
  state.shoppingCart || initialShoppingCartState;

export const shoppingCartSelector = createSelector(
  [domain],
  state => state.shoppingItems,
);

export const numberOfItemsInCartSelector = createSelector(
  [shoppingCartSelector],
  shoppingCartItems => shoppingCartItems.length,
);
