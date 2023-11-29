import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';

import pivariLogo from '../assets/logos/pivari-logo.png';

import { ReactComponent as WorldIcon } from '../assets/svg/socialIcons/icon-link-world.svg';
import { ReactComponent as FacebookIcon } from '../assets/svg/socialIcons/icon-facebook.svg';
import { ReactComponent as InstagramIcon } from '../assets/svg/socialIcons/icon-instagram.svg';
import { ReactComponent as EmailIcon } from '../assets/svg/socialIcons/icon-email.svg';
import { ReactComponent as PhoneIcon } from '../assets/svg/phone.svg';
import { ReactComponent as LocationIcon } from '../assets/svg/location-pin.svg';
import { ReactComponent as LeftArrowIcon } from '../assets/svg/left-arrow.svg';
import { Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../atoms';
import useRefetchLocale from '../hooks/useRefetchLocale/useRefetchLocale';
import { useTranslation } from 'react-i18next';

const SingleMemberPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const route = useLocation();
  const routeName = route.pathname?.split('/')[1];
  const [currentLang] = useAtom(localeLanguageAtom);
  const { t } = useTranslation();

  const {
    data: memberData,
    isLoading,
    isRefetching,
    refetch,
  } = useGetCollection(routeName, currentLang, '*', {
    'filters[name][$eq]': params?.name?.replaceAll('-', ' '),
  });
  const member = memberData?.data?.[0]?.attributes;
  const { isLocaleChanged } = useRefetchLocale({ refetch, locale: member?.locale });

  if (!member)
    return (
      <PageLayout>
        <div className="flex p-5 mt-5 h-96 bg-blackBackground items-center justify-center">
          <Typography variant="h4" className="text-maltYellow">
            {t(routeName === 'members' ? 'members.noMember' : 'sponsors.noSponsor')}
          </Typography>
        </div>
      </PageLayout>
    );

  return (
    <PageLayout isLoading={isLoading || isRefetching || isLocaleChanged}>
      <article className="flex flex-col w-[80%] mx-auto lg:mt-0 mt-24 lg:px-20 px-0 relative">
        <div className="flex lg:flex-row flex-col items-center justify-center mb-[50px]">
          <div className="flex w-[200px] min-w-[200px] min-h-[200px] lg:mr-[50px] mb-[20px] items-center relative overflow-hidden">
            <img
              className="absolute min-w-[1000%] min-h-[1000%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-[0.1001]"
              src={member?.logo?.data?.attributes?.url ? member?.logo?.data?.attributes?.url : pivariLogo}
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
            {member?.phone && (
              <div className="flex gap-2">
                <PhoneIcon className="h-7 w-7 mt-[5px]" />
                <Text size={'large'} color={'maltYellow'} text={member?.phone} />
              </div>
            )}
            {member?.address && (
              <div className="flex gap-2">
                <LocationIcon className="h-7 w-7 mt-[5px]" />
                <Text size={'large'} color={'maltYellow'} text={member?.address} />
              </div>
            )}
            <div className="flex flex-row gap-4 min-h-14 justify-center items-center p-2 mt-8">
              {member?.website && (
                <div className="flex justify-center items-center min-h-14 min-w-14">
                  <a href={member?.website} rel="noreferrer" target="_blank">
                    <WorldIcon className="h-8 w-8 hover:scale-110 transition-all duration-[350ms]" />
                  </a>
                </div>
              )}
              {member?.facebook && (
                <div className="flex justify-center items-center min-h-14 min-w-14">
                  <a href={member?.facebook} rel="noreferrer" target="_blank">
                    <FacebookIcon className="h-10 w-10 hover:scale-110 transition-all duration-[350ms]" />
                  </a>
                </div>
              )}
              {member?.instagram && (
                <div className="flex justify-center items-center min-h-14 min-w-14">
                  <a href={member?.instagram} rel="noreferrer" target="_blank">
                    <InstagramIcon className="h-10 w-10 hover:scale-110 transition-all duration-[350ms]" />
                  </a>
                </div>
              )}
              {member?.email && (
                <div className="flex justify-center items-center min-h-14 min-w-14">
                  <a href={`mailto:${member.email}`} rel="noreferrer" target="_blank">
                    <EmailIcon className="h-10 w-10 hover:scale-110 transition-all duration-[350ms]" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-[45px] w-[80%] mx-auto">
          <Text className="text-bold text-center" size={'large'} color={'white'} text={member?.description} />
        </div>
        <div className="w-[80%] mx-auto">
          <Text className="text-center whitespace-pre-wrap " size={'medium'} color={'white'} text={member?.content} />
        </div>
        <div className="absolute -bottom-[8rem] left-[8vw] hover:scale-110 transition-all duration-[350ms]">
          <button
            className="flex items-center font-crimson text-maltYellow tracking-[0.05rem] gap-2"
            onClick={() => {
              navigate(`/${routeName}`);
            }}
          >
            <LeftArrowIcon className="h-10 w-10" />
            {`${t('backTo.mainPart')} ${routeName === 'members' ? t('backTo.members') : t('backTo.sponsors')}`}
          </button>
        </div>
      </article>
    </PageLayout>
  );
};

export default SingleMemberPage;
