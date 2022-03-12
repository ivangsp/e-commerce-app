import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Menu from '../Menu';
import { Badge } from '@mui/material';

type Props = {};

export default function NavBar(props: Props) {
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);

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
              E-commerce app
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                  setAccountMenuAnchorEl(event.currentTarget)
                }
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                size="large"
                aria-label="Add to cart"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {}}
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <Menu
        id="account-menu"
        open={Boolean(accountMenuAnchorEl)}
        anchorEl={accountMenuAnchorEl}
        onClose={() => setAccountMenuAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        menuItems={[
          { onClick: () => {}, label: 'Profile' },
          { onClick: () => {}, label: 'My account' },
        ]}
      />
    </>
  );
}
