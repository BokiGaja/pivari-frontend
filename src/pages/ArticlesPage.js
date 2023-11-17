import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';
import { useSearchParams } from 'react-router-dom';

const ArticlesPage = () => {
  const [searchParams] = useSearchParams();

  return (
    <PageLayout>
      <div className="flex items-center justify-center h-screen">
        <Text size="large" color="maltYellow" text={searchParams?.get('category')} />
      </div>
    </PageLayout>
  );
};

export default ArticlesPage;
