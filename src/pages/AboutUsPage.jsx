import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { Typography } from '@mui/material';

const AboutUsPage = () => {
  const {
    data: aboutUsData,
    error: aboutUsError,
    isLoading: isLoadingAboutUs,
  } = useGetCollection('about-us', 'sr', '*');
  const {
    data: contactUsData,
    error: contactUsError,
    isLoading: isLoadingContactUs,
  } = useGetCollection('contact-us', 'sr', '*');
  const aboutUs = aboutUsData?.data?.attributes;
  const contactUs = contactUsData?.data?.attributes;
  console.log(aboutUs, contactUs);

  if (aboutUsError || contactUsError)
    return (
      <PageLayout>
        <div className="flex p-5 mt-5 h-96 bg-blackBackground items-center justify-center">
          <Typography variant="h4" className="text-maltYellow">
            {'Nema podataka'}
          </Typography>
        </div>
      </PageLayout>
    );
  return (
    <PageLayout isLoading={isLoadingAboutUs || isLoadingContactUs}>
      <div className="flex items-center justify-center h-screen">
        <Text size="large" color="maltYellow" text={'O nama'} />
      </div>
    </PageLayout>
  );
};

export default AboutUsPage;
