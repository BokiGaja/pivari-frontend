import React from 'react';

import { ReactComponent as FacebookIcon } from '../../../assets/svg/socialIcons/icon-facebook.svg';
import { ReactComponent as InstagramIcon } from '../../../assets/svg/socialIcons/icon-instagram.svg';
import { ReactComponent as EmailIcon } from '../../../assets/svg/socialIcons/icon-email.svg';
import { ReactComponent as UrlLinkIcon } from '../../../assets/svg/socialIcons/icon-link-world.svg';
import PropTypes from 'prop-types';
import { useGetCollection } from '../../../services/api/hooks/useGetCollection';

export const SOCIAL_BUTTONS = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  EMAIL: 'email',
  URL_LINK: 'urlLink',
};

const SOCIAL_DEFAULTS = {
  FACEBOOK: 'https://www.facebook.com/kucnipivarisrbija/',
  INSTAGRAM: 'https://www.instagram.com/udruzenje_kucnih_pivara_srbije/',
  EMAIL: 'informacije@pivari.rs',
};

const SocialButton = ({ type, url }) => {
  const { data: contactData } = useGetCollection('contact-us', 'sr', '*');
  const contactUs = contactData?.data?.attributes;
  const socialButtons = {
    facebook: {
      icon: <FacebookIcon className="w-14 h-14 cursor-pointer hover:w-16 hover:h-16" />,
      link: url?.length ? url : contactUs?.facebook || SOCIAL_DEFAULTS.FACEBOOK,
    },
    instagram: {
      icon: <InstagramIcon className="w-14 h-14 cursor-pointer hover:w-16 hover:h-16" />,
      link: url?.length ? url : contactUs?.instagram || SOCIAL_DEFAULTS.INSTAGRAM,
    },
    email: {
      icon: <EmailIcon className="w-12 h-12 cursor-pointer hover:w-14 hover:h-14" />,
      link: `mailto:${url?.length ? url : contactUs?.email || SOCIAL_DEFAULTS.EMAIL}`,
    },
    urlLink: {
      icon: <UrlLinkIcon className="w-9 h-9 cursor-pointer hover:w-14 hover:h-14" />,
      link: url,
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
  url: PropTypes.string,
};

export default SocialButton;
