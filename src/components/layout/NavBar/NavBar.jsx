import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, useScrollTrigger } from '@mui/material';
import NavBarButton from '../../Buttons/NavBarButton/NavBarButton.jsx';
import { ReactComponent as UdruzenjeLogo } from '../../../assets/svg/udruzenje-logo.svg';
import navBarStyles from './NavBar.styles.js';
import { localeLanguageAtom, pageScrolledAtom } from '../../../atoms';
import { useSetAtom } from 'jotai';
import useClickOutside from '../../../hooks/htmlEvents/useClickOutside';
import { ReactComponent as DownArrow } from '../../../assets/svg/down-arrow.svg';
import { ReactComponent as UpArrow } from '../../../assets/svg/up-arrow.svg';
import DropdownItemButton from '../../Buttons/DropdownItemButton/DropdownItemButton';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import Text from '../../Text/Text.jsx';
import { getAllCategories } from '../../../services/api/localDataService';

const NavBar = () => {
  const setPageScrolled = useSetAtom(pageScrolledAtom);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isDropdownOpenDelayed, setIsDropdownOpenDelayed] = useState(false);
  const [isMenuActivated, setIsmenuActivated] = useState(false);
  const ref = useRef(null);
  const [currentLang] = useAtom(localeLanguageAtom);

  // const { data: categoriesData, refetch } = useGetCollection('categories', currentLang);
  // useRefetchLocale({ refetch, locale: categoriesData?.data?.[0]?.attributes?.locale });
  const categoriesData = getAllCategories(currentLang);
  const categoriesNames = categoriesData.map((category) => category.name);
  const currentRoute = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const openMenu = () => {
    setIsmenuActivated(true);
  };

  const closeMenu = () => {
    setIsmenuActivated(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleDropdownDelayed = () => {
    setTimeout(() => {
      setIsDropdownOpenDelayed((prevState) => !prevState);
    }, 200);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 30, // Adjust this threshold to your preference
  });

  useClickOutside(ref, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
    setTimeout(() => {
      if (setIsDropdownOpenDelayed) setIsDropdownOpenDelayed(false);
    }, 200);
  });

  useEffect(() => {
    setPageScrolled(trigger);
    setIsScrolled(trigger);
  }, [trigger, setPageScrolled]);

  return (
    <AppBar position="fixed" style={isScrolled ? navBarStyles.containerScrolled : navBarStyles.containerInitial}>
      <Toolbar className="flex-1 flex flex-col lg:flex-row justify-between items-center pt-2 pb-2 relative">
        <div
          className="lg:hidden lg:min-w-none min-w-[350px] lg:max-w-none max-w-[500px] w-[65%]"
          onClick={() => navigate(ROUTES.HOME)}
        >
          <UdruzenjeLogo />
        </div>
        {!isMenuActivated ? (
          <div className="lg:hidden flex gap-2 items-center mt-2" onClick={openMenu}>
            <Text size="large" color="maltYellow" text={t('responsiveMenu.openMenu')} />
            <DownArrow className="w-5 h-5 pt-[5px]" />
          </div>
        ) : (
          <div className="lg:hidden flex gap-2 items-center mt-2" onClick={closeMenu}>
            <Text size="large" color="white" text={t('responsiveMenu.closeMenu')} />
            <UpArrow className="w-5 h-5 pt-[5px]" />
          </div>
        )}
        <div
          className={`flex lg:flex-row flex-col w-full justify-between items-center lg:max-h-fit lg:pb-0 lg:overflow-visible transition-all duration-500 ${
            isMenuActivated ? 'visible max-h-[500px] pb-5' : 'lg:visible invisible max-h-[0px] pb-0'
          } ${
            isDropdownOpenDelayed || isDropdownOpen ? 'overflow-visible' : 'overflow-hidden'
          } 
          `}
        >
          <div className="lg:flex-1 lg:flex lg:items-center lg:justify-around items-center justify-around mr-4 relative">
            <div className="flex-1 flex items-center justify-around ml-4">
              <NavBarButton
                isActive={currentRoute?.pathname === ROUTES.HOME}
                text={t('navbar.home')}
                onClick={() => navigate(ROUTES.HOME)}
              />
              <div className="flex flex-col items-center justify-around relative" ref={ref}>
                <NavBarButton
                  isActive={currentRoute?.pathname.includes('article')}
                  text={t('navbar.articles')}
                  onClick={() => {
                    toggleDropdown();
                    toggleDropdownDelayed();
                  }}
                  icon={
                    isDropdownOpen ? (
                      <DownArrow className="w-4 h-4 ml-2 mt-1 rotate-180" />
                    ) : (
                      <DownArrow className="w-4 h-4 ml-2 mt-1" />
                    )
                  }
                />
                <div
                  className={`absolute z-10 flex flex-1 flex-col px-4 top-16 bg-blackBackground border-l border-r border-b border-hopGreen shadow-md rounded-md overflow-hidden transition-all duration-300 ${
                    isDropdownOpen ? 'max-h-[350px] visible p-2' : 'max-h-[0] invisible !py-0'
                  }`}
                >
                  {categoriesNames?.map((categoryName) => (
                    <DropdownItemButton
                      text={categoryName}
                      key={categoryName}
                      onClick={() => {
                        navigate({
                          pathname: ROUTES.ARTICLES,
                          search: `?${createSearchParams({
                            category: categoryName,
                          })}`,
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
              <NavBarButton
                isActive={currentRoute?.pathname.includes('recipe')}
                text={t('navbar.recipes')}
                onClick={() => navigate(ROUTES.RECIPES)}
              />
            </div>
          </div>
          <div className="hidden lg:flex w-[300px]" onClick={() => navigate(ROUTES.HOME)}>
            <UdruzenjeLogo />
          </div>
          <div className="flex-1 flex items-center justify-around ml-4 ">
            <NavBarButton
              text={t('navbar.members')}
              onClick={() => navigate(ROUTES.MEMBERS)}
              isActive={currentRoute?.pathname.includes('members')}
            />
            <NavBarButton
              text={t('navbar.sponsors')}
              onClick={() => navigate(ROUTES.SPONSORS)}
              isActive={currentRoute?.pathname.includes('sponsor')}
            />
            <NavBarButton
              text={t('navbar.aboutUs')}
              onClick={() => navigate(ROUTES.ABOUT_US)}
              isActive={currentRoute?.pathname === ROUTES.ABOUT_US}
            />
          </div>
          {/* <div className="relative lg:mt-0 mt-2 lg:mb-0 mb-4">
            <LanguageSwitch
              isDropdownOpen={isLanguageDropdownOpen}
              setIsDropdownOpen={setIsLanguageDropdownOpen}
              toggleDropdownDelayed={toggleDropdownDelayed}
            />
          </div> */}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
