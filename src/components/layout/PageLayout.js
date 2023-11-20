import React from 'react';
import NavBar from './NavBar/NavBar.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PropTypes from 'prop-types';
import ScrollToTheTopButton from '../Buttons/ScrollToTheTopButton/ScrollToTheTopButton';
import { CircularProgress } from '@mui/material';

const PageLayout = ({ children, isLoading }) => {
  return (
    <div className="bg-blackBackground">
      <NavBar />
      <Main>
        {isLoading ? (
          <div className="flex p-5 mt-5 h-96 bg-blackBackground items-center justify-center">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          children
        )}
      </Main>
      <Footer />
      <ScrollToTheTopButton />
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default PageLayout;
