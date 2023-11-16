import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, useScrollTrigger } from '@mui/material';
import NavBarButton from '../../Buttons/NavBarButton/NavBarButton.js';
import { ReactComponent as UdruzenjeLogo } from '../../../assets/svg/udruzenje-logo.svg';
import navBarStyles from './NavBar.styles.js';
import { pageScrolledAtom } from '../../../atoms';
import { useSetAtom } from 'jotai';
import useClickOutside from '../../../hooks/htmlEvents/useClickOutside';
import { useGetCategories } from '../../../services/api/hooks/useGetCategories';
import { ReactComponent as DownArrow } from '../../../assets/svg/down-arrow.svg';
import { ReactComponent as RightArrow } from '../../../assets/svg/right-arrow.svg';
import DropdownItemButton from '../../Buttons/DropdownItemButton/DropdownItemButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

const NavBar = () => {
  const setPageScrolled = useSetAtom(pageScrolledAtom);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef(null);
  const { data: categoriesData } = useGetCategories();
  const categoriesNames = categoriesData?.data?.map((category) => category.attributes.name);
  const currentRoute = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 30, // Adjust this threshold to your preference
  });

  useClickOutside(ref, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
  });

  useEffect(() => {
    setPageScrolled(trigger);
    setIsScrolled(trigger);
  }, [trigger, setPageScrolled]);

  return (
    <AppBar position="fixed" style={isScrolled ? navBarStyles.containerScrolled : navBarStyles.containerInitial}>
      <Toolbar className="flex-1 flex justify-between items-center pt-2 pb-2 relative">
        <div className="flex-1 flex items-center justify-around mr-4 relative">
          <NavBarButton
            isActive={currentRoute?.pathname === ROUTES.HOME}
            text="Početna"
            onClick={() => navigate(ROUTES.HOME)}
          />
          <div className="flex items-center justify-around mr-4 relative" ref={ref}>
            <NavBarButton
              text="Kategorije"
              onClick={() => toggleDropdown()}
              icon={<DownArrow className="w-4 h-4 ml-2 mt-1" />}
            />
            {isDropdownOpen && (
              <div className="absolute flex flex-1 flex-col px-4 top-16 bg-blackBackground border-l border-r border-b border-maltYellow p-2 shadow-md rounded-md overflow-hidden">
                {categoriesNames?.map((categoryName) => (
                  <DropdownItemButton
                    text={categoryName}
                    key={categoryName}
                    onClick={() =>
                      navigate(ROUTES.ARTICLES, {
                        categoryName,
                      })
                    }
                    icon={<RightArrow className="w-4 h-4 ml-2 mt-1" />}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-[300px]">
          <UdruzenjeLogo />
        </div>
        <div className="flex-1 flex items-center justify-around ml-4">
          <NavBarButton text="Članovi" onClick={() => navigate(ROUTES.MEMBERS)} />
          <NavBarButton text="Sponzori" onClick={() => navigate(ROUTES.SPONSORS)} />
          <NavBarButton text="O nama" onClick={() => navigate(ROUTES.ABOUT_US)} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
