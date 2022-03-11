import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { Product, HomePageState } from 'types';
import { homePageSaga } from './saga';

export const initialState: HomePageState = {
  products: [],
  loading: false,
  error: '',
};

const slice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    loadProducts(state) {
      state.loading = true;
    },
    productsLoaded(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      state.products = products;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer } = slice;

export const useHomePageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: homePageSaga });
  return { actions: slice.actions };
};
