import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import PageLayout from '../components/layout/PageLayout';

const SingleMemberPage = () => {
  const params = useParams();
  const { data: memberData, isLoading } = useGetCollection('members', 'sr', '*', {
    'filters[name][$eq]': params?.name?.replace('-', ' '),
  });
  const member = memberData?.data?.[0]?.attributes;
  console.log('Member', member);

  return (
    <PageLayout isLoading={isLoading}>
      <div className="flex flex-col items-center px-20">
        <p>Member details</p>
      </div>
    </PageLayout>
  );
};

export default SingleMemberPage;
