import React from 'react';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import PageLayout from '../components/layout/PageLayout';
import RecipeListItem from '../components/Recipe/RecipeListItem/RecipeListItem';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../atoms';
import useRefetchLocale from '../hooks/useRefetchLocale';
import { CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SearchBar from '../components/SearchBar/SearchBar';
import useSetPageTitle from '../hooks/useSetPageTitle';

const RecipesPage = () => {
  const { t } = useTranslation();

  const [currentLang] = useAtom(localeLanguageAtom);
  const [searchRecipeTitle, setSearchRecipeTitle] = React.useState('');
  useSetPageTitle(t('navbar.recipes'));

  const {
    data: recipesData,
    refetch,
    error,
    isLoading,
  } = useGetCollection(
    'recipes',
    currentLang,
    '*',
    {
      'filters[name][$containsi]': searchRecipeTitle,
    },
    [searchRecipeTitle]
  );
  const recipes = recipesData?.data?.map((recipe) => recipe.attributes);
  const { isLocaleChanged } = useRefetchLocale({ refetch, locale: recipes?.[0]?.locale });

  const handleSearch = (searchTitle) => {
    setSearchRecipeTitle(searchTitle);
  };

  return (
    <PageLayout isLoading={isLocaleChanged}>
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="h-[50px]" />
        <SearchBar handleSubmit={handleSearch} handleClear={() => handleSearch('')} />
        {isLoading ? (
          <div className="flex p-5 lg:mt-5 mt-2 h-96 text-maltYellow bg-blackBackground items-center justify-center">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          (!recipes?.length || error) && (
            <div className="flex p-5 mt-5 h-96 text-maltYellow bg-blackBackground items-center justify-center">
              <Typography variant="h4" className="text-maltYellow">
                {t('recipes.noRecipes')}
              </Typography>
            </div>
          )
        )}
        {recipes?.map((recipe) => (
          <RecipeListItem key={recipe.createdAt} recipe={recipe} />
        ))}
      </div>
    </PageLayout>
  );
};

export default RecipesPage;
