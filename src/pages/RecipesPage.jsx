import React from 'react';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import PageLayout from '../components/layout/PageLayout';
import RecipeListItem from '../components/Recipe/RecipeListItem/RecipeListItem';
import { useAtom } from 'jotai/index';
import { localeLanguageAtom } from '../atoms';
import useRefetchLocale from '../hooks/useRefetchLocale/useRefetchLocale';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const RecipesPage = () => {
  const [currentLang] = useAtom(localeLanguageAtom);
  const { data: recipesData, refetch, error } = useGetCollection('recipes', currentLang, '*');
  useRefetchLocale({ refetch });
  const recipes = recipesData?.data?.map((recipe) => recipe.attributes);
  const { t } = useTranslation();

  if (recipes?.length) {
    recipes[0]?.locale !== currentLang && refetch();
  }

  if (!recipes?.length || error) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-screen">
          <Typography variant="h4" className="text-maltYellow">
            {t('recipes.noRecipes')}
          </Typography>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout isLoading={recipes?.length && recipes[0]?.locale !== currentLang}>
      <div className="flex flex-col items-center justify-start h-screen">
        {recipes?.map((recipe) => (
          <RecipeListItem key={recipe.createdAt} recipe={recipe} />
        ))}
      </div>
    </PageLayout>
  );
};

export default RecipesPage;
