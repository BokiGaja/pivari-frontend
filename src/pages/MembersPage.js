import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';
import { sanitizeResponseData } from '../utils/api/responseData';
import { useGetCollection } from '../services/api/hooks/useGetCollection';

const MembersPage = () => {
  const { data: membersData, isLoading } = useGetCollection('members');
  const members = membersData?.data?.map((member) => ({
    ...member.attributes,
    logo: sanitizeResponseData(member.attributes, 'logo')?.url,
  }));
  console.log('membersData', members);

  return (
    <PageLayout isLoading={isLoading}>
      <div className="flex items-center justify-center h-screen">
        <Text size="large" color="maltYellow" text={'Članovi'} />
      </div>
    </PageLayout>
  );
};

export default MembersPage;
