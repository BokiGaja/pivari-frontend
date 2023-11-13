import React, { useEffect, useState } from 'react';
import { AppBar, Container, Toolbar, useScrollTrigger } from '@mui/material';
import NavBarButton from '../../Buttons/NavBarButton/NavBarButton.js';
import { ReactComponent as UdruzenjeLogo } from '../../../assets/svg/udruzenje-logo.svg';
import navBarStyles from './NavBar.styles.js';
import { pageScrolledAtom } from '../../../atoms';
import { useSetAtom } from 'jotai';

const NavBar = () => {
  const setPageScrolled = useSetAtom(pageScrolledAtom);
  const [isScrolled, setIsScrolled] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 30, // Adjust this threshold to your preference
  });

  useEffect(() => {
    setPageScrolled(trigger);
    setIsScrolled(trigger);
  }, [trigger, setPageScrolled]);

  const handleButtonClick = (buttonText) => {
    console.log(`Clicked: ${buttonText}`);
  };

  return (
    <AppBar position="fixed" style={isScrolled ? navBarStyles.containerScrolled : navBarStyles.containerInitial}>
      <Container>
        <Toolbar className="flex-1 flex justify-between items-center pt-2 pb-2">
          <div className="flex-1 flex items-center justify-around mr-4">
            <NavBarButton text="Početna" onClick={() => handleButtonClick('Button 1')} />
            <NavBarButton text="Novosti" onClick={() => handleButtonClick('Button 2')} />
            <NavBarButton text="Edukacija" onClick={() => handleButtonClick('Button 3')} />
          </div>
          <div className="w-[300px]">
            <UdruzenjeLogo />
          </div>
          <div className="flex-1 flex items-center justify-around ml-4">
            <NavBarButton text="Članovi" onClick={() => handleButtonClick('Button 4')} />
            <NavBarButton text="Sponzori" onClick={() => handleButtonClick('Button 5')} />
            <NavBarButton text="O nama" onClick={() => handleButtonClick('Button 6')} />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
