import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state.homePage || initialState;

export const productsSelector = createSelector(
  [selectDomain],
  homePageState => homePageState.products,
);
