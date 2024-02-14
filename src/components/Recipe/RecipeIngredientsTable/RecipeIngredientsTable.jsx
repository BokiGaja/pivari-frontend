import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../Text/Text';
import { ReactComponent as MaltRight } from '../../../assets/svg/malt-right.svg';
import { ReactComponent as MaltLeft } from '../../../assets/svg/malt-left.svg';
import { ReactComponent as HopCone } from '../../../assets/svg/hop-cone.svg';
import { ReactComponent as Tube } from '../../../assets/svg/tube.svg';
import { ReactComponent as Spoon } from '../../../assets/svg/spoon.svg';
import { useTranslation } from 'react-i18next';

const RecipeIngredientsTable = ({ recipe }) => {
  const { t } = useTranslation();

  const malts = recipe.ingredients.filter((ingredient) => ingredient.type === 'slad');
  const hops = recipe.ingredients.filter((ingredient) => ingredient.type === 'hmelj');
  const yeasts = recipe.ingredients.filter((ingredient) => ingredient.type === 'kvasac');
  const additions = recipe.ingredients.filter((ingredient) => ingredient.type === 'dodatak');

  const renderIngredients = (ingredients) =>
    ingredients.map((ingredient) => (
      <Text
        key={ingredient.id}
        size="medium"
        color="white"
        text={`${ingredient.name} - ${ingredient.quantity}${ingredient.unit === 'percent' ? '%' : ingredient.unit}`}
        className="font-bold text-center"
      />
    ));

  return (
    <div className="flex flex-row justify-around lg:px-0 px-4">
      <div className="flex flex-col">
        {!!malts?.length && (
          <div className="flex flex-col mb-4">
            <div className="flex flex-row items-center justify-center">
              <MaltLeft className="flex w-7 h-7" />
              <Text
                size="large"
                color="maltYellow"
                text={t('recipes.malt')}
                className="font-bold text-center break-all px-1"
              />
              <MaltRight className="flex w-7 h-7" />
            </div>
            {renderIngredients(malts)}
          </div>
        )}
        {!!hops?.length && (
          <div className="flex flex-col mb-4">
            <div className="flex flex-row items-center justify-center">
              <HopCone className="flex w-7 h-7" />
              <Text
                size="large"
                color="maltYellow"
                text={t('recipes.hops')}
                className="font-bold text-center break-all px-1"
              />
              <HopCone className="flex w-7 h-7" />
            </div>
            {renderIngredients(hops)}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        {!!yeasts?.length && (
          <div className="flex flex-col mb-4">
            <div className="flex flex-row items-center justify-center">
              <Tube className="flex w-5 h-5" />
              <Text
                size="large"
                color="maltYellow"
                text={t('recipes.yeast')}
                className="font-bold text-center break-all px-1"
              />
              <Tube className="flex w-5 h-5" />
            </div>
            {renderIngredients(yeasts)}
          </div>
        )}
        {!!additions?.length && (
          <div>
            <div className="flex flex-row items-center justify-center">
              <Spoon className="flex w-5 h-5" />
              <Text
                size="large"
                color="maltYellow"
                text={t('recipes.additions')}
                className="font-bold text-center break-all px-1"
              />
              <Spoon className="flex w-5 h-5" />
            </div>
            {renderIngredients(additions)}
          </div>
        )}
      </div>
    </div>
  );
};

RecipeIngredientsTable.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeIngredientsTable;
