import React from 'react';
import NavBar from "./NavBar/NavBar.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PropTypes from "prop-types";


const PageLayout = ({children}) => {
  return (
    <div className="bg-blackBackground">
      <NavBar/>
      <Main>
        {children}
      </Main>
      <Footer/>
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout;