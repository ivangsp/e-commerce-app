/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@emotion/react';

import { GlobalStyle } from 'styles/global-styles';
import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import theme from '../theme';
import NavBar from './components/NavBar';
import ShoppingCart from './pages/ShoppingCart';

export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <div>
          <NavBar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shoppingCart" element={<ShoppingCart />} />
              <Route element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
