import React from 'react';
import PageLayout from '../components/layout/PageLayout.js';
import ArticlePreview from '../components/Article/ArticlePreview/ArticlePreview';
import { useGetHomePageArticles } from '../services/hooks/useGetHomePageArticles';
// import { ReactComponent as Separator } from '../assets/svg/separator.svg';

const HomePage = () => {
  const { data: homePageData } = useGetHomePageArticles();
  return (
    <PageLayout>
      {homePageData?.articles?.data?.map((article) => (
        <div key={article.id}>
          <ArticlePreview article={article.attributes} />
          {/*<Separator className="flex w-full h-24" />*/}
        </div>
      )) || null}
    </PageLayout>
  );
};

export default HomePage;
