// React hook that is using react-query to fetch data from the API
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetArticles = () => {
  const { isLoading, isError, data, error } = useQuery(['articles'], () =>
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/articles`, {
        params: {
          locale: 'sr',
        },
      })
      .then((res) => res.data)
  );

  return { isLoading, isError, data, error };
};
