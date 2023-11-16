import React from 'react';
import Text from '../../Text/Text';
import PropTypes from 'prop-types';

const DropdownItemButton = ({ onClick, text, icon }) => {
  return (
    <div
      className="flex flex-row justify-center items-center cursor-pointer px-4 py-2 hover:bg-blackBackgroundLighter rounded-md"
      onClick={onClick}
    >
      <Text size="medium" color="maltYellow" text={text} />
      {icon && <div className="w-5 h-5">{icon}</div>}
    </div>
  );
};

DropdownItemButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

export default DropdownItemButton;
