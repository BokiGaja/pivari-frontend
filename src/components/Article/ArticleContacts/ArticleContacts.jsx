import React from 'react';
import Text from '../../Text/Text';
import PropTypes from 'prop-types';
import { ReactComponent as EmailIcon } from '../../../assets/svg/socialIcons/icon-email.svg';
import { ReactComponent as UrlIcon } from '../../../assets/svg/socialIcons/icon-link-world.svg';
import { ReactComponent as PhoneIcon } from '../../../assets/svg/phone.svg';

const ArticleContacts = ({ article }) => {
  return (
    <div className="flex flex-col items-start">
      {article.email && (
        <div
          className="flex flex-row cursor-pointer hover:underline decoration-white "
          onClick={() => window.open(`mailto:${article.email}`, '_blank')}
        >
          <EmailIcon className="w-8 h-8 inline-block mr-4" />
          <Text size="medium" color="white" text={article.email} />
        </div>
      )}
      {article.contact_url && (
        <div
          className="flex flex-row cursor-pointer hover:underline decoration-white"
          onClick={() => window.open(article.contact_url, '_blank')}
        >
          <UrlIcon className="w-8 h-8 inline-block mt-1 mr-4" />
          <Text size="medium" color="white" className="mt-1" text={article.contact_url} />
        </div>
      )}
      {article.phone && (
        <div
          className="flex flex-row cursor-pointer hover:underline decoration-white"
          onClick={() => window.open(`tel:${article.phone}`, '_blank')}
        >
          <PhoneIcon className="w-8 h-8 inline-block mt-1 mr-4" />
          <Text size="medium" color="white" text={article.phone} />
        </div>
      )}
    </div>
  );
};

ArticleContacts.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleContacts;
