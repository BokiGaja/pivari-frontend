import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as SerbiaFlag } from '../../assets/svg/serbia-flag.svg';
import { ReactComponent as UKFlag } from '../../assets/svg/uk-flag.svg';
import i18next from 'i18next';
import useClickOutside from '../../hooks/htmlEvents/useClickOutside';
import Text from '../Text/Text';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../../atoms';
import { useNavigate } from 'react-router-dom';

const localeFlags = {
  'sr-Cyrl': {
    flag: <SerbiaFlag className="border-2 border-maltYellow rounded-full" />,
    name: 'Ћирилица',
  },
  sr: {
    flag: <SerbiaFlag className="border-2 border-maltYellow rounded-full" />,
    name: 'Latinica',
  },
  en: {
    flag: <UKFlag className="border-2 border-maltYellow rounded-full" />,
    name: 'English',
  },
};

const LanguageSwitch = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef(null);
  const [currentLang, setCurrentLang] = useAtom(localeLanguageAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const validLanguages = ['sr', 'sr-Cyrl', 'en'];
    if (!validLanguages.includes(currentLang)) {
      setCurrentLang('sr');
      i18next.changeLanguage('sr');
      return;
    }
    if (currentLang !== i18next.language) {
      i18next.changeLanguage(currentLang);
    }
  }, [currentLang, setCurrentLang]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useClickOutside(ref, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
  });

  return (
    <div className="flex items-center justify-around mr-4 relative" ref={ref}>
      <div className="flex w-[40px] h-[40px] cursor-pointer" onClick={() => toggleDropdown()}>
        {localeFlags?.[currentLang]?.flag}
      </div>
      {isDropdownOpen && (
        <div
          className="lg:absolute flex flex-1 flex-col top-16 right-0 bg-blackBackground border border-hopGreen p-2 shadow-md rounded-md overflow-hidden"
          onClick={() => toggleDropdown()}
        >
          {Object.keys(localeFlags)?.map((localeFlagKey) => (
            <div
              className="flex flex-row items-center justify-start rounded-md cursor-pointer hover:bg-blackBackgroundLighter p-2"
              key={localeFlags[localeFlagKey].name}
              onClick={() => {
                setCurrentLang(localeFlagKey);
                i18next.changeLanguage(localeFlagKey);
                navigate('/');
              }}
            >
              <div className="flex w-[40px] h-[40px] cursor-pointer mr-2">{localeFlags[localeFlagKey].flag}</div>
              <Text size="large" color="white" text={localeFlags[localeFlagKey].name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
