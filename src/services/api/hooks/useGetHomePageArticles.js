import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetHomePageArticles = () => {
  const { isLoading, isError, data, error } = useQuery(['homePageArticles'], () =>
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/home-page`, {
        params: {
          locale: 'sr',
          populate: 'articles.cover_image',
        },
      })
      .then((res) => res.data?.data)
      .catch((err) => console.log(err))
  );

  return { isLoading, isError, data: data?.attributes, error };
};
