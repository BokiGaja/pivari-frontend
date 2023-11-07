import React from 'react';
import PropTypes from 'prop-types';

const Main = ({ children }) => {
  return <main className="p-40 bg-blackBackground">{children}</main>;
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
