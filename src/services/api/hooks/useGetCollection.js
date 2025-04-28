import { useQuery } from '@tanstack/react-query';
import { getLocalData } from '../localDataService';

export const useGetCollection = (collectionKey, locale = 'sr', populate = '*', queryParams = {}, extraQueryKeys) => {
  const isLocaleValid = ['sr', 'en', 'sr-Cyrl'].includes(locale);
  const { isLoading, isError, data, error, refetch, isRefetching, remove } = useQuery(
    [collectionKey, locale, populate, ...(extraQueryKeys || [])],
    () => getLocalData(collectionKey, isLocaleValid ? locale : 'sr', { ...queryParams, populate })
  );

  return { isLoading, isError, data, error, refetch, isRefetching, remove };
};
