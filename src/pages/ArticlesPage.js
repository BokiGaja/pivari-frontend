import React, { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';
import { useSearchParams } from 'react-router-dom';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { sanitizeResponseData } from '../utils/api/responseData';
import ArticleListItem from '../components/Article/ArticleListItem/ArticleListItem';

const ArticlesPage = () => {
  const [searchParams] = useSearchParams();
  const {
    data: articlesData,
    isLoading: isLoadingArticles,
    refetch,
  } = useGetCollection('articles', 'sr', '*', {
    'filters[categories][name][$eq]': searchParams?.get('category') || '',
  });
  const { data: categoriesData, isLoading: isLoadingCollections } = useGetCollection('categories');
  const sanitizedArticlesData = articlesData?.data?.map((article) => ({
    ...article.attributes,
    cover_image: sanitizeResponseData(article.attributes, 'cover_image')?.url,
  }));
  const selectedCategory = categoriesData?.data?.find(
    (category) => category.attributes.name === searchParams?.get('category')
  );
  const categoryCoverImage = sanitizeResponseData(selectedCategory?.attributes, 'cover_image')?.url;

  useEffect(() => {
    refetch().catch((err) => console.log(err));
  }, [searchParams, refetch]);

  return (
    <PageLayout isLoading={isLoadingArticles || isLoadingCollections}>
      <div className="absolute top-[100px] ">
        <img
          src={categoryCoverImage}
          alt={selectedCategory?.attributes.name}
          className="w-screen h-[200px] rounded-b-3xl brightness-50 blur-[5px] object-cover"
        />
        <Text
          size="large"
          color="maltYellow"
          text={searchParams?.get('category')}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-bold text-center break-all mb-4"
        />
      </div>
      <div className="h-[200px]" />
      <div className="flex flex-col items-center justify-start h-screen">
        {sanitizedArticlesData?.map((article) => (
          <ArticleListItem key={article.createdAt} article={article} />
        ))}
      </div>
    </PageLayout>
  );
};

export default ArticlesPage;
