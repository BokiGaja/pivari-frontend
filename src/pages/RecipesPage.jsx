import React from 'react';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import PageLayout from '../components/layout/PageLayout';

const RecipesPage = () => {
  const { data: recipesData, isLoading } = useGetCollection('recipes', 'sr', '*');
  const recipes = recipesData?.data?.map((recipe) => recipe.attributes);
  console.log('Recipes', recipes);
  return (
    <PageLayout isLoading={isLoading}>
      <div>Recepti</div>
    </PageLayout>
  );
};

export default RecipesPage;
