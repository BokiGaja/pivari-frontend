import React, { useMemo } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { sanitizeResponseData } from '../utils/api/responseData';
import { Typography } from '@mui/material';
import { ReactComponent as Separator } from '../assets/svg/separator.svg';
import SponsorPreviewCard from '../components/Sponsor/SponsorPreview/SponsorPreviewCard';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../atoms';
import { useTranslation } from 'react-i18next';
import useSetPageTitle from '../hooks/useSetPageTitle';
import DynamicHelmet from '../components/DynamicHelmet/DynamicHelmet';
import { getLocalData } from '../services/api/localDataService';

const SponsorsPage = () => {
  const [currentLang] = useAtom(localeLanguageAtom);
  const { t } = useTranslation();
  useSetPageTitle(t('navbar.sponsors'));

  // Fetch all sponsors from local JSON
  const sponsors = useMemo(() => {
    const data = getLocalData('sponsor', currentLang, { 'sort[name]': 'asc' });
    return data.data.map((sponsor) => ({
      ...sponsor.attributes,
      logo: sanitizeResponseData(sponsor.attributes, 'logo')?.url,
    }));
  }, [currentLang]);

  if (!sponsors?.length) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-screen">
          <Typography variant="h4" className="text-maltYellow">
            {t('sponsors.noSponsors')}
          </Typography>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <DynamicHelmet name={t('navbar.sponsors')} />
      <div className="flex flex-col items-center lg:px-20 px-5 lg:mt-0 mt-24 lg:min-h-[380px]">
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
