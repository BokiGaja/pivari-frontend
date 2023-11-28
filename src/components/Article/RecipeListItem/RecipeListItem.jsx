import React, { useState } from 'react';
import pivariLogo from '../../../assets/logos/pivari-logo.png';
import Text from '../../Text/Text';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/date/formatDate';
import { truncateString } from '../../../utils/string/truncate';
import { useSetAtom } from 'jotai';
import { pageScrolledAtom } from '../../../atoms';
import RecipeAdditionalInfo from '../../Recipe/RecipeAdditionalInfo/RecipeAdditionalInfo';

const RecipeListItem = ({ recipe }) => {
  const navigate = useNavigate();
  const setPageScrolled = useSetAtom(pageScrolledAtom);
  const [useFallbackImage, setUseFallbackImage] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPageScrolled(false);
  };

  return (
    <div
      key={recipe.createdAt}
      className="flex flex-col lg:flex-row lg:mt-0 mt-[120px] lg:w-8/12 w-11/12 bg-blackBackgroundLighter justify-start items-center rounded-3xl mb-10 border-2 border-hopGreen transform-gpu hover:scale-105 cursor-pointer transition-all duration-500"
      onClick={() => {
        navigate(`/recipe/${recipe?.name?.replaceAll(' ', '-')}`);
        scrollToTop();
      }}
    >
      <div className="width-full">
        <img
          src={(!useFallbackImage && recipe.cover_image?.data?.attributes?.url) || pivariLogo}
          alt={`${recipe.name} image`}
          onError={() => setUseFallbackImage(true)}
          className="w-[400px] rounded-t-3xl lg:rounded-l-3xl lg:rounded-r-none  h-full border-b-2 lg:border-r-2 lg:border-r-hopGreen lg:border-b-0 border-b-hopGreen"
        />
      </div>
      <div className="flex flex-col align-center text-center w-full h-full justify-center p-2">
        <Text size="large" color="maltYellow" className="text-4xl mb-2" text={recipe.name} />
        <Text size="medium" color="white" className="pl-2" text={truncateString(recipe.description, 250)} />
        <div className="flex flex-1 items-center justify-center flex-row pl-10 mt-4">
          <RecipeAdditionalInfo recipe={recipe} />
          {recipe?.style && <Text size="medium" color="maltYellow" className="mr-4" text={`Stil: ${recipe.style}`} />}
        </div>
        <div className="flex lg:flex-row flex-co w-full px-4 justify-between">
          <a
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="font-crimson group text-xl tracking-wide text-maltYellow hover:pointer group-hover:text-maltYellow transition-all duration-300"
            href={recipe.author_url}
          >
            {`Autor: `}
            <strong className="group-hover:text-white transition-all duration-300">{recipe.author}</strong>
          </a>
          <Text size="small" color="gray" text={formatDate(recipe.createdAt)} />
        </div>
      </div>
    </div>
  );
};

RecipeListItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeListItem;
