import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';
import { sanitizeResponseData } from '../utils/api/responseData';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import { ReactComponent as FacebookIcon } from '../assets/svg/socialIcons/icon-facebook.svg';
import { ReactComponent as InstagramIcon } from '../assets/svg/socialIcons/icon-instagram.svg';
import { ReactComponent as EmailIcon } from '../assets/svg/socialIcons/icon-email.svg';
import { ReactComponent as Separator } from '../assets/svg/separator.svg';

const MembersPage = () => {
  const navigate = useNavigate();
  const { data: membersData, isLoading } = useGetCollection('members');
  const members = membersData?.data?.map((member) => ({
    ...member.attributes,
    logo: sanitizeResponseData(member.attributes, 'logo')?.url,
  }));

  if (!members?.length) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-screen">
          <Typography variant="h4" className="text-maltYellow">
            {'Nema članova'}
          </Typography>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout isLoading={isLoading}>
      <div className="flex flex-col lg:mt-0 mt-[150px] lg:items-center lg:px-20">
        {members?.map((member, index) => (
          <React.Fragment key={member?.createdAt}>
            {index !== 0 && <Separator className="flex hg:w-full w-10/12 self-center h-10 my-10" />}
            <div
              className="flex flex-col justify-center tems-stretch border border-maltYellow rounded-3xl mt-5 bg-guinessBlack lg:w-6/12 w-full hover:scale-105 hover:cursor-pointer transition-all duration-[500ms]"
              onClick={() => {
                navigate(`/member/${member.name?.replaceAll(' ', '-')}`);
              }}
            >
              <div className="flex gap-2">
                <div
                  className={`flex w-[200px] lg:mr-[50px] min-w-[200px] min-h-[200px] items-center relative overflow-hidden rounded-l-3xl`}
                >
                  <img
                    alt={`${member?.name} logo`}
                    src={member?.logo}
                    className="absolute min-w-[1000%] min-h-[1000%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-[0.1001]"
                  />
                </div>
                <div className="flex flex-col align-start justify-between py-[20px]">
                  <div>
                    <Text className="mb-[15px]" size={'large'} color={'maltYellow'} text={member?.name} />
                    <Text size="medium" color="white" text={member?.description} />
                  </div>
                  <div className="flex gap-[25px] mt-4">
                    <div className="flex min-h-[2.5rem] items-center">
                      <a href={member.facebook} rel="noreferrer" target="_blank">
                        <FacebookIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all duration-[350ms]" />
                      </a>
                    </div>
                    <div className="flex min-h-[2.5rem] items-center">
                      <a href={member.instagram} rel="noreferrer" target="_blank">
                        <InstagramIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all duration-[350ms]" />
                      </a>
                    </div>
                    <div className="flex min-h-[2.5rem] items-center">
                      <a href={`mailto:${member.email}`} rel="noreferrer" target="_blank">
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

export default MembersPage;
