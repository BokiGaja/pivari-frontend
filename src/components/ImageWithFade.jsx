import React from 'react';
import PropTypes from "prop-types";

const ImageWithFade = ({ url }) => {
  return (
    <div className="relative w-full h-[250px]">
      <img
        src={url}
        alt="Your Image"
        className="absolute  w-full h-full rounded-3xl"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-guinessBlack to-transparent"/>
    </div>
  );
};

ImageWithFade.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ImageWithFade;
