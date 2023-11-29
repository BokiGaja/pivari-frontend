import React from 'react';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import PageLayout from '../components/layout/PageLayout';
import RecipeListItem from '../components/Recipe/RecipeListItem/RecipeListItem';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../atoms';
import useRefetchLocale from '../hooks/useRefetchLocale/useRefetchLocale';
import { CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SearchBar from '../components/SearchBar/SearchBar';

const RecipesPage = () => {
  const [currentLang] = useAtom(localeLanguageAtom);
  const [searchRecipeTitle, setSearchRecipeTitle] = React.useState('');
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
  const { t } = useTranslation();

  const handleSearch = (searchTitle) => {
    setSearchRecipeTitle(searchTitle);
  };

  return (
    <PageLayout isLoading={isLocaleChanged}>
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="lg:h-[50px] h-[200px]" />
        <SearchBar handleSubmit={handleSearch} handleClear={() => handleSearch('')} />
        {isLoading ? (
          <div className="flex p-5 mt-5 h-96 text-maltYellow bg-blackBackground items-center justify-center">
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
