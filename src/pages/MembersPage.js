import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';
import { sanitizeResponseData } from '../utils/api/responseData';
import { useGetCollection } from '../services/api/hooks/useGetCollection';

import { ReactComponent as FacebookIcon } from '../assets/svg/socialIcons/icon-facebook.svg';
import { ReactComponent as InstagramIcon } from '../assets/svg/socialIcons/icon-instagram.svg';
import { ReactComponent as EmailIcon } from '../assets/svg/socialIcons/icon-email.svg';
import { ReactComponent as Separator } from '../assets/svg/separator.svg';

const MembersPage = () => {
  const { data: membersData, isLoading } = useGetCollection('members');
  const members = membersData?.data?.map((member) => ({
    ...member.attributes,
    logo: sanitizeResponseData(member.attributes, 'logo')?.url,
  }));
  console.log('membersData', members);

  return (
    <PageLayout isLoading={isLoading}>
      <div className="flex flex-col items-center px-20">
        {members.map((member, index) => (
          <React.Fragment key={member?.createdAt}>
            {index !== 0 && <Separator className="flex w-full h-10 my-10" />}
            <div className="flex flex-col justify-center tems-stretch px-[30px] border border-maltYellow rounded-3xl mt-5 h-[300px] bg-guinessBlack w-[60%] hover:scale-105 hover:cursor-pointer transition-all duration-[500ms]">
              <div className="flex gap-2">
                <div className="flex w-[200px] mr-[50px] min-h-[200px] items-center">
                  <img alt={`${member?.name} logo`} src={member?.logo} />
                </div>
                <div className="flex flex-col align-start justify-between">
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
