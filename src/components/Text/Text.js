import React from 'react';
import PropTypes from 'prop-types';

const textSizeClasses = {
  large: 'font-ristrettoBold text-2xl tracking-wide',
  medium: 'font-ristrettoRegular text-xl tracking-wide',
  small: 'font-ristrettoRegular',
};

const colorClasses = {
  maltYellow: 'text-maltYellow',
  white: 'text-white',
  black: 'text-black',
};

const Text = ({ size, color, text }) => {
  return <p className={`${textSizeClasses[size]} ${colorClasses[color]}`}>{text}</p>;
};

Text.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Text;
