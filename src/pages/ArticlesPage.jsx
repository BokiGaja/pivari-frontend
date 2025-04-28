import React, { useMemo } from 'react';
import PageLayout from '../components/layout/PageLayout';
// import Text from '../components/Text/Text';
import { useSearchParams } from 'react-router-dom';
import { sanitizeResponseData } from '../utils/api/responseData';
// import { CircularProgress, Typography } from '@mui/material';
import { Typography } from '@mui/material';
import ArticleListItem from '../components/Article/ArticleListItem/ArticleListItem';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../atoms';
import { useTranslation } from 'react-i18next';
// import SearchBar from '../components/SearchBar/SearchBar';
import useSetPageTitle from '../hooks/useSetPageTitle';
import DynamicHelmet from '../components/DynamicHelmet/DynamicHelmet';
import { getLocalData, getAllCategories } from '../services/api/localDataService';

const ArticlesPage = () => {
  const [searchParams] = useSearchParams();
  // const [searchParams] = useSearchParams();
  // const { ref, inView } = useInView({});
  const [currentLang] = useAtom(localeLanguageAtom);
  const { t } = useTranslation();
  // const [searchTitle, setSearchTitle] = React.useState('');
  useSetPageTitle(t('navbar.articles'));

  const selectedCategory = searchParams.get('category');

  const articlesData = useMemo(() => {
    const data = getLocalData('article', currentLang);
    const allCategories = getAllCategories(currentLang);

    let articles = data.data.map((article) => {
      // Expand categories to full objects
      let expandedCategories = [];
      if (Array.isArray(article.attributes.categories)) {
        expandedCategories = article.attributes.categories
          .map(catId => allCategories.find(cat => cat.id === catId))
          .filter(Boolean);
      }
      return {
        ...article.attributes,
        categories: expandedCategories,
        cover_image: sanitizeResponseData(article.attributes, 'cover_image')?.url,
      };
    });

    if (selectedCategory) {
      articles = articles.filter(article =>
        Array.isArray(article.categories)
          ? article.categories.some(cat => cat && cat.name === selectedCategory)
          : false
      );
    }

    // Sort by publishedAt, newest first
    articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    return articles;
  }, [currentLang, selectedCategory]);

  // Commented out filter/search logic
  // const selectedCategory = ...
  // const { isLocaleChanged: isArticleLocaleChanged } = ...
  // const { isLocaleChanged: isCategoryLocaleChanged } = ...

  const content = useMemo(() => {
    if (!articlesData?.length)
      return (
        <div className="flex p-5 mt-5 h-96 text-maltYellow bg-blackBackground items-center justify-center">
          <Typography variant="h4" className="text-maltYellow">
            {t('articles.noArticles')}
          </Typography>
        </div>
      );
    return articlesData?.map((article) => (
      <ArticleListItem key={article.createdAt} article={article} />
    ));
  }, [articlesData]);

  // const isLoading = isCategoryLocaleChanged || isArticleLocaleChanged;
  const isLoading = false;

  return (
    <PageLayout isLoading={isLoading}>
      <DynamicHelmet name={t('navbar.articles')} />
      {/* <div className="absolute lg:top-[100px] top-[250px]"> ... </div> */}
      {/* <SearchBar handleSubmit={searchArticles} handleClear={() => searchArticles('')} /> */}
      <div className="flex flex-col items-center justify-start min-h-screen">
        {content}
      </div>
    </PageLayout>
  );
};

export default ArticlesPage;
