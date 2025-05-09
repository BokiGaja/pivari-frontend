import React from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import ArticlePreview from '../components/Article/ArticlePreview/ArticlePreview';
import { Typography } from '@mui/material';
import { sanitizeResponseData } from '../utils/api/responseData';
import { ReactComponent as Separator } from '../assets/svg/separator.svg';
import { useNavigate } from 'react-router-dom';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { useAtom, useSetAtom } from 'jotai';
import { localeLanguageAtom, pageScrolledAtom } from '../atoms';
import useRefetchLocale from '../hooks/useRefetchLocale';
import { useTranslation } from 'react-i18next';
import useSetPageTitle from '../hooks/useSetPageTitle';
import DynamicHelmet from '../components/DynamicHelmet/DynamicHelmet';

const HomePage = () => {
  const navigate = useNavigate();
  const setPageScrolled = useSetAtom(pageScrolledAtom);
  const { t } = useTranslation();
  useSetPageTitle(t('navbar.home'));

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPageScrolled(false);
  };
  const [currentLang] = useAtom(localeLanguageAtom);

  const { data: homePageData, isLoading, refetch } = useGetCollection('home-page', currentLang, 'articles.cover_image');
  const articles = sanitizeResponseData(homePageData?.data?.[0]?.attributes, 'articles');
  const { isLocaleChanged } = useRefetchLocale({ refetch, locale: articles[0]?.locale });

  if (!articles.length && !isLoading) {
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
    <PageLayout isLoading={isLoading || isLocaleChanged}>
      <DynamicHelmet name={t('navbar.home')} />
      {articles?.length && (
        <div className="flex flex-col justify-center items-center lg:mt-0 mt-20">
          {articles?.map((article, index) => (
            <div key={article.updatedAt} className="flex flex-col lg:w-8/12 w-full justify-center items-center">
              {index !== 0 && <Separator className="flex lg:w-full w-10/12 h-10 my-10" />}
              <ArticlePreview
                article={article}
                onClick={() => {
                  navigate(`/article/${currentLang}/${article.title?.replaceAll(' ', '-')}`);
                  scrollToTop();
                }}
              />
            </div>
          )) || null}
        </div>
      )}
    </PageLayout>
  );
};

export default HomePage;
