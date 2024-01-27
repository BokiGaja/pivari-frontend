import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../atoms';

const useRefetchLocale = ({ refetch, locale }) => {
  const [currentLang] = useAtom(localeLanguageAtom);
  const isLocaleChanged = locale ? currentLang !== locale : false;

  useEffect(() => {
    refetch?.();
  }, [currentLang, refetch, locale]);

  return {
    isLocaleChanged,
  };
};

export default useRefetchLocale;
