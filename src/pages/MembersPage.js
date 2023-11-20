import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';
import { sanitizeResponseData } from '../utils/api/responseData';
import { useGetCollection } from '../services/api/hooks/useGetCollection';

import { ReactComponent as FacebookIcon } from '../assets/svg/socialIcons/icon-facebook.svg';
import { ReactComponent as InstagramIcon } from '../assets/svg/socialIcons/icon-instagram.svg';
import { ReactComponent as EmailIcon } from '../assets/svg/socialIcons/icon-email.svg';

const MembersPage = () => {
  const { data: membersData, isLoading } = useGetCollection('members');
  const members = membersData?.data?.map((member) => ({
    ...member.attributes,
    logo: sanitizeResponseData(member.attributes, 'logo')?.url,
  }));
  console.log('membersData', members);

  return (
    <PageLayout isLoading={isLoading}>
      <div className="px-20">
        {members.map((member) => (
          <div key={member?.createdAt} className="flex flex-col p-5 mt-5 h-96 bg-blackBackground">
            <div className="flex gap-2">
              <div className="w-[200px]">
                <img alt={`${member?.name} logo`} src={member?.logo} />
              </div>
              <div className="flex flex-col align-start">
                <Text size={'large'} color={'maltYellow'} text={member?.name} />
                <Text size="medium" color="maltYellow" text={member?.description} />
                <div className="flex">
                  <a href={member.facebook} rel="noreferrer" target="_blank">
                    <FacebookIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all" />
                  </a>
                  <a href={member.instagram} rel="noreferrer" target="_blank">
                    <InstagramIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all" />
                  </a>
                  <a href={`mailto:${member.email}`} rel="noreferrer" target="_blank">
                    <EmailIcon className="w-8 h-8 cursor-pointer hover:w-10 hover:h-10 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default MembersPage;
