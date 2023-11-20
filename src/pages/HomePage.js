import React from 'react';
import PageLayout from '../components/layout/PageLayout.js';
import ArticlePreview from '../components/Article/ArticlePreview/ArticlePreview';
import { useGetHomePageArticles } from '../services/api/hooks/useGetHomePageArticles';
import { Typography } from '@mui/material';
import { sanitizeResponseData } from '../utils/api/responseData';
import { ReactComponent as Separator } from '../assets/svg/separator.svg';

const HomePage = () => {
  const { data: homePageData, error, isLoading } = useGetHomePageArticles();
  const articles = sanitizeResponseData(homePageData, 'articles');

  if (!articles.length || error) {
    return (
      <PageLayout>
        <div className="flex p-5 mt-5 h-96 bg-blackBackground items-center justify-center">
          <Typography variant="h4" className="text-maltYellow">
            {'Nema artikala'}
          </Typography>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout isLoading={isLoading}>
      {articles?.map((article, index) => (
        <div key={article.updatedAt} className="flex flex-col justify-center items-center">
          {index !== 0 && <Separator className="flex w-full h-10 my-10" />}
          <ArticlePreview article={article} />
        </div>
      )) || null}
    </PageLayout>
  );
};

export default HomePage;
