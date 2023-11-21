import React from 'react';
import pivariLogo from '../../../assets/logos/pivari-logo.png';
import Text from '../../Text/Text';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ArticleListItem = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div
      key={article.id}
      className="flex flex-row w-8/12 bg-blackBackgroundLighter justify-start items-center rounded-3xl mb-10 border-2 border-hopGreen transform-gpu hover:scale-105 cursor-pointer transition-all duration-500"
      onClick={() => navigate(`/article/${article.title?.replace(' ', '-')}`)}
    >
      <div className="width-[600px]">
        <img
          src={article.cover_image || pivariLogo}
          alt={article.title}
          className="w-[600px] h-[200px] rounded-l-3xl border-r-2 border-hopGreen"
        />
      </div>
      <div className="flex flex-col align-center text-center w-full h-full justify-center">
        <Text size="large" color="maltYellow" text={article.title} />
        <Text size="medium" color="white" text={article.description} />
      </div>
    </div>
  );
};

ArticleListItem.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleListItem;
