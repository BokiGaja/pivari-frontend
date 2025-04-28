import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { useParams } from 'react-router-dom';
import Text from '../components/Text/Text';
import Markdown from 'react-markdown';
import MarkdownImage from '../components/Markdown/MarkdownImage';
import ArticleFooter from '../components/Article/ArticleFooter/ArticleFooter';
import ArticleEventInfo from '../components/Article/ArticleEventInfo/ArticleEventInfo';
import { Typography } from '@mui/material';
import pivariLogo from '../assets/logos/pivari-logo.png';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../atoms';
import { useTranslation } from 'react-i18next';
import CarouselSlider from '../components/Carousel/CarouselSlider';
import { isLocaleValid } from '../utils/locale/validation';
import useSetPageTitle from '../hooks/useSetPageTitle';
import MarkdownLink from '../components/Markdown/MarkdownLink';
import MarkdownH2 from '../components/Markdown/MarkdownH2';
import MarkdownH1 from '../components/Markdown/MarkdownH1';
import DynamicHelmet from '../components/DynamicHelmet/DynamicHelmet';
import { getArticleByTitle, getMediaUrlById } from '../services/api/localDataService';

const SingleArticlePage = () => {
  const params = useParams();
  const [currentLang] = useAtom(localeLanguageAtom);
  const { t } = useTranslation();
  const paramsLocale = params?.locale;
  const locale = isLocaleValid(paramsLocale) ? paramsLocale : currentLang;
  useSetPageTitle(params?.name?.replaceAll('-', ' '));

  const article = getArticleByTitle(params?.name?.replaceAll('-', ' '), locale);
  const carouselData = Array.isArray(article?.carousel)
    ? article.carousel.map(id => ({ attributes: { url: getMediaUrlById(id) } }))
    : [];
  if (!article) {
    return (
      <PageLayout>
        <div className="flex p-5 mt-5 h-96 bg-blackBackground items-center justify-center">
          <Typography variant="h4" className="text-maltYellow">
            {t('articles.noArticle')}
          </Typography>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <DynamicHelmet
        name={article?.title}
        image={article?.cover_image ? article.cover_image : pivariLogo}
      />
      <div className="lg:flex lg:flex-col items-center lg:px-20">
        <div className="absolute lg:top-[100px] top-[200px]">
          <img
            src={article.cover_image ? article.cover_image : pivariLogo}
            alt={`${article.title} image`}
            className="w-screen h-[200px] rounded-b-3xl object-cover"
          />
        </div>
        <div className="lg:px-20">
          <Text
            size="large"
            color="maltYellow"
            text={article.title}
            className="lg:text-7xl text-5xl font-bold text-center my-4 lg:mt-[180px] mt-[250px]"
          />
          {(article.start_date || article.address) && <ArticleEventInfo article={article} />}
        </div>
        <Markdown
          className="flex flex-col whitespace-pre-wrap self align-center justify-center items-center text-center text-white lg:mt-0 mt-4 px-4 lg:px-40 text-lg"
          components={{ p: React.Fragment, img: MarkdownImage, a: MarkdownLink, h2: MarkdownH2, h1: MarkdownH1 }}
        >
          {article.content}
        </Markdown>
        {article.carousel && <CarouselSlider carouselData={carouselData} />}
        <div className="flex mt-20 justify-between w-full lg:px-40">
          <ArticleFooter article={article} />
        </div>
      </div>
    </PageLayout>
  );
};

export default SingleArticlePage;
