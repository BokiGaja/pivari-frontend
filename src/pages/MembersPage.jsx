import React, { useMemo } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { sanitizeResponseData } from '../utils/api/responseData';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { ReactComponent as Separator } from '../assets/svg/separator.svg';
import { useSetAtom, useAtom } from 'jotai';
import { localeLanguageAtom, pageScrolledAtom } from '../atoms';
import MemberPreviewCard from '../components/Member/MemberPreview/MemberPreviewCard';
import { useTranslation } from 'react-i18next';
import useSetPageTitle from '../hooks/useSetPageTitle';
import DynamicHelmet from '../components/DynamicHelmet/DynamicHelmet';
import { getLocalData } from '../services/api/localDataService';

const MembersPage = () => {
  const navigate = useNavigate();
  const setPageScrolled = useSetAtom(pageScrolledAtom);
  const [currentLang] = useAtom(localeLanguageAtom);
  const { t } = useTranslation();
  useSetPageTitle(t('navbar.members'));

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPageScrolled(false);
  };

  // Fetch all members from local JSON
  const members = useMemo(() => {
    const data = getLocalData('member', currentLang, { 'sort[name]': 'asc' });
    return data.data.map((member) => ({
      ...member.attributes,
      logo: sanitizeResponseData(member.attributes, 'logo')?.url,
    }));
  }, [currentLang]);

  if (!members?.length) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-screen">
          <Typography variant="h4" className="text-maltYellow">
            {t('members.noMembers')}
          </Typography>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <DynamicHelmet name={t('navbar.members')} />
      {members?.length && (
        <div className="flex flex-col items-center lg:px-20 px-5 lg:mt-0 mt-24 lg:min-h-[380px]">
          {members?.map((member, index) => (
            <React.Fragment key={member?.createdAt}>
              {index !== 0 && <Separator className="flex hg:w-full w-10/12 self-center h-10 my-10" />}
              <MemberPreviewCard member={member} index={index} navigate={navigate} scrollToTop={scrollToTop} />
            </React.Fragment>
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default MembersPage;
