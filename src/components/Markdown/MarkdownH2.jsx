import React from 'react';
import Text from '../Text/Text';
import PropTypes from 'prop-types';

const MarkdownH2 = (props) => {
  return <Text size="medium" color="maltYellow" className="mb-4" text={props.children} />;
};

MarkdownH2.propTypes = {
  children: PropTypes.node,
};

export default MarkdownH2;
