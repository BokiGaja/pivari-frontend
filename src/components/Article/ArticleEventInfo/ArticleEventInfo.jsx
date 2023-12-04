import React from 'react';
import Text from '../../Text/Text';
import { formatDate } from '../../../utils/date/formatDate';
import { ReactComponent as CalendarIcon } from '../../../assets/svg/calendar.svg';
import { ReactComponent as LocationPin } from '../../../assets/svg/location-pin.svg';
import PropTypes from 'prop-types';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../../../atoms';

const ArticleEventInfo = ({ article }) => {
  const [currentLang] = useAtom(localeLanguageAtom);

  const dateExtraOptions = {
    month: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return (
    <div className="flex lg:flex-row flex-col items-center justify-center">
      {article.start_date && (
        <div className="flex flex-row items-center">
          <CalendarIcon className="w-6 h-6 inline-block mr-2 mt-1" />
          <Text
            size="medium"
            color="white"
            text={`${formatDate(article.start_date, dateExtraOptions, currentLang)} ${article.end_date ? '-' : ''} ${
              article.end_date ? formatDate(article.end_date, dateExtraOptions, currentLang) : ''
            }`}
            className="text-2xl font-bold text-center my-4"
          />
        </div>
      )}
      {article.address && (
        <div className="flex flex-row ml-4">
          <LocationPin className="w-6 h-6 inline-block mr-2 mt-1" />
          <Text size="medium" color="white" text={article.address} />
        </div>
      )}
    </div>
  );
};

ArticleEventInfo.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleEventInfo;
