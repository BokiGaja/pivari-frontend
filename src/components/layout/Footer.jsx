import React from 'react';
import { Typography } from '@mui/material';
import pivariLogo from '../../assets/logos/pivari-logo.png';
import SocialButton, { SOCIAL_BUTTONS } from '../Buttons/SocialButton/SocialButton';

const Footer = () => {
  return (
    <div className="flex flex-1 flex-row items-center justify-center bg-blackBackground border-t-2 border-t-maltYellow py-4">
      <div className="flex flex-col items-center mt-2">
        <div className="mb-8">
          <div className="flex flex-row justify-center items-center">
            <SocialButton type={SOCIAL_BUTTONS.FACEBOOK} />
            <img src={pivariLogo} alt="pivari-logo" className="w-28" />
            <SocialButton type={SOCIAL_BUTTONS.INSTAGRAM} />
          </div>
          <div className="flex justify-center">
            <SocialButton type={SOCIAL_BUTTONS.EMAIL} />
          </div>
        </div>
        <Typography variant="subtitle2" className="text-maltYellow pr-1 text-center">
          Copyright 2023 © Udruženje kućnih Pivara Srbije. Sva prava zadržana.
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
