import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Text from '../components/Text/Text';
import useSetPageTitle from '../hooks/useSetPageTitle';
import { useTranslation } from 'react-i18next';

const PageNotFoundPage = () => {
  const { t } = useTranslation();

  useSetPageTitle(t('pageNotFound.title'));
  return (
    <PageLayout>
      <div className="flex items-center justify-center h-screen">
        <Text size="large" color="maltYellow" text={t('pageNotFound.title')} />
      </div>
    </PageLayout>
  );
};

export default PageNotFoundPage;
