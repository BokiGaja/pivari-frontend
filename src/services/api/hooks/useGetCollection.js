import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetCollection = (collectionKey, locale = 'sr', populate = '*', queryParams = {}) => {
  const { isLoading, isError, data, error, refetch } = useQuery([collectionKey], () =>
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/${collectionKey}`, {
        params: {
          locale,
          populate,
          ...queryParams,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
  );

  return { isLoading, isError, data, error, refetch };
};
