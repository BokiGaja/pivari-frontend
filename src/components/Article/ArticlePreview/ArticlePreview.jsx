import React from 'react';
import PropTypes from 'prop-types';
import { sanitizeResponseData } from '../../../utils/api/responseData';
import pivariLogo from '../../../assets/logos/pivari-logo.png';
import Text from '../../Text/Text';
import ImageWithFade from '../../ImageWithFade';
import { formatDate } from '../../../utils/date/formatDate';
import { truncateString } from '../../../utils/string/truncate';

const ArticlePreview = ({ article }) => {
  const { title, description, createdAt } = article;
  const backgroundImageUrl = sanitizeResponseData(article, 'cover_image')?.url;

  return (
    <div className="flex flex-col w-3/4 h-[450px] bg-guinessBlack transition-transform transform-gpu hover:scale-105 cursor-pointer duration-500 rounded-3xl">
      <ImageWithFade url={article?.cover_image?.data?.attributes?.url ? backgroundImageUrl : pivariLogo} />
      <div className="flex flex-col text-white z-10 p-5">
        <Text size="large" color="maltYellow" text={title} className="text-4xl font-bold text-center break-all" />
        <Text
          size="medium"
          color="white"
          text={truncateString(description, 250)}
          className="text-xl text-center break-all"
        />
        <div className="absolute bottom-4 right-4">
          <Text size="small" color="gray" text={formatDate(createdAt)} />
        </div>
      </div>
    </div>
  );
};

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticlePreview;
