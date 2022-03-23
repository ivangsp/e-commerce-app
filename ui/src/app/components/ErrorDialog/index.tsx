import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useErrorDialogSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { errorDialogSelector } from './slice/selectors';

export default function ErrorDialog() {
  const {
    actions: { closeErrorDialog },
  } = useErrorDialogSlice();

  const { errorMessage, open } = useSelector(errorDialogSelector);
  const dispatch = useDispatch();

  const closeDialog = () => {
    dispatch(closeErrorDialog());
  };

  return (
    <Dialog open={open} onClose={() => {}}>
      <DialogTitle id="alert-dialog-title">Error!!</DialogTitle>
      <DialogContent>
        <DialogContentText>{errorMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
