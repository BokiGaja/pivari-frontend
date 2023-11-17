import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';

const AboutUsPage = () => {
  return (
    <PageLayout>
      <div className="flex items-center justify-center h-screen">
        <Text size="large" color="maltYellow" text={'O nama'} />
      </div>
    </PageLayout>
  );
};

export default AboutUsPage;
