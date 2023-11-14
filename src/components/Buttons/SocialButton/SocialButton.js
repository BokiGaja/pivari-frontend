import React from 'react';

import { ReactComponent as FacebookIcon } from '../../../assets/svg/socialIcons/icon-facebook.svg';
import { ReactComponent as InstagramIcon } from '../../../assets/svg/socialIcons/icon-instagram.svg';
import { ReactComponent as EmailIcon } from '../../../assets/svg/socialIcons/icon-email.svg';
import PropTypes from 'prop-types';

export const SOCIAL_BUTTONS = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  EMAIL: 'email',
};

const SocialButton = ({ type }) => {
  const socialButtons = {
    facebook: {
      icon: <FacebookIcon className="w-14 h-14 cursor-pointer hover:w-16 hover:h-16" />,
      link: 'https://www.facebook.com/kucnipivarisrbija/',
    },
    instagram: {
      icon: <InstagramIcon className="w-14 h-14 cursor-pointer hover:w-16 hover:h-16" />,
      link: 'https://www.instagram.com/udruzenje_kucnih_pivara_srbije/',
    },
    email: {
      icon: <EmailIcon className="w-12 h-12 cursor-pointer hover:w-14 hover:h-14" />,
      link: 'mailto:informacije@pivari.rs',
    },
  };

  const handleOnClick = () => {
    window.open(socialButtons[type].link, '_blank');
  };

  return (
    <div className="flex w-16 h-16 items-center justify-center" onClick={handleOnClick}>
      {socialButtons[type].icon}
    </div>
  );
};

SocialButton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SocialButton;
