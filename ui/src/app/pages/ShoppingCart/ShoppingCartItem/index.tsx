import React from 'react';
import { ShoppingItem } from 'types';
import { Divider, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useShoppingCartSlice } from '../slice';
import { useDispatch } from 'react-redux';

interface Props {
  shoppingItem: ShoppingItem;
}

export default function ShoppingCartItem(props: Props) {
  const { actions } = useShoppingCartSlice();
  const dispatch = useDispatch();

  const updateCartQty = (gridId: number, quantity: number) => {
    dispatch(
      actions.updateCartQty({
        gridId,
        quantity: quantity,
      }),
    );
  };

  const {
    gridId,
    quantity,
    product: { name, description, price, image },
  } = props.shoppingItem;

  return (
    <>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          padding: '1rem 0',
        }}
      >
        <Box
          sx={{
            width: '200px',
            padidngRight: '1rem',
          }}
        >
          <Box
            component="img"
            sx={{ width: '100%' }}
            src={image ?? ''}
            alt={name}
          />
        </Box>
        <Box
          sx={{
            p: '0 1rem',
            flexGrow: 1,
          }}
        >
          <Typography variant="h5">{name}</Typography>
          <Typography>{description}</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography>Quantity</Typography>
            <TextField
              size="small"
              sx={{ m: 1, width: '3rem' }}
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateCartQty(gridId, Number(e.target.value))
              }
            />
            <IconButton onClick={() => updateCartQty(gridId, quantity + 1)}>
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton
              onClick={() => updateCartQty(gridId, quantity - 1)}
              disabled={quantity <= 1}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">&#8364; {price}</Typography>
        </Box>

        <Box
          sx={{
            width: '100px',
            textAlign: 'center',
          }}
        >
          <IconButton
            color="error"
            onClick={() => dispatch(actions.deleteProductFromCart(gridId))}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
