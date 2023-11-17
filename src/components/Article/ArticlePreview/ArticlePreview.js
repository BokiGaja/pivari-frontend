import React from 'react';
import PropTypes from 'prop-types';
import { sanitizeResponseData } from '../../../utils/api/responseData';
import pivariLogo from '../../../assets/logos/pivari-logo.png';
import Text from "../../Text/Text";
import ImageWithFade from "../../ImageWithFade";



const ArticlePreview = ({ article }) => {
  const { title, description } = article;
  const backgroundImageUrl = `${process.env.REACT_APP_BASE_URL}${sanitizeResponseData(article, 'cover_image')?.url}`;

  
  return (
    <div
      className="flex flex-col w-3/4 h-[450px] bg-guinessBlack transition-transform transform-gpu hover:scale-105 cursor-pointer transition-all duration-500 rounded-3xl">
      <ImageWithFade url={article?.cover_image?.data?.attributes?.url ? backgroundImageUrl : pivariLogo}/>
      <div
        className="flex flex-col text-white z-10 transition-transform hover:text-xl p-5">
        <Text size="large" color="white" text={title} className="text-4xl font-bold text-center break-all"/>
        <Text size="medium" color="white" text={description} className="text-xl text-center break-all"/>
      </div>
    </div>
  );
};

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticlePreview;
