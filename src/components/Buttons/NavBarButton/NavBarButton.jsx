import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../Text/Text';

const NavBarButton = ({text, onClick, icon, isActive}) => {
  return (
    <div
      className={`flex flex-row justify-center items-center cursor-pointer px-4 py-2 rounded-md ${
        isActive ? 'border-b-2 border-b-hopGreen' : 'hover:border-b hover:border-b-maltYellow'
      }`}
      onClick={onClick}
    >
      <Text size="large" color="maltYellow" text={text}/>
      {icon && <div className="w-5 h-5">{icon}</div>}
    </div>
  );
};

NavBarButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element,
  isActive: PropTypes.bool,
};

export default NavBarButton;
