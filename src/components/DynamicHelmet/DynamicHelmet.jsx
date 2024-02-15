import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const DynamicHelmet = ({ name, image = 'https://pivari.rs/ukps-zastava.jpeg' }) => {
  return (
    <Helmet prioritizeSeoTags>
      <title>{name}</title>
      <meta name="description" content={name} />
      <meta property="og:title" content={name} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={window.location.href} />
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={name} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={window.location.href} />
    </Helmet>
  );
};

DynamicHelmet.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default DynamicHelmet;
