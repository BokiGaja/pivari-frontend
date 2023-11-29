import React from 'react';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import PageLayout from '../components/layout/PageLayout';
import RecipeListItem from '../components/Recipe/RecipeListItem/RecipeListItem';

const RecipesPage = () => {
  const { data: recipesData } = useGetCollection('recipes', 'sr', '*');
  const recipes = recipesData?.data?.map((recipe) => recipe.attributes);

  return (
    <PageLayout isLoading={false}>
      <div className="flex flex-col items-center justify-start h-screen">
        {recipes?.map((recipe) => (
          <RecipeListItem key={recipe.createdAt} recipe={recipe} />
        ))}
      </div>
    </PageLayout>
  );
};

export default RecipesPage;
