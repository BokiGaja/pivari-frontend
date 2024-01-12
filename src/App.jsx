import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ROUTES } from './constants/routes';
import ArticlesPage from './pages/ArticlesPage';
import MembersPage from './pages/MembersPage';
import SponsorsPage from './pages/SponsorsPage';
import AboutUsPage from './pages/AboutUsPage';
import PageNotFoundPage from './pages/PageNotFoundPage';
import SingleArticlePage from './pages/SingleArticlePage';
import SingleMemberPage from './pages/SingleMemberPage';
import RecipesPage from './pages/RecipesPage';
import SingleRecipePage from './pages/SingleRecipePage';
import './i18n/i18n';
import ReactGA from 'react-ga4';

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route exact path={ROUTES.HOME} element={<HomePage />} />
          <Route exact path={ROUTES.ARTICLE} element={<SingleArticlePage />} />
          <Route exact path={ROUTES.RECIPE} element={<SingleRecipePage />} />
          <Route exact path={ROUTES.RECIPES} element={<RecipesPage />} />
          <Route exact path={ROUTES.ARTICLES} element={<ArticlesPage />} />
          <Route exact path={ROUTES.MEMBER} element={<SingleMemberPage />} />
          <Route exact path={ROUTES.MEMBERS} element={<MembersPage />} />
          <Route exact path={ROUTES.SPONSORS} element={<SponsorsPage />} />
          <Route exact path={ROUTES.SPONSOR} element={<SingleMemberPage />} />
          <Route exact path={ROUTES.ABOUT_US} element={<AboutUsPage />} />
          <Route exact path={ROUTES.PAGE_404} element={<PageNotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
