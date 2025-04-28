import React, { useMemo } from 'react';
import Text from '../Text/Text';
import Markdown from 'react-markdown';
import MarkdownImage from '../Markdown/MarkdownImage';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../../atoms';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CarouselSlider from '../Carousel/CarouselSlider';
import { ReactComponent as BeerGlass } from '../../assets/svg/beer-glass.svg';
import MarkdownLink from '../Markdown/MarkdownLink';
import MarkdownH2 from '../Markdown/MarkdownH2';
import MarkdownH1 from '../Markdown/MarkdownH1';
import DynamicHelmet from '../DynamicHelmet/DynamicHelmet';
import { getLocalData, getMediaUrlById } from '../../services/api/localDataService';

const AboutUs = () => {
  const [currentLang] = useAtom(localeLanguageAtom);
  const { t } = useTranslation();

  // Fetch about-us data from local JSON
  const aboutUs = useMemo(() => {
    const data = getLocalData('about-us', currentLang);
    return data.data[0]?.attributes;
  }, [currentLang]);

  // Expand carousel data to actual URLs
  const carouselData = Array.isArray(aboutUs?.carousel?.data)
    ? aboutUs.carousel.data.map(item =>
        typeof item === 'object' && item.attributes && item.attributes.url
          ? { attributes: { url: getMediaUrlById(item.attributes.url) } }
          : { attributes: { url: getMediaUrlById(item) } }
      )
    : [];

  if (!aboutUs?.text) {
    return (
      <div className="flex p-5 mt-5 h-96 bg-blackBackground items-center justify-center">
        <Typography variant="h4" className="text-maltYellow">
          {t('aboutUs.noText')}
        </Typography>
      </div>
    );
  }
  const LiComponent = (props) => {
    return (
      <li className="flex flex-row items-center text-start mt-4">
        <BeerGlass className="absolute h-10 w-10 mr-5" />
        {/* eslint-disable-next-line react/prop-types */}
        <p className="ml-10">{props.children}</p>
      </li>
    );
  };

  return (
    <div className="lg:flex flex-col items-center">
      <DynamicHelmet name={t('navbar.aboutUs')} />
      <Text size="large" color="maltYellow" className="text-4xl mb-4 text-center" text={t('aboutUs.title')} />
      <Markdown
        className="flex whitespace-pre-wrap flex-col justify-center items-center lg:items-center text-center text-white lg:mt-0 mt-4 max-w-[700px] mx-auto lg:px-0 px-4"
        components={{
          p: React.Fragment,
          img: MarkdownImage,
          li: LiComponent,
          a: MarkdownLink,
          h2: MarkdownH2,
          h1: MarkdownH1,
        }}
      >
        {aboutUs.text}
      </Markdown>
      <div className="w-[95vw] lg:p-20 md:p-10 p-0">
        {carouselData && <CarouselSlider carouselData={carouselData} />}
      </div>
    </div>
  );
};

export default AboutUs;
