import React, { useState } from 'react';
import { useAtom } from 'jotai';
import navBarStyles from '../../layout/NavBar/NavBar.styles';
import pivariLogo from '../../../assets/logos/pivari-logo.png';
import { pageScrolledAtom } from '../../../atoms';
import { ReactComponent as UpArrow } from '../../../assets/svg/up-arrow.svg';

const ScrollToTheTopButton = () => {
  const [pageScrolled, setPageScrolled] = useAtom(pageScrolledAtom);
  const [hovered, setHovered] = useState(false);
  const handleOnMouseEnter = () => setHovered(true);
  const handleOnMouseLeave = () => setHovered(false);

  const scrollToTop = () => {
    // Smooth scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPageScrolled(false);
  };

  return (
    <div
      style={{ ...navBarStyles.logoContainer, ...(!pageScrolled && navBarStyles.logoScrolled) }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {!hovered ? (
        <img src={pivariLogo} alt="pivari-logo" className="w-14 h-14 rounded-full transition-colors" />
      ) : (
        <div className="flex w-[60px] cursor-pointer pb-1 rounded-full" onClick={scrollToTop}>
          <UpArrow />
        </div>
      )}
    </div>
  );
};

export default ScrollToTheTopButton;
