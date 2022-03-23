import { RootState } from 'types';
import { createSelector } from '@reduxjs/toolkit';

const domain = (state: RootState) => state.errorDialog;

export const errorDialogSelector = createSelector(
  [domain],
  errorDialogState => ({
    errorMessage: errorDialogState?.errorMessage,
    open: errorDialogState?.open,
  }),
);
