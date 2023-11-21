import React from 'react';
import PropTypes from 'prop-types';

const Main = ({ children }) => {
  return <main className="py-40 bg-blackBackground h-full">{children}</main>;
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
