import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SerbiaFlag } from '../../assets/svg/serbia-flag.svg';
import { ReactComponent as UKFlag } from '../../assets/svg/uk-flag.svg';
import i18next from 'i18next';
import useClickOutside from '../../hooks/htmlEvents/useClickOutside';
import Text from '../Text/Text';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

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

const LanguageSwitch = ({ isDropdownOpen, setIsDropdownOpen, toggleDropdownDelayed }) => {
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
      <div
        className="flex w-[40px] h-[40px] cursor-pointer"
        onClick={() => {
          toggleDropdown();
          toggleDropdownDelayed();
        }}
      >
        {localeFlags?.[currentLang]?.flag}
      </div>
      {/* {isDropdownOpen && ( */}
      <div
        className={`absolute flex flex-1 flex-col top-16 -right-18 bg-blackBackground border border-hopGreen p-2 shadow-md rounded-md overflow-hidden transition-all duration-300 ${
          isDropdownOpen ? 'visible max-h-[250px]' : 'invisible max-h-0 !py-0'
        }`}
        onClick={() => toggleDropdown()}
      >
        {Object.keys(localeFlags)?.map((localeFlagKey) => (
          <div
            className="flex flex-row items-center justify-start rounded-md cursor-pointer hover:bg-blackBackgroundLighter p-2"
            key={localeFlags[localeFlagKey].name}
            onClick={() => {
              setCurrentLang(localeFlagKey);
              i18next.changeLanguage(localeFlagKey);
              navigate(ROUTES.HOME);
            }}
          >
            <div className="flex w-[40px] h-[40px] cursor-pointer mr-2">{localeFlags[localeFlagKey].flag}</div>
            <Text size="large" color="white" text={localeFlags[localeFlagKey].name} />
          </div>
        ))}
      </div>
      {/* )} */}
    </div>
  );
};

LanguageSwitch.propTypes = {
  isDropdownOpen: PropTypes.bool.isRequired,
  setIsDropdownOpen: PropTypes.func.isRequired,
  toggleDropdownDelayed: PropTypes.func.isRequired,
};

export default LanguageSwitch;
