import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../../atoms';

const useRefetchLocale = ({ refetch }) => {
  const [currentLang] = useAtom(localeLanguageAtom);

  useEffect(() => {
    refetch?.();
  }, [currentLang, refetch]);
};

export default useRefetchLocale;
