import React from 'react';
import { useGetCollection } from '../../services/api/hooks/useGetCollection';
import Text from '../Text/Text';
import Markdown from 'react-markdown';
import MarkdownImage from '../Markdown/MarkdownImage';

const AboutUs = () => {
  const { data: aboutUsData, isLoading, error } = useGetCollection('about-us', 'sr', '*');
  const aboutUs = aboutUsData?.data?.attributes;

  if (isLoading || error) return null;

  return (
    <div className="lg:flex mt-[100px] lg:mt-0 flex-col items-center">
      <Text size="large" color="maltYellow" className="text-4xl mb-4 text-center" text={'O nama'} />
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
