import React from 'react';
import pivariLogo from '../../../assets/logos/pivari-logo.png';
import Text from '../../Text/Text';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/date/formatDate';
import { truncateString } from '../../../utils/string/truncate';
import { useAtom, useSetAtom } from 'jotai';
import { localeLanguageAtom, pageScrolledAtom } from '../../../atoms';

const ArticleListItem = ({ article, innerRef }) => {
  const navigate = useNavigate();
  const setPageScrolled = useSetAtom(pageScrolledAtom);
  const [currentLang] = useAtom(localeLanguageAtom);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPageScrolled(false);
  };
  return (
    <div
      ref={innerRef}
      key={article.id}
      className="flex lg:flex-row flex-col lg:w-8/12 w-11/12 bg-blackBackgroundLighter justify-start items-center rounded-3xl mb-10 border-2 border-hopGreen transform-gpu hover:scale-105 cursor-pointer transition-all duration-500 overflow-hidden"
      onClick={() => {
        navigate(`/article/${currentLang}/${article.title?.replaceAll(' ', '-')}`);
        scrollToTop();
      }}
    >
      <div className="flex lg:w-[40%] w-full min-h-[30vh] h-full relative overflow-hidden lg:border-r-2 border-r-0 lg:border-b-0 border-b-2 border-hopGreen ">
        <img
          src={article.cover_image || pivariLogo}
          alt={article.title}
          className="absolute min-w-[1000%] min-h-[1000%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-[0.1001]"
        />
      </div>
      <div className="flex flex-col align-center text-center w-full h-full justify-center px-[15px]">
        <Text size="large" color="maltYellow" className="mt-2 mb-2" text={article.title} />
        <Text size="medium" className="" color="white" text={truncateString(article.description, 250)} />
        <div className="flex self-center mt-4">
          <Text
            size="small"
            color="gray"
            text={formatDate(article?.start_date || article.createdAt, {}, currentLang)}
          />
        </div>
      </div>
    </div>
  );
};

ArticleListItem.propTypes = {
  article: PropTypes.object.isRequired,
  innerRef: PropTypes.func,
};

export default ArticleListItem;
