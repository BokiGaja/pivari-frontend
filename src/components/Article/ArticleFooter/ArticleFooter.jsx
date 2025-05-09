import React from 'react';
import { ROUTES } from '../../../constants/routes';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Text from '../../Text/Text';
import { formatDate } from '../../../utils/date/formatDate';
import PropTypes from 'prop-types';
import { useAtom, useSetAtom } from 'jotai';
import { localeLanguageAtom, pageScrolledAtom } from '../../../atoms';
import ArticleContacts from '../ArticleContacts/ArticleContacts';

const ArticleFooter = ({ article }) => {
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
  const categoriesNames = article.categories.map((category) => category.name);

  return (
    <div className="flex lg:flex-row flex-col items-center lg:items-startc mt-20 justify-between w-full">
      <div className="flex lg:self-start justify-around items-center lg:mb-0 mb-2">
        {categoriesNames.map((categoryName) => (
          <div
            className="rounded bg-blackBackground ml-4 py-1 px-2 border border-maltYellow cursor-pointer hover:bg-maltYellow"
            key={categoryName}
            onClick={() => {
              navigate({
                pathname: ROUTES.ARTICLES,
                search: `?${createSearchParams({
                  category: categoryName,
                })}`,
              });
              scrollToTop();
            }}
          >
            <Text text={categoryName} color="white" size="small" />
          </div>
        ))}
      </div>
      <ArticleContacts article={article} />
      <div className="flex">
        <Text size="medium" color="white" text={formatDate(article.createdAt, {}, currentLang)} />
      </div>
    </div>
  );
};

ArticleFooter.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleFooter;
