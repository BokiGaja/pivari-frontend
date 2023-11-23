import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { sanitizeResponseData } from '../utils/api/responseData';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import { ReactComponent as Separator } from '../assets/svg/separator.svg';
import { useSetAtom } from 'jotai';
import { pageScrolledAtom } from '../atoms';
import MemberPreviewCard from '../components/Member/MemberPreview/MemberPreview';

const MembersPage = () => {
  const navigate = useNavigate();
  const setPageScrolled = useSetAtom(pageScrolledAtom);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPageScrolled(false);
  };
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
            <MemberPreviewCard member={member} index={index} navigate={navigate} scrollToTop={scrollToTop} />
          </React.Fragment>
        ))}
      </div>
    </PageLayout>
  );
};

export default MembersPage;
