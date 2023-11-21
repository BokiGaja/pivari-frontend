import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { sanitizeResponseData } from '../utils/api/responseData';

const SponsorsPage = () => {
  const { data: sponsorsData, isLoading } = useGetCollection('sponsors');
  const sponsors = sponsorsData?.data?.map((sponsor) => ({
    ...sponsor.attributes,
    logo: sanitizeResponseData(sponsor.attributes, 'logo')?.url,
  }));
  console.log('sponsorsData', sponsors);

  return (
    <PageLayout isLoading={isLoading}>
      <div className="flex items-center justify-center h-screen">
        <Text size="large" color="maltYellow" text={'Sponzori'} />
      </div>
    </PageLayout>
  );
};

export default SponsorsPage;
