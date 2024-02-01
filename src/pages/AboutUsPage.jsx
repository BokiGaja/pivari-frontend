import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import AboutUs from '../components/AboutUs/AboutUs';
import useSetPageTitle from '../hooks/useSetPageTitle';
import { useTranslation } from 'react-i18next';

const AboutUsPage = () => {
  const { t } = useTranslation();

  useSetPageTitle(t('navbar.aboutUs'));

  return (
    <PageLayout isLoading={false}>
      <div className="lg:flex lg:flex-col lg:items-center mt-[70px] lg:mt-0">
        <AboutUs />
      </div>
    </PageLayout>
  );
};

export default AboutUsPage;
