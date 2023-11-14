import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetHomePageArticles = () => {
  const { isLoading, isError, data, error } = useQuery(['home-page-articles'], () =>
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/home-page`, {
        params: {
          locale: 'sr',
          populate: '*',
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
  );

  return { isLoading, isError, data: data?.data?.attributes, error };
};
