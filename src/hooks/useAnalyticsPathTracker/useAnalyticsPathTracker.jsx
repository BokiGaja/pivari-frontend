import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const useAnalyticsPathTracker = () => {
  useEffect(() => {
    ReactGA.send('page_view', { page_path: window.location.pathname });
  }, []);
};

export default useAnalyticsPathTracker;
