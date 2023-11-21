import React from 'react';
import PageLayout from '../components/layout/PageLayout';
// import Text from '../components/Text/Text';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { sanitizeResponseData } from '../utils/api/responseData';
import { Typography } from '@mui/material';

// import { ReactComponent as FacebookIcon } from '../assets/svg/socialIcons/icon-facebook.svg';
// import { ReactComponent as InstagramIcon } from '../assets/svg/socialIcons/icon-instagram.svg';
// import { ReactComponent as EmailIcon } from '../assets/svg/socialIcons/icon-email.svg';

const SponsorsPage = () => {
  const { data: sponsorsData, isLoading } = useGetCollection('sponsors');
  const sponsors = sponsorsData?.data?.map((sponsor) => ({
    ...sponsor.attributes,
    logo: sanitizeResponseData(sponsor.attributes, 'logo')?.url,
  }));
  console.log('sponsorsData', sponsors);

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
      <div className="flex flex-wrap justify-center items-center px-20 w-[80%] mx-auto">
        {sponsors?.map((sponsor) => (
          <React.Fragment key={sponsor?.createdAt}>
            <div className="flex flex-col justify-center items-center border border-maltYellow bg-guinessBlack min-w-[240px] min-h-[230px] hover:cursor-pointer">
              <div className="flex">
                <div
                  className={`flex w-[200px] min-w-[200px] min-h-[200px] items-center relative overflow-hidden hover:scale-105 transition-all duration-[500ms]`}
                >
                  <img
                    alt={`${sponsor?.name} logo`}
                    src={sponsor?.logo}
                    className="absolute min-w-[1000%] min-h-[1000%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-[0.1001]"
                  />
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </PageLayout>
  );
};

export default SponsorsPage;
