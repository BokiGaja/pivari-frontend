import React from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import ArticlePreview from '../components/Article/ArticlePreview/ArticlePreview';
import { Typography } from '@mui/material';
import { sanitizeResponseData } from '../utils/api/responseData';
import { ReactComponent as Separator } from '../assets/svg/separator.svg';
import { useNavigate } from 'react-router-dom';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { useSetAtom } from 'jotai';
import { localeLanguageAtom, pageScrolledAtom } from '../atoms';
import useRefetchLocale from '../hooks/useRefetchLocale/useRefetchLocale';
import { useAtom } from 'jotai/index';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const navigate = useNavigate();
  const setPageScrolled = useSetAtom(pageScrolledAtom);
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPageScrolled(false);
  };
  const [currentLang] = useAtom(localeLanguageAtom);

  const {
    data: homePageData,
    error,
    isLoading,
    refetch,
  } = useGetCollection('home-page', currentLang, 'articles.cover_image');
  useRefetchLocale({ refetch });
  const articles = sanitizeResponseData(homePageData?.data?.attributes, 'articles');
  if (articles.length) {
    articles[0]?.locale !== currentLang && refetch();
  }

  if (!articles.length || error || articles?.[0]?.locale !== currentLang) {
    return (
      <PageLayout>
        <div className="flex p-5 mt-5 h-96 bg-blackBackground items-center justify-center">
          <Typography variant="h4" className="text-maltYellow">
            {t('articles.noArticles')}
          </Typography>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout isLoading={isLoading}>
      <div className="flex flex-col justify-center items-center lg:mt-0 mt-44">
        {articles?.map((article, index) => (
          <div key={article.updatedAt} className="flex flex-col lg:w-8/12 w-full justify-center items-center">
            {index !== 0 && <Separator className="flex lg:w-full w-10/12 h-10 my-10" />}
            <ArticlePreview
              article={article}
              onClick={() => {
                navigate(`/article/${article.title?.replaceAll(' ', '-')}`);
                scrollToTop();
              }}
            />
          </div>
        )) || null}
      </div>
    </PageLayout>
  );
};

export default HomePage;
