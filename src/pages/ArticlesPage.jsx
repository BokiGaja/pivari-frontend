import React, { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';
import { useSearchParams } from 'react-router-dom';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { sanitizeResponseData } from '../utils/api/responseData';
import { CircularProgress } from '@mui/material';

import ArticleListItem from '../components/Article/ArticleListItem/ArticleListItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const ArticlesPage = () => {
  const [searchParams] = useSearchParams();

  const { ref, inView } = useInView({});

  const {
    data: articlesPageData,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    isInitialLoading: isLoadingArticles,
  } = useInfiniteQuery({
    queryKey: ['articles'],
    queryFn: ({ pageParam }) =>
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/articles`, {
          params: {
            locale: 'sr',
            populate: '*',
            'filters[categories][name][$eq]': searchParams?.get('category'),
            'pagination[page]': pageParam,
            'pagination[pageSize]': 5,
            'pagination[withCount]': true,
          },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err)),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.pagination?.pageCount > lastPage?.meta?.pagination?.page
        ? lastPage?.meta?.pagination?.page + 1
        : undefined;
    },
  });
  const articlesData = articlesPageData?.pages?.map((articles) => articles?.data).flat();

  const { data: categoriesData, isLoading: isLoadingCollections } = useGetCollection('categories');

  const sanitizedArticlesData = articlesData?.map((article) => ({
    ...article.attributes,
    cover_image: sanitizeResponseData(article.attributes, 'cover_image')?.url,
  }));

  const content = sanitizedArticlesData?.map((article, index) => {
    if (sanitizedArticlesData.length === index + 1) {
      return <ArticleListItem key={article.createdAt} innerRef={ref} article={article} />;
    }
    return <ArticleListItem key={article.createdAt} article={article} />;
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const selectedCategory = categoriesData?.data?.find(
    (category) => category.attributes.name === searchParams?.get('category')
  );

  const categoryCoverImage = sanitizeResponseData(selectedCategory?.attributes, 'cover_image')?.url;

  useEffect(() => {
    refetch().catch((err) => console.log(err));
  }, [searchParams, refetch]);

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }

  return (
    <PageLayout isLoading={isLoadingArticles || isLoadingCollections}>
      <div className="absolute lg:top-[100px] top-[250px]">
        <img
          src={categoryCoverImage}
          alt={selectedCategory?.attributes.name}
          className="w-screen h-[200px] rounded-b-3xl brightness-50 blur-[5px] object-cover"
        />
        <Text
          size="large"
          color="maltYellow"
          text={searchParams?.get('category')}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:text-7xl text-4xl font-bold text-center break-all mb-4"
        />
      </div>
      <div className="lg:h-[200px] h-[320px]" />
      {isLoadingArticles ? (
        <div className="flex p-5 mt-5 h-96 text-maltYellow bg-blackBackground items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start min-h-screen">
          {content}
          {isFetchingNextPage && (
            <div className="flex p-5 mt-5 h-96 text-maltYellow bg-blackBackground items-center justify-center">
              <CircularProgress color="inherit" />
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default ArticlesPage;
