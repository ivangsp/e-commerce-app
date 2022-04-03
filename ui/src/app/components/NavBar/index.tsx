import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { numberOfItemsInCartSelector } from 'app/pages/ShoppingCart/slice/selectors';
import { useShoppingCartSlice } from 'app/pages/ShoppingCart/slice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AccountMenu from '../AccountMenu';

type Props = {};

export default function NavBar(props: Props) {
  useShoppingCartSlice();
  const navigate = useNavigate();

  const numberOfitemsInShoppingCart = useSelector(numberOfItemsInCartSelector);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">E-commerce app</Link>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconButton
                size="large"
                aria-label="Add to cart"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => navigate('/shoppingCart')}
                color="inherit"
              >
                <Badge badgeContent={numberOfitemsInShoppingCart} color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
              <AccountMenu />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
