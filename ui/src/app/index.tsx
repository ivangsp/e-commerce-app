import { ThemeProvider } from '@emotion/react';
import { AuthProvider } from 'contexts/AuthProvider';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import theme from '../theme';
import NavBar from './components/NavBar';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import RequireAuth from './components/RequireAuth';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ShoppingCart from './pages/ShoppingCart';
import SignUp from './pages/SignUp';

export function App() {
  const { i18n } = useTranslation();

  return (
    <>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/shoppingCart"
              element={
                <RequireAuth>
                  <ShoppingCart />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
      <GlobalStyle />
    </>
  );
}
