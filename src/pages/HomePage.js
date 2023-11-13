import React from 'react';
import PageLayout from '../components/layout/PageLayout.js';
import ArticlePreview from '../components/Article/ArticlePreview/ArticlePreview';
import { useGetArticles } from '../services/hooks/useGetArticles';

const HomePage = () => {
  const { data: articlesData } = useGetArticles();
  return (
    <PageLayout>
      {articlesData?.data.map((article) => (
        <ArticlePreview key={article.id} article={article.attributes} />
      ))}
    </PageLayout>
  );
};

export default HomePage;
