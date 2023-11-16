import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ROUTES } from './constants/routes';
import ArticlesPage from './pages/ArticlesPage';
import MembersPage from './pages/MembersPage';
import SponsorsPage from './pages/SponsorsPage';
import AboutUsPage from './pages/AboutUsPage';
import PageNotFoundPage from './pages/PageNotFoundPage';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route exact path={ROUTES.HOME} element={<HomePage />} />
          <Route exact path={ROUTES.ARTICLES} element={<ArticlesPage />} />
          <Route exact path={ROUTES.MEMBERS} element={<MembersPage />} />
          <Route exact path={ROUTES.SPONSORS} element={<SponsorsPage />} />
          <Route exact path={ROUTES.ABOUT_US} element={<AboutUsPage />} />
          <Route exact path={ROUTES.PAGE_404} element={<PageNotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
