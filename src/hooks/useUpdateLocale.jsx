import { useEffect } from 'react';
import { useAtom } from 'jotai/index';
import { localeLanguageAtom } from '../atoms';
import { isLocaleValid } from '../utils/locale/validation';
import { useParams } from 'react-router-dom';

export const useUpdateLocale = () => {
  const [currentLang, setCurrentLang] = useAtom(localeLanguageAtom);
  const params = useParams();
  const locale = params?.locale;

  useEffect(() => {
    if (locale && locale !== currentLang && isLocaleValid(locale)) {
      setCurrentLang(locale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, currentLang]);
};
