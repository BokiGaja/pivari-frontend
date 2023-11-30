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
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../atoms';
import useRefetchLocale from '../hooks/useRefetchLocale/useRefetchLocale';
import { useTranslation } from 'react-i18next';

import Carousel from 'react-multi-carousel';

const SingleArticlePage = () => {
  const params = useParams();
  const [currentLang] = useAtom(localeLanguageAtom);
  const { t } = useTranslation();

  const {
    data: articleData,
    isLoading,
    error,
    // isRefetching,
    refetch,
  } = useGetCollection('articles', currentLang, '*', {
    'filters[title][$eq]': params?.name?.replaceAll('-', ' '),
  });

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 3,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 2,
      partialVisibilityGutter: 30,
    },
  };

  const article = articleData?.data?.[0]?.attributes;

  const { isLocaleChanged } = useRefetchLocale({ refetch, locale: article?.locale });

  // const carouselImagesData = article?.carousel?.data;

  // const carouselContent = carouselImagesData?.map((img) => {
  //   console.log(img);
  //   return (
  //     <div key={img.id}>
  //       <img className="w-[200px]" src={img.attributes.url} alt={img.attributes.name} />
  //     </div>
  //   );
  // });

  if (error || !article)
    return (
      <PageLayout>
        <div className="flex p-5 mt-5 h-96 bg-blackBackground items-center justify-center">
          <Typography variant="h4" className="text-maltYellow">
            {t('articles.noArticle')}
          </Typography>
        </div>
      </PageLayout>
    );

  return (
    <PageLayout isLoading={isLoading || isLocaleChanged}>
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
          className="flex flex-col whitespace-pre-wrap self align-center justify-center text-center text-white lg:mt-0 mt-4"
          components={{ p: React.Fragment, img: MarkdownImage }}
        >
          {article.content}
        </Markdown>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={true}
          className="h-[200px] w-full"
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={true}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          <div className="w-[200px] h-[200px] ">
            <img
              className="w-[200px] h-[200px] "
              src="https://res.cloudinary.com/dqsymxc78/image/upload/v1700483073/4144930_2820d5d0db.jpg"
              alt="nesto"
            />
          </div>
          <div className="w-[200px] h-[200px] ">
            <img
              className="w-[200px] h-[200px] "
              src="https://res.cloudinary.com/dqsymxc78/image/upload/v1700571749/calsberg_rs_82091a145b.png"
              alt="nesto"
            />
          </div>
          <div className="w-[200px] h-[200px] ">
            <img
              className="w-[200px] h-[200px] "
              src="https://res.cloudinary.com/dqsymxc78/image/upload/v1700571384/jelen_Pivo_3f20d6d4f7.jpg"
              alt="nesto"
            />
          </div>
        </Carousel>
        <div className="flex mt-20 justify-between w-full lg:px-40">
          <ArticleFooter article={article} />
        </div>
      </div>
    </PageLayout>
  );
};

export default SingleArticlePage;
