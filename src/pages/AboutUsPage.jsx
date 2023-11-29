import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import AboutUs from '../components/AboutUs/AboutUs';

const AboutUsPage = () => {
  return (
    <PageLayout isLoading={false}>
      <div className="lg:flex lg:flex-col lg:items-center mt-[140px] lg:mt-0">
        <AboutUs />
      </div>
    </PageLayout>
  );
};

export default AboutUsPage;
