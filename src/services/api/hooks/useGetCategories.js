import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetCategories = () => {
  const { isLoading, isError, data, error } = useQuery(['categories'], () =>
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/categories`, {
        params: {
          locale: 'sr',
          populate: '*',
        },
      })
      .then((res) => res.data)
  );

  return { isLoading, isError, data, error };
};
