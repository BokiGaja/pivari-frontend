import React from 'react';
import PageLayout from '../components/layout/PageLayout.js';
import ArticlePreview from '../components/Article/ArticlePreview/ArticlePreview';

const HomePage = () => {
  const articles = [
    {
      title: 'title1',
    },
    {
      title: 'title2',
    },
    {
      title: 'title3',
    },
  ];

  return (
    <PageLayout>
      {articles.map((article) => (
        <ArticlePreview key={article.title} article={article} />
      ))}
    </PageLayout>
  );
};

export default HomePage;
