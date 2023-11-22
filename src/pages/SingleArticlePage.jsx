import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { useParams } from 'react-router-dom';
import Text from '../components/Text/Text';
import Markdown from 'react-markdown';
import MarkdownImage from '../components/Markdown/MarkdownImage';
import ArticleFooter from '../components/Article/ArticleFooter/ArticleFooter';
import ArticleEventInfo from '../components/Article/ArticleEventInfo/ArticleEventInfo';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { Typography } from '@mui/material';
import pivariLogo from '../assets/logos/pivari-logo.png';

const SingleArticlePage = () => {
  const params = useParams();
  const {
    data: articleData,
    isLoading,
    error,
  } = useGetCollection('articles', 'sr', '*', {
    'filters[title][$eq]': params?.name?.replaceAll('-', ' '),
  });
  const article = articleData?.data?.[0]?.attributes;

  if (error || !article)
    return (
      <PageLayout>
        <div className="flex p-5 mt-5 h-96 bg-blackBackground items-center justify-center">
          <Typography variant="h4" className="text-maltYellow">
            {'Artikal ne postoji'}
          </Typography>
        </div>
      </PageLayout>
    );

  return (
    <PageLayout isLoading={isLoading}>
      <div className="lg:flex lg:flex-col items-center">
        <div className="absolute lg:top-[100px] top-[200px]">
          <img
            src={article?.cover_image?.data ? article.cover_image.data.attributes.url : pivariLogo}
            alt={`${article.title} image`}
            className="w-screen h-[200px] rounded-b-3xl object-cover"
          />
        </div>
        <div>
          <Text
            size="large"
            color="maltYellow"
            text={article.title}
            className="text-7xl font-bold text-center break-all my-4 lg:mt-[180px] mt-[250px]"
          />
          {(article.start_date || article.address) && <ArticleEventInfo article={article} />}
        </div>
        <Markdown
          className="flex flex-col self align-center justify-center text-center text-white lg:mt-0 mt-4"
          components={{ p: React.Fragment, img: MarkdownImage }}
        >
          {article.content}
        </Markdown>
        <div className="flex mt-20 justify-between w-full lg:px-40">
          <ArticleFooter article={article} />
        </div>
      </div>
    </PageLayout>
  );
};

export default SingleArticlePage;
