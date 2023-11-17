import React from 'react';
import NavBar from './NavBar/NavBar.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PropTypes from 'prop-types';
import ScrollToTheTopButton from '../Buttons/ScrollToTheTopButton/ScrollToTheTopButton';

const PageLayout = ({ children }) => {
  return (
    <div className="bg-blackBackground">
      <NavBar />
      <Main>{children}</Main>
      <Footer />
      <ScrollToTheTopButton />
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
