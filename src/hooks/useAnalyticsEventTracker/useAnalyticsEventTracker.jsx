import ReactGA from 'react-ga4';

const useAnalyticsEventTracker = (category = 'Default category') => {
  return (action = 'Test action', label = 'Test label') => {
    ReactGA.event({ category, action, label });
  };
};
export default useAnalyticsEventTracker;
