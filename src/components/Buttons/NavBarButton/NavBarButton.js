import React, { useState } from 'react';
import { Button } from "@mui/material";
import navBarButtonStyles from "./NavBarButton.styles.js";
import { string } from "prop-types";

const NavBarButton = ({text, onClick}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    console.log('Set true')
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Button
      style={{...navBarButtonStyles.customButton, ...(isHovered && navBarButtonStyles.customButtonHovered)}}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      text={text}
    />
  );
};

NavBarButton.propTypes = {
  text: string,
  onClick: Function
};

export default NavBarButton;
