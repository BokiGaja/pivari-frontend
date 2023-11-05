import React, { useEffect, useState } from 'react';
import { AppBar, Container, Toolbar, useScrollTrigger } from '@mui/material';
import "../../../styles/layout/common.css";
import NavBarButton from "../../Buttons/NavBarButton/NavBarButton.js";
import { ReactComponent as ReactLogo } from '../../../assets/logos/udruzenje-logo.svg';
import pivariLogo from '../../../assets/logos/pivari-logo.png'
import navBarStyles from "./NavBar.styles.js";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 30, // Adjust this threshold to your preference
  });

  useEffect(() => {
    setIsScrolled(trigger);
  }, [trigger]);

  const handleButtonClick = (buttonText) => {
    console.log(`Clicked: ${buttonText}`);
  };

  return (
    <>
      <AppBar
        position="fixed"
        style={isScrolled ? navBarStyles.containerScrolled : navBarStyles.containerInitial}
      >
        <Container>
          <Toolbar style={navBarStyles.toolBarContainer}>
            <div style={navBarStyles.leftButtons}>
              <NavBarButton text="Button 1" onClick={() => handleButtonClick('Button 1')}/>
              <NavBarButton text="Button 2" onClick={() => handleButtonClick('Button 2')}/>
              <NavBarButton text="Button 3" onClick={() => handleButtonClick('Button 3')}/>

            </div>
            <div style={navBarStyles.logo}>
              <ReactLogo/>
            </div>
            <div style={navBarStyles.leftButtons}>
              <NavBarButton text="Button 4" onClick={() => handleButtonClick('Button 4')}/>


              <NavBarButton
                text="Button 5" onClick={() => handleButtonClick('Button 5')}/>
              <NavBarButton text="Button 6" onClick={() => handleButtonClick('Button 6')}/>

            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBar
        position="sticky"
        style={{...navBarStyles.logoContainer, ...(!isScrolled && navBarStyles.containerScrolled)}}
      >
        <div>
          <img src={pivariLogo} alt='pivari-logo' style={navBarStyles.logoImage}/></div>
      </AppBar>
    </>
  );
};

export default NavBar;
