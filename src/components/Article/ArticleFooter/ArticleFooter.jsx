import React from 'react';
import { ROUTES } from '../../../constants/routes';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Text from '../../Text/Text';
import { formatDate } from '../../../utils/date/formatDate';
import PropTypes from 'prop-types';
import { useSetAtom } from 'jotai';
import { pageScrolledAtom } from '../../../atoms';
import ArticleContacts from '../ArticleContacts/ArticleContacts';

const ArticleFooter = ({ article }) => {
  const navigate = useNavigate();
  const setPageScrolled = useSetAtom(pageScrolledAtom);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPageScrolled(false);
  };
  const categoriesNames = article.categories.data.map((category) => category.attributes.name);

  return (
    <div className="flex mt-20 justify-between w-full">
      <div className="flex self-start justify-around items-center">
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
        <Text size="medium" color="white" text={formatDate(article.createdAt)} />
      </div>
    </div>
  );
};

ArticleFooter.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleFooter;
