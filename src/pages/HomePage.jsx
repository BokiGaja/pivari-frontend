import React from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import ArticlePreview from '../components/Article/ArticlePreview/ArticlePreview';
import { Typography } from '@mui/material';
import { sanitizeResponseData } from '../utils/api/responseData';
import { ReactComponent as Separator } from '../assets/svg/separator.svg';
import { useNavigate } from 'react-router-dom';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { useSetAtom } from 'jotai/index';
import { pageScrolledAtom } from '../atoms';

const HomePage = () => {
  const navigate = useNavigate();
  const setPageScrolled = useSetAtom(pageScrolledAtom);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPageScrolled(false);
  };
  const { data: homePageData, error, isLoading } = useGetCollection('home-page', 'sr', 'articles.cover_image');
  const articles = sanitizeResponseData(homePageData?.data?.attributes, 'articles');

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
      <div className="flex flex-col justify-center items-center">
        {articles?.map((article, index) => (
          <div
            key={article.updatedAt}
            className="flex flex-col lg:w-8/12 w-full justify-center items-center"
            onClick={() => {
              navigate(`/article/${article.title?.replace(' ', '-')}`);
              scrollToTop();
            }}
          >
            {index !== 0 && <Separator className="flex lg:w-full w-10/12 h-10 my-10" />}
            <ArticlePreview article={article} />
          </div>
        )) || null}
      </div>
    </PageLayout>
  );
};

export default HomePage;
