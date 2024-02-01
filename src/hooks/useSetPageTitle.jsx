import { useEffect } from 'react';
import PropTypes from 'prop-types';

const useSetPageTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

useSetPageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default useSetPageTitle;
