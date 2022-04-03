import React from 'react';
import useAuth from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: { path: location.pathname } }}
    />
  );
}
