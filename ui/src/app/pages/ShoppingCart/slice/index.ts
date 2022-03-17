import { UpdateCartQtyAction } from './../types';
import { PayloadAction } from '@reduxjs/toolkit';
import { ShoppingCartState, Product } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { shoppingCartSaga } from './saga';

export const initialShoppingCartState: ShoppingCartState = {
  shoppingItems: [],
};

const slice = createSlice({
  name: 'shoppingCart',
  initialState: initialShoppingCartState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const index = state.shoppingItems.findIndex(
        ({ id }) => id === product.id,
      );

      if (index !== -1) {
        const item = state.shoppingItems[index];
        const quantity = item.quantity + 1;
        state.shoppingItems.splice(index, 1, { ...product, quantity });
      } else {
        state.shoppingItems.push({ ...action.payload, quantity: 1 });
      }
    },
    updateCartQty(state, action: PayloadAction<UpdateCartQtyAction>) {
      const { quantity, productId } = action.payload;
      const index = state.shoppingItems.findIndex(({ id }) => id === productId);

      if (index !== -1) {
        const item = state.shoppingItems[index];
        state.shoppingItems.splice(index, 1, { ...item, quantity });
      }
    },
  },
});

export const { actions, reducer } = slice;

export const useShoppingCartSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: shoppingCartSaga });

  return { actions: slice.actions };
};
