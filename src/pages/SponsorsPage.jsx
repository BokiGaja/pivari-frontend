import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { sanitizeResponseData } from '../utils/api/responseData';
import { Typography } from '@mui/material';

import { ReactComponent as Separator } from '../assets/svg/separator.svg';
import SponsorPreviewCard from '../components/Sponsor/SponsorPreview/SponsorPreviewCard';

const SponsorsPage = () => {
  const { data: sponsorsData, isLoading } = useGetCollection('sponsors');
  const sponsors = sponsorsData?.data?.map((sponsor) => ({
    ...sponsor.attributes,
    logo: sanitizeResponseData(sponsor.attributes, 'logo')?.url,
  }));

  if (!sponsors?.length) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-screen">
          <Typography variant="h4" className="text-maltYellow">
            {'Nema sponzora'}
          </Typography>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout isLoading={isLoading}>
      <div className="flex flex-col items-center lg:px-20 px-5 mt-24">
        {sponsors?.map((sponsor, index) => (
          <React.Fragment key={sponsor?.createdAt}>
            {index !== 0 && <Separator className="flex w-full h-10 my-10" />}
            <SponsorPreviewCard sponsor={sponsor} />
          </React.Fragment>
        ))}
      </div>
    </PageLayout>
  );
};

export default SponsorsPage;
