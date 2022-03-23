import { PayloadAction } from '@reduxjs/toolkit';
import { ErrorDialog } from 'types';
import { useInjectReducer } from 'utils/redux-injectors';
import { createSlice } from './../../../../utils/@reduxjs/toolkit';

const initialState: ErrorDialog = {
  open: false,
  errorMessage: '',
};

const slice = createSlice({
  name: 'errorDialog',
  initialState,
  reducers: {
    openErrorDialog(state, action: PayloadAction<string>) {
      state.open = true;
      state.errorMessage = action.payload;
    },
    closeErrorDialog(state) {
      state.open = false;
      state.errorMessage = '';
    },
  },
});

export const {
  actions: { openErrorDialog, closeErrorDialog },
  reducer,
} = slice;

export const useErrorDialogSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
