import React, { useMemo } from 'react';
import PageLayout from '../components/layout/PageLayout';
import RecipeListItem from '../components/Recipe/RecipeListItem/RecipeListItem';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../atoms';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
// import SearchBar from '../components/SearchBar/SearchBar';
import useSetPageTitle from '../hooks/useSetPageTitle';
import DynamicHelmet from '../components/DynamicHelmet/DynamicHelmet';
import { getLocalData } from '../services/api/localDataService';

const RecipesPage = () => {
  const { t } = useTranslation();
  const [currentLang] = useAtom(localeLanguageAtom);
  // const [searchRecipeTitle, setSearchRecipeTitle] = React.useState('');
  useSetPageTitle(t('navbar.recipes'));

  // Fetch all recipes from local JSON
  const recipes = useMemo(() => {
    const data = getLocalData('recipe', currentLang);
    return data.data.map((recipe) => recipe.attributes);
  }, [currentLang]);

  // const handleSearch = (searchTitle) => {
  //   setSearchRecipeTitle(searchTitle);
  // };

  return (
    <PageLayout>
      <DynamicHelmet name={t('navbar.recipes')} />
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="h-[50px]" />
        {/* <SearchBar handleSubmit={handleSearch} handleClear={() => handleSearch('')} /> */}
        {!recipes?.length && (
          <div className="flex p-5 mt-5 h-96 text-maltYellow bg-blackBackground items-center justify-center">
            <Typography variant="h4" className="text-maltYellow">
              {t('recipes.noRecipes')}
            </Typography>
          </div>
        )}
        {recipes?.map((recipe) => (
          <RecipeListItem key={recipe.createdAt} recipe={recipe} />
        ))}
      </div>
    </PageLayout>
  );
};

export default RecipesPage;
