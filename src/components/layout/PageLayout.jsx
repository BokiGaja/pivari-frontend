import React from 'react';
import NavBar from './NavBar/NavBar.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PropTypes from 'prop-types';
import ScrollToTheTopButton from '../Buttons/ScrollToTheTopButton/ScrollToTheTopButton';
import { CircularProgress } from '@mui/material';

const PageLayout = ({ children, isLoading }) => {
  return (
    <div className="bg-blackBackground">
      <NavBar />
      <Main>
        {isLoading ? (
          <div className="flex p-5 mt-5 h-96 text-maltYellow bg-blackBackground items-center justify-center">
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
