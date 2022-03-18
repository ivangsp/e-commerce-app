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
        ({ product: { id } }) => id === product.id,
      );

      if (index !== -1) {
        const item = state.shoppingItems[index];
        const quantity = item.quantity + 1;
        state.shoppingItems.splice(index, 1, { ...item, quantity });
      } else {
        const gridId = Date.now();
        state.shoppingItems.push({ gridId, product, quantity: 1 });
      }
    },

    updateCartQty(state, action: PayloadAction<UpdateCartQtyAction>) {
      const { quantity, gridId } = action.payload;
      const index = state.shoppingItems.findIndex(
        item => gridId === item.gridId,
      );

      if (index !== -1) {
        const item = state.shoppingItems[index];
        state.shoppingItems.splice(index, 1, { ...item, quantity });
      }
    },

    deleteProductFromCart(state, { payload }: PayloadAction<number>) {
      const items = state.shoppingItems.filter(item => item.gridId !== payload);
      state.shoppingItems = items;
    },
  },
});

export const { actions, reducer } = slice;

export const useShoppingCartSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: shoppingCartSaga });

  return { actions: slice.actions };
};
