import React from 'react';
import { useGetCollection } from '../../services/api/hooks/useGetCollection';
import Text from '../Text/Text';
import Markdown from 'react-markdown';
import MarkdownImage from '../Markdown/MarkdownImage';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../../atoms';
import useRefetchLocale from '../../hooks/useRefetchLocale/useRefetchLocale';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const [currentLang] = useAtom(localeLanguageAtom);
  const { data: aboutUsData, isLoading, refetch } = useGetCollection('about-us', currentLang, '*');
  const aboutUs = aboutUsData?.data?.attributes;
  const { t } = useTranslation();

  const { isLocaleChanged } = useRefetchLocale({ refetch, locale: aboutUs?.locale });

  if (isLoading || isLocaleChanged)
    return (
      <div className="flex p-5 mt-5 h-96 text-maltYellow bg-blackBackground items-center justify-center">
        <CircularProgress color="inherit" />
      </div>
    );

  return (
    <div className="lg:flex flex-col items-center">
      <Text size="large" color="maltYellow" className="text-4xl mb-4 text-center" text={t('aboutUs.title')} />
      <Markdown
        className="flex whitespace-pre-wrap flex-col justify-center lg:items-center text-center text-white lg:mt-0 mt-4 max-w-[700px]"
        components={{ p: React.Fragment, img: MarkdownImage }}
      >
        {aboutUs.text}
      </Markdown>
    </div>
  );
};

export default AboutUs;
