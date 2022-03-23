/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { ThemeProvider } from '@emotion/react';
import ErrorDialog from 'app/components/ErrorDialog';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import theme from '../theme';
import NavBar from './components/NavBar';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { UserContextProvider } from './contexts/user.context';
import { HomePage } from './pages/HomePage/Loadable';
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
        <UserContextProvider>
          <div>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shoppingCart" element={<ShoppingCart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<NotFoundPage />} />
            </Routes>
          </div>
        </UserContextProvider>
        <ErrorDialog />
      </ThemeProvider>
      <GlobalStyle />
    </>
  );
}
