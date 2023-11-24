import React from 'react';
import Text from '../../Text/Text';
import PropTypes from 'prop-types';

const RECIPE_ADDITIONAL_INFO_VALUES = ['EBC', 'IBU', 'ABV'];

const RecipeAdditionalInfo = ({ recipe }) => {
  return RECIPE_ADDITIONAL_INFO_VALUES.map(
    (label) =>
      recipe[label] && (
        <Text
          key={label}
          size="medium"
          color="maltYellow"
          className="mr-4 text-center self-center items-center"
          text={`${label}: ${recipe[label]}`}
        />
      )
  );
};

RecipeAdditionalInfo.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeAdditionalInfo;
