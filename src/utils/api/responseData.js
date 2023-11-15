export const sanitizeResponseData = (data, field) => {
  const responseData = data?.[field]?.data;
  if (!responseData) return [];
  if (Array.isArray(responseData)) return data[field].data.map((fieldData) => fieldData.attributes);
  return data[field].data.attributes;
};
