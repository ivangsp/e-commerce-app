import React from 'react';
import MuiMenu from '@mui/material/Menu';
import {
  MenuProps as MuiMenuProps,
  MenuItemProps as MuiMenuItemProps,
  MenuItem as MuiMenuItem,
} from '@mui/material';
import { MarkRequired } from 'ts-essentials';

interface MenuItemProps extends MuiMenuItemProps {
  label: string;
}

interface Props
  extends MarkRequired<
    MuiMenuProps,
    'open' | 'onClose' | 'onClose' | 'anchorEl'
  > {
  menuItems: MenuItemProps[];
  id: string;
}

export default function Menu(props: Props) {
  const { open, id, anchorEl, onClose, menuItems, ...others } = props;

  const menuItemsNodes = menuItems.map(
    ({ label, onClick, ...otherMenuItemProps }) => (
      <MuiMenuItem key={label} onClick={onClick} {...otherMenuItemProps}>
        {label}
      </MuiMenuItem>
    ),
  );

  return (
    <>
      <MuiMenu
        id={id}
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        {...others}
      >
        {menuItemsNodes}
      </MuiMenu>
    </>
  );
}
