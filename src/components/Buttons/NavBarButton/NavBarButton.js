import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../Text/Text';

const NavBarButton = ({ text, onClick, icon }) => {
  return (
    <div
      className="flex flex-row justify-center items-center cursor-pointer hover:border-b-2 hover:border-b-maltYellow px-4 py-2 rounded-md"
      onClick={onClick}
    >
      <Text size="large" color="maltYellow" text={text} />
      {icon && <div className="w-5 h-5">{icon}</div>}
    </div>
  );
};

NavBarButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element,
};

export default NavBarButton;
