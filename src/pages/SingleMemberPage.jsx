import React, { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getLocalData, getMediaUrlById } from '../services/api/localDataService';
import { sanitizeResponseData } from '../utils/api/responseData';
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
import { useTranslation } from 'react-i18next';

import CarouselSlider from '../components/Carousel/CarouselSlider';
import MarkdownImage from '../components/Markdown/MarkdownImage';
import Markdown from 'react-markdown';
import { isLocaleValid } from '../utils/locale/validation';
import useSetPageTitle from '../hooks/useSetPageTitle';
import MarkdownLink from '../components/Markdown/MarkdownLink';
import MarkdownH2 from '../components/Markdown/MarkdownH2';
import MarkdownH1 from '../components/Markdown/MarkdownH1';
import DynamicHelmet from '../components/DynamicHelmet/DynamicHelmet';

const SingleMemberPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const route = useLocation();
  const routeName = route.pathname?.split('/')[1];
  const [currentLang] = useAtom(localeLanguageAtom);
  const paramsLocale = params?.locale;
  const locale = isLocaleValid(paramsLocale) ? paramsLocale : currentLang;
  const { t } = useTranslation();
  useSetPageTitle(params?.name?.replaceAll('-', ' '));

  // Fetch all members or sponsors from local JSON and find the specific one
  const member = useMemo(() => {
    const collectionKey = routeName === 'sponsors' ? 'sponsor' : 'member';
    const data = getLocalData(collectionKey, locale, { 'sort[name]': 'asc' });
    const members = data.data.map((member) => ({
      ...member.attributes,
      logo: sanitizeResponseData(member.attributes, 'logo')?.url,
      carousel: Array.isArray(member.attributes.carousel?.data)
        ? member.attributes.carousel.data
            .map(item => ({ url: getMediaUrlById(item.attributes.url) }))
            .filter(img => !!img.url)
        : [],
    }));
    return members.find(
      (item) => item.name?.toLowerCase() === params?.name?.replaceAll('-', ' ')?.toLowerCase()
    );
  }, [locale, params?.name, routeName]);

  const carouselData = member?.carousel?.map(item => ({attributes: { url: getMediaUrlById(item.url) }  }));

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
    <PageLayout>
      {member && (
        <>
          <DynamicHelmet
            name={member?.name}
            image={member.logo || pivariLogo}
          />
          <article className="flex flex-col w-full mx-auto lg:mt-0 mt-24 px-0 relative">
            <div className="flex lg:flex-row flex-col items-center justify-center mb-[50px]">
              <div className="flex w-[200px] min-w-[250px] min-h-[250px] lg:mr-[50px] mb-[20px] items-center relative overflow-hidden">
                <img
                  className="absolute min-w-[1000%] min-h-[1000%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-[0.1001]"
                  src={member.logo || pivariLogo}
                  alt={`${member?.name} logo`}
                />
              </div>
              <div className="flex flex-col justify-center lg:items-start items-center">
                <Text
                  className="text-[32px] tracking-[0.05rem] font-bold lg:text-start text-center"
                  size={'large'}
                  color={'maltYellow'}
                  text={member.name}
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
                    <Text size={'large'} color={'maltYellow'} className="text-center" text={member.address} />
                  </div>
                )}
                <div className="flex flex-row gap-4 min-h-14 justify-center items-center py-2 mt-8">
                  {member.website && (
                    <div className="flex justify-center items-center min-h-14 min-w-14">
                      <a href={member.website} rel="noreferrer" target="_blank">
                        <WorldIcon className="h-8 w-8 hover:scale-110 transition-all duration-[350ms]" />
                      </a>
                    </div>
                  )}
                  {member.facebook && (
                    <div className="flex justify-center items-center min-h-14 min-w-14">
                      <a href={member.facebook} rel="noreferrer" target="_blank">
                        <FacebookIcon className="h-10 w-10 hover:scale-110 transition-all duration-[350ms]" />
                      </a>
                    </div>
                  )}
                  {member.instagram && (
                    <div className="flex justify-center items-center min-h-14 min-w-14">
                      <a href={member.instagram} rel="noreferrer" target="_blank">
                        <InstagramIcon className="h-10 w-10 hover:scale-110 transition-all duration-[350ms]" />
                      </a>
                    </div>
                  )}
                  {member.email && (
                    <div className="flex justify-center items-center min-h-14 min-w-14">
                      <a href={`mailto:${member.email}`} rel="noreferrer" target="_blank">
                        <EmailIcon className="h-10 w-10 hover:scale-110 transition-all duration-[350ms]" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {member.content && (
              <Markdown
                className="flex whitespace-pre-wrap flex-col justify-center items-center lg:items-center text-center text-white lg:mt-0 lg:px-0 px-4 mt-4 max-w-[700px] mx-auto text-lg"
                components={{ p: React.Fragment, img: MarkdownImage, a: MarkdownLink, h2: MarkdownH2, h1: MarkdownH1 }}
              >
                {member.content}
              </Markdown>
            )}
            {carouselData?.length > 0 && <CarouselSlider carouselData={carouselData} />}
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
        </>
      )}
    </PageLayout>
  );
};

export default SingleMemberPage;
