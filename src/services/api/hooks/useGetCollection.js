import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetCollection = (collectionKey, locale = 'sr', populate = '*', queryParams = {}) => {
  const isLocaleValid = ['sr', 'en', 'sr-Cyrl'].includes(locale);
  const { isLoading, isError, data, error, refetch, isRefetching } = useQuery([collectionKey], () =>
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/${collectionKey}`, {
        params: {
          locale: isLocaleValid ? locale : 'sr',
          populate,
          ...queryParams,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
  );

  return { isLoading, isError, data, error, refetch, isRefetching };
};
