import React from 'react';
import { AccountCircle } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Menu from '../Menu';
import Link from '../Link';
import useAuth from 'hooks/useAuth';

export default function AccountMenu() {
  const { isLoggedIn, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogOut = async () => {
    await logout();
  };

  return (
    <>
      {isLoggedIn ? (
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      ) : (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/login">Login</Link>
        </Typography>
      )}

      <Menu
        id="account-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        menuItems={[
          { label: <Link to="/profile">Profile</Link> },
          { label: 'Logout', onClick: handleLogOut },
        ]}
      />
    </>
  );
}
