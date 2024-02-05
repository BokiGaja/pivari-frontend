import React from 'react';
import PropTypes from 'prop-types';

const MarkdownLink = (props) => {
  return (
    <a href={props.href} className="text-maltYellow hover:underline">
      {props.children}
    </a>
  );
};

MarkdownLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

export default MarkdownLink;
