import React from 'react';
import PropTypes from 'prop-types';

const textSizeClasses = {
  large: 'font-crimson text-2xl tracking-wide',
  medium: 'font-crimson text-xl tracking-wide',
  small: 'font-crimson',
};

const colorClasses = {
  maltYellow: 'text-maltYellow',
  white: 'text-white',
  black: 'text-black',
};

const Text = ({size, color, text, className = ''}) => {
  return <p className={`${textSizeClasses[size]} ${colorClasses[color]} ${className}`}>{text}</p>;
};

Text.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Text;
