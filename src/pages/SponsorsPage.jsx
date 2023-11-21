import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { sanitizeResponseData } from '../utils/api/responseData';
import { Typography } from '@mui/material';

import { ReactComponent as FacebookIcon } from '../assets/svg/socialIcons/icon-facebook.svg';
import { ReactComponent as InstagramIcon } from '../assets/svg/socialIcons/icon-instagram.svg';
import { ReactComponent as EmailIcon } from '../assets/svg/socialIcons/icon-email.svg';
import { ReactComponent as Separator } from '../assets/svg/separator.svg';

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
      <div className="flex flex-col items-center px-20">
        {sponsors?.map((sponsor, index) => (
          <React.Fragment key={sponsor?.createdAt}>
            {index !== 0 && <Separator className="flex w-full h-10 my-10" />}
            <div className="flex flex-col justify-center tems-stretch border-[3px] overflow-hidden border-maltYellow rounded-3xl mt-5  bg-guinessBlack w-6/12 hover:scale-105 hover:cursor-pointer transition-all duration-[500ms]">
              <div className="flex gap-2 ">
                <div className={`flex min-w-[250px] min-h-[250px] items-center relative `}>
                  <img
                    alt={`${sponsor?.name} logo`}
                    src={sponsor?.logo}
                    className="absolute min-w-[1000%] min-h-[1000%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-[0.1001]"
                  />
                </div>
                <div className="flex flex-col items-center justify-between p-[20px] w-[60%]">
                  <div className="flex flex-col items-center">
                    <Text
                      className="mb-[15px] text-center font-bold text-[35px]"
                      size={'large'}
                      color={'maltYellow'}
                      text={sponsor?.name}
                    />
                    <Text className="text-center" size="medium" color="white" text={sponsor?.description} />
                  </div>
                  <div className="flex gap-[25px] mt-4">
                    <div className="flex min-h-[2.5rem] items-center">
                      <a href={sponsor.facebook} rel="noreferrer" target="_blank">
                        <FacebookIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all duration-[350ms]" />
                      </a>
                    </div>
                    <div className="flex min-h-[2.5rem] items-center">
                      <a href={sponsor.instagram} rel="noreferrer" target="_blank">
                        <InstagramIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all duration-[350ms]" />
                      </a>
                    </div>
                    <div className="flex min-h-[2.5rem] items-center">
                      <a href={`mailto:${sponsor.email}`} rel="noreferrer" target="_blank">
                        <EmailIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all duration-[350ms]" />
                      </a>
                    </div>
                  </div>
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
