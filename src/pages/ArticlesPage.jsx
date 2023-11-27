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

  const { status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['articles'],
    queryFn: ({ pageParam }) =>
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/articles?_page=${pageParam}`, {
          params: {
            locale: 'sr',
            populate: '*',
            'filters[categories][name][$eq]': searchParams?.get('category'),
          },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  // console.log(data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage);

  // const content = data?.pages?.map((articles) =>
  //   articles?.data?.map((article) => {
  //     console.log(article);
  //     return (
  //       <p key={article?.attributes?.createdAt} className="text-white">
  //         JBT JBT JBT
  //       </p>
  //     );
  //     return <ArticleListItem key={article.createdAt} article={article} />;
  //   })
  // );

  const {
    data: articlesData,
    isLoading: isLoadingArticles,
    refetch,
    isRefetching: isRefetchingArticles,
  } = useGetCollection('articles', 'sr', '*', {
    'filters[categories][name][$eq]': searchParams?.get('category') || '',
  });

  const { data: categoriesData, isLoading: isLoadingCollections } = useGetCollection('categories');

  const sanitizedArticlesData = articlesData?.data?.map((article) => ({
    ...article.attributes,
    cover_image: sanitizeResponseData(article.attributes, 'cover_image')?.url,
  }));

  const content = sanitizedArticlesData?.map((article, index) => {
    console.log(article, isLoadingArticles);
    if (sanitizedArticlesData.length === index + 1) {
      return <ArticleListItem key={article.createdAt} innerRef={ref} article={article} />;
    }
    return <ArticleListItem key={article.createdAt} article={article} />;
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('fire');

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
      {isRefetchingArticles ? (
        <div className="flex p-5 mt-5 h-96 text-maltYellow bg-blackBackground items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start min-h-screen">
          {content}
          {isFetchingNextPage && <h3>Loading</h3>}
          {/* {sanitizedArticlesData?.map((article) => (
            <ArticleListItem key={article.createdAt} article={article} />
          ))} */}
        </div>
      )}
    </PageLayout>
  );
};

export default ArticlesPage;
