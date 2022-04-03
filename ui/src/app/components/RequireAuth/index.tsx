import React from 'react';
import useAuth from 'hooks/useAuth';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

export default function RequireAuth() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: { path: location.pathname } }}
    />
  );
}
