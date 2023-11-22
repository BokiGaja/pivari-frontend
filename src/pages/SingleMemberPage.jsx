import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';

import { ReactComponent as WorldIcon } from '../assets/svg/socialIcons/icon-link-world.svg';
import { ReactComponent as FacebookIcon } from '../assets/svg/socialIcons/icon-facebook.svg';
import { ReactComponent as InstagramIcon } from '../assets/svg/socialIcons/icon-instagram.svg';
import { ReactComponent as EmailIcon } from '../assets/svg/socialIcons/icon-email.svg';
import { ReactComponent as PhoneIcon } from '../assets/svg/phone.svg';
import { ReactComponent as LocationIcon } from '../assets/svg/location-pin.svg';

const SingleMemberPage = () => {
  const params = useParams();
  const { data: memberData, isLoading } = useGetCollection('members', 'sr', '*', {
    'filters[name][$eq]': params?.name?.replaceAll('-', ' '),
  });
  const member = memberData?.data?.[0]?.attributes;
  console.log('Member', member);

  return (
    <PageLayout isLoading={isLoading}>
      <article className="flex flex-col w-[80%] mx-auto px-20 relative">
        <div className="flex lg:flex-row flex-col items-center justify-center mb-[24px]">
          <div className="flex w-[200px] min-w-[200px] min-h-[200px] lg:mr-[50px] mb-[20px] items-center relative overflow-hidden">
            <img
              className="absolute min-w-[1000%] min-h-[1000%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-[0.1001]"
              src={member?.logo?.data?.attributes?.url}
              alt={`${member?.name} logo`}
            />
          </div>
          <div className="flex flex-col justify-center lg:items-start items-center">
            <Text
              className="text-[32px] tracking-[0.05rem] font-bold lg:text-start text-center"
              size={'large'}
              color={'maltYellow'}
              text={member?.name}
            />
            <div className="flex gap-2">
              <PhoneIcon className="h-7 w-7 mt-[5px]" />
              <Text size={'large'} color={'maltYellow'} text={member?.phone} />
            </div>
            <div className="flex gap-2">
              <LocationIcon className="h-7 w-7 mt-[5px]" />
              <Text size={'large'} color={'maltYellow'} text={member?.address} />
            </div>
          </div>
        </div>
        <div className="mb-[20px] w-[80%] mx-auto">
          <Text className="text-bold text-center" size={'large'} color={'white'} text={member?.description} />
        </div>
        <div className="w-[80%] mx-auto">
          <Text className="text-center" size={'medium'} color={'white'} text={member?.content} />
        </div>
        <div className="flex flex-row gap-4 min-h-14 justify-center items-center p-2">
          {member?.website && (
            <div className="flex justify-center items-center min-h-14 min-w-14">
              <a href={member?.website}>
                <WorldIcon className="h-8 w-8 hover:scale-105 transition-all duration-[500ms]" />
              </a>
            </div>
          )}
          {member?.facebook && (
            <div className="flex justify-center items-center min-h-14 min-w-14">
              <a href={member?.facebook}>
                <FacebookIcon className="h-10 w-10 hover:scale-105 transition-all duration-[500ms]" />
              </a>
            </div>
          )}
          {member?.instagram && (
            <div className="flex justify-center items-center min-h-14 min-w-14">
              <a href={member?.instagram}>
                <InstagramIcon className="h-10 w-10 hover:scale-105 transition-all duration-[500ms]" />
              </a>
            </div>
          )}
          {member?.email && (
            <div className="flex justify-center items-center min-h-14 min-w-14">
              <a href={`mailto:${member.email}`}>
                <EmailIcon className="h-10 w-10 hover:scale-105 transition-all duration-[500ms]" />
              </a>
            </div>
          )}
        </div>
      </article>
    </PageLayout>
  );
};

export default SingleMemberPage;
