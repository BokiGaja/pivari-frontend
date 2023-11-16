import React from 'react';
import PropTypes from 'prop-types';
import { sanitizeResponseData } from '../../../utils/api/responseData';
import pivariLogo from '../../../assets/logos/pivari-logo.png';

const ArticlePreview = ({ article }) => {
  const { title, description } = article;
  const backgroundImageUrl = `${process.env.REACT_APP_BASE_URL}${sanitizeResponseData(article, 'cover_image')?.url}`;

  return (
    <div className="relative w-3/4 h-[450px] transition-transform transform-gpu hover:scale-105 cursor-pointer">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm rounded-3xl hover:blur-md transition-all duration-500"
        style={{
          backgroundImage: `url(${backgroundImageUrl?.length ? backgroundImageUrl : pivariLogo})`,
        }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10 transition-transform hover:text-xl">
        <h1 className="text-4xl font-bold text-center">{title}</h1>
        <p className="text-lg text-center">{description}</p>
      </div>
    </div>
  );
};

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticlePreview;
