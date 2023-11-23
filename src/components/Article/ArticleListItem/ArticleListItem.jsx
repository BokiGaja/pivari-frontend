import React from 'react';
import pivariLogo from '../../../assets/logos/pivari-logo.png';
import Text from '../../Text/Text';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/date/formatDate';
import { truncateString } from '../../../utils/string/truncate';
import { useSetAtom } from 'jotai';
import { pageScrolledAtom } from '../../../atoms';

const ArticleListItem = ({ article }) => {
  const navigate = useNavigate();
  const setPageScrolled = useSetAtom(pageScrolledAtom);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPageScrolled(false);
  };

  return (
    <div
      key={article.id}
      className="flex flex-row lg:w-8/12 w-11/12 bg-blackBackgroundLighter justify-start items-center rounded-3xl mb-10 border-2 border-hopGreen transform-gpu hover:scale-105 cursor-pointer transition-all duration-500"
      onClick={() => {
        navigate(`/article/${article.title?.replaceAll(' ', '-')}`);
        scrollToTop();
      }}
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
        <Text size="medium" color="white" text={truncateString(article.description, 250)} />
        <div className="absolute bottom-4 right-4">
          <Text size="small" color="gray" text={formatDate(article.createdAt)} />
        </div>
      </div>
    </div>
  );
};

ArticleListItem.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleListItem;
