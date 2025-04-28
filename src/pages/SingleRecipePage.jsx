import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { Typography } from '@mui/material';
import pivariLogo from '../assets/logos/pivari-logo.png';
import Text from '../components/Text/Text';
import Markdown from 'react-markdown';
import { ReactComponent as Separator } from '../assets/svg/separator.svg';
import RecipeIngredientsTable from '../components/Recipe/RecipeIngredientsTable/RecipeIngredientsTable';
import RecipeAdditionalInfo from '../components/Recipe/RecipeAdditionalInfo/RecipeAdditionalInfo';
import { useAtom } from 'jotai';
import { localeLanguageAtom } from '../atoms';
import { useTranslation } from 'react-i18next';
import { isLocaleValid } from '../utils/locale/validation';
import useSetPageTitle from '../hooks/useSetPageTitle';
import MarkdownLink from '../components/Markdown/MarkdownLink';
import MarkdownH2 from '../components/Markdown/MarkdownH2';
import MarkdownH1 from '../components/Markdown/MarkdownH1';
import DynamicHelmet from '../components/DynamicHelmet/DynamicHelmet';
import MarkdownImageMedium from '../components/Markdown/MarkdownImageMedium';
import { getLocalData, getMediaUrlById } from '../services/api/localDataService';

const SingleRecipePage = () => {
  const [currentLang] = useAtom(localeLanguageAtom);
  const params = useParams();
  const { t } = useTranslation();
  const paramsLocale = params?.locale;
  const locale = isLocaleValid(paramsLocale) ? paramsLocale : currentLang;
  useSetPageTitle(params?.name?.replaceAll('-', ' '));

  // Fetch the recipe directly from local JSON by name and locale
  const recipe = React.useMemo(() => {
    const data = getLocalData('recipe', locale);
    const found = data.data.find(
      (r) => r.attributes.name === params?.name?.replaceAll('-', ' ')
    );
    if (!found) return null;

    // Resolve cover_image to URL
    let coverImageUrl = pivariLogo;
    const coverImage = found.attributes.cover_image;
    if (coverImage) {
      if (
        typeof coverImage === 'object' &&
        coverImage.data &&
        coverImage.data.attributes &&
        coverImage.data.attributes.url
      ) {
        coverImageUrl = getMediaUrlById(coverImage.data.attributes.url);
      } else {
        coverImageUrl = getMediaUrlById(coverImage);
      }
    }

    return {
      ...found.attributes,
      cover_image: coverImageUrl,
      // ingredients is already hydrated by getLocalData
    };
  }, [locale, params?.name]);

  if (!recipe) {
    return (
      <PageLayout>
        <div className="flex p-5 mt-5 h-96 bg-blackBackground items-center justify-center">
          <Typography variant="h4" className="text-maltYellow">
            {t('recipes.noRecipe')}
          </Typography>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <DynamicHelmet
        image={recipe.cover_image ? recipe.cover_image : pivariLogo}
        name={recipe.name}
      />
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
            {recipe.style && (
              <Text
                size="medium"
                color="maltYellow"
                className="mr-4"
                text={`${t('recipes.style')}: ${recipe.style}`}
              />
            )}
          </div>
        </div>

        <div className="lg:flex lg:flex-row w-full">
          <img
            src={recipe.cover_image ? recipe.cover_image : pivariLogo}
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
            {recipe.author && (
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
            className="flex flex-col whitespace-pre-wrap self align-center justify-center text-center text-white pb-10 text-lg"
            components={{
              p: React.Fragment,
              img: MarkdownImageMedium,
              a: MarkdownLink,
              h2: MarkdownH2,
              h1: MarkdownH1,
            }}
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

          <Text size="medium" color="white" text={recipe.description} className="text-center my-4" />
        </div>
      </div>
    </PageLayout>
  );
};

export default SingleRecipePage;
