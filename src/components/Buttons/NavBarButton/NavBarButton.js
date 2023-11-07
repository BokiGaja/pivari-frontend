import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../Text/Text';

const NavBarButton = ({ text, onClick }) => {
  return (
    <div className="cursor-pointer hover:border-b-2 hover:border-b-maltYellow px-4 py-2 rounded-md" onClick={onClick}>
      <Text size="large" color="maltYellow" text={text} />
    </div>
  );
};

NavBarButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NavBarButton;
