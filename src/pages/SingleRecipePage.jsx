import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCollection } from '../services/api/hooks/useGetCollection';
import PageLayout from '../components/layout/PageLayout';
import { Typography } from '@mui/material';
import pivariLogo from '../assets/logos/pivari-logo.png';
import Text from '../components/Text/Text';
import Markdown from 'react-markdown';
import MarkdownImage from '../components/Markdown/MarkdownImage';
import { ReactComponent as Separator } from '../assets/svg/separator.svg';
import RecipeIngredientsTable from '../components/Recipe/RecipeIngredientsTable/RecipeIngredientsTable';
import RecipeAdditionalInfo from '../components/Recipe/RecipeAdditionalInfo/RecipeAdditionalInfo';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../atoms';
import useRefetchLocale from '../hooks/useRefetchLocale/useRefetchLocale';
import { useTranslation } from 'react-i18next';

const SingleRecipePage = () => {
  const [currentLang] = useAtom(localeLanguageAtom);
  const params = useParams();
  const { t } = useTranslation();

  const {
    data: recipeData,
    isLoading,
    error,
    refetch,
  } = useGetCollection('recipes', currentLang, '*', {
    'filters[name][$eq]': params?.name?.replaceAll('-', ' '),
  });
  const recipe = recipeData?.data?.[0]?.attributes;
  const { isLocaleChanged } = useRefetchLocale({ refetch, locale: recipe?.locale });

  if (error || !recipe)
    return (
      <PageLayout>
        <div className="flex p-5 mt-5 h-96 bg-blackBackground items-center justify-center">
          <Typography variant="h4" className="text-maltYellow">
            {t('recipes.noRecipe')}
          </Typography>
        </div>
      </PageLayout>
    );

  return (
    <PageLayout isLoading={isLoading || isLocaleChanged}>
      <div className="lg:flex lg:flex-col items-center lg:px-40 lg:mt-0 mt-[120px]">
        <div className="flex flex-col mb-10">
          <Text
            size="large"
            color="maltYellow"
            text={recipe.name}
            className="lg:text-7xl text-4xl font-bold text-center"
          />
          <div className="flex flex-1 items-center justify-center flex-row mt-2">
            <RecipeAdditionalInfo recipe={recipe} />
            {recipe?.style && (
              <Text size="medium" color="maltYellow" className="mr-4" text={`${t('recipes.style')}: ${recipe.style}`} />
            )}
          </div>
        </div>

        <div className="lg:flex lg:flex-row w-full">
          <img
            src={recipe?.cover_image?.data ? recipe.cover_image.data.attributes.url : pivariLogo}
            alt={`${recipe.name} image`}
            className="max-w-[400px] rounded-3xl object-cover lg:mx-0 mx-auto"
          />
          <div className="flex flex-col w-full lg:mt-0 mt-10">
            <div className="flex flex-col justify-center items-center">
              <Text
                size="large"
                color="maltYellow"
                text={t('recipes.ingredients')}
                className="text-4xl font-bold text-center break-all"
              />
              <Separator className="flex w-10/12 h-4 my-4" />
            </div>
            <RecipeIngredientsTable recipe={recipe} />
            {recipe?.author && (
              <div className="flex flex-col items-center ">
                <Separator className="flex w-10/12 h-4 my-4" />
                <a
                  className="group font-crimson text-2xl tracking-wide text-maltYellow hover:pointer group-hover:text-maltYellow transition-all duration-300"
                  href={recipe.author_url}
                >
                  {t('recipes.author') + ': '}
                  <strong className="group-hover:text-white transition-all duration-300">{recipe.author}</strong>
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-8 px-10 border-2 border-hopGreen rounded-3xl items-center">
          <Text
            size="large"
            color="maltYellow"
            text={t('recipes.process')}
            className="text-4xl font-bold text-center break-all my-4"
          />
          <Separator className="flex w-10/12 h-4 my-4" />
          <Markdown
            className="flex flex-col whitespace-pre-wrap self align-center justify-center text-center text-white pb-10"
            components={{ p: React.Fragment, img: MarkdownImage }}
          >
            {recipe.process}
          </Markdown>
        </div>
        <div className="flex flex-col mt-8 px-10 border-2 border-hopGreen rounded-3xl items-center">
          <Text
            size="large"
            color="maltYellow"
            text={t('recipes.aboutBeer')}
            className="text-4xl font-bold text-center break-all my-4"
          />
          <Separator className="flex w-10/12 h-4 my-4" />

          <Text size="small" color="white" text={recipe.description} className="text-center my-4" />
        </div>
      </div>
    </PageLayout>
  );
};

export default SingleRecipePage;
