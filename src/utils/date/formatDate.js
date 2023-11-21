export const formatDate = (date, extraOptions = {}, locale = 'sr-Latn') => {
  const dateObj = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric', ...extraOptions };
  return dateObj.toLocaleDateString(locale, options);
};
