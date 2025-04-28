import localData from '../../data/export_custom-db_250428110740384.json';

const getCollectionData = (collectionKey) => {
  return localData.data[`api::${collectionKey}.${collectionKey}`] || {};
};

// Helper to get media (files/images) collection
const getMediaData = () => {
  // Try common Strapi media keys
  return (
    localData.data['plugin::upload.file'] ||
    localData.data['upload::file.file'] ||
    localData.data['file'] ||
    {}
  );
};

// Parse populate string into a tree structure
function parsePopulate(populate) {
  if (!populate) return {};
  const tree = {};
  populate.split(',').map(f => f.trim()).forEach(field => {
    const parts = field.split('.');
    let current = tree;
    for (const part of parts) {
      if (!current[part]) current[part] = {};
      current = current[part];
    }
  });
  return tree;
}

// Recursively resolve relations
function resolveRelation(id, collectionKey, nestedPopulateTree = {}) {
  const collectionData = getCollectionData(collectionKey);
  const item = collectionData[id];
  if (!item) return null;

  // Recursively resolve nested relations
  const attributes = { ...item };

  for (const field in nestedPopulateTree) {
    if (Array.isArray(item[field])) {
      // Array of relations (e.g., articles, categories)
      attributes[field] = {
        data: item[field].map(relId => resolveRelation(relId, field.slice(0, -1), nestedPopulateTree[field]))
      };
    } else if (item[field]) {
      // If it's a number or string, treat as asset (not a relation)
      if (typeof item[field] === 'number' || typeof item[field] === 'string') {
        // Try to resolve as media
        const mediaData = getMediaData();
        const media = mediaData[item[field]];
        attributes[field] = {
          data: media
            ? { attributes: { url: media.url } }
            : { attributes: { url: item[field] } }
        };
      } else {
        // Otherwise, treat as a relation
        attributes[field] = {
          data: resolveRelation(item[field], field, nestedPopulateTree[field])
        };
      }
    }
  }

  // Always resolve logo and cover_image as objects if present and not already resolved
  if (item.logo && !attributes.logo) {
    const mediaData = getMediaData();
    const media = mediaData[item.logo];
    attributes.logo = {
      data: media ? { attributes: { url: media.url } } : { attributes: { url: item.logo } }
    };
  }
  if (item.cover_image && !attributes.cover_image) {
    const mediaData = getMediaData();
    const media = mediaData[item.cover_image];
    attributes.cover_image = {
      data: media ? { attributes: { url: media.url } } : { attributes: { url: item.cover_image } }
    };
  }
  if (item.carousel && !attributes.carousel) {
    attributes.carousel = {
      data: item.carousel.map(id => ({
        attributes: {
          url: id
        }
      }))
    };
  }

  return {
    id: item.id,
    attributes
  };
}

export const getLocalData = (collectionKey, locale = 'sr', queryParams = {}) => {
  const data = getCollectionData(collectionKey);
  if (!data) return { data: [] };

  // Convert object to array and filter by locale
  let items = Object.values(data).filter(item => item.locale === locale);

  // Apply sorting if specified
  if (queryParams['sort[name]']) {
    items = items.sort((a, b) => {
      if (queryParams['sort[name]'] === 'asc') {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
  }

  // Apply filters
  if (queryParams['filters[name][$eq]']) {
    items = items.filter(item => item.name === queryParams['filters[name][$eq]']);
  }
  if (queryParams['filters[title][$eq]']) {
    items = items.filter(item => item.title === queryParams['filters[title][$eq]']);
  }
  if (queryParams['filters[title][$containsi]']) {
    const searchTerm = queryParams['filters[title][$containsi]'].toLowerCase();
    items = items.filter(item => item.title?.toLowerCase().includes(searchTerm));
  }
  if (queryParams['filters[name][$containsi]']) {
    const searchTerm = queryParams['filters[name][$containsi]'].toLowerCase();
    items = items.filter(item => item.name?.toLowerCase().includes(searchTerm));
  }
  if (queryParams['filters[categories][name][$eq]']) {
    const categoryName = queryParams['filters[categories][name][$eq]'];
    items = items.filter(item => item.categories?.data?.some(cat => cat.attributes.name === categoryName));
  }

  // Apply pagination if specified
  if (queryParams['pagination[page]'] && queryParams['pagination[pageSize]']) {
    const page = parseInt(queryParams['pagination[page]']);
    const pageSize = parseInt(queryParams['pagination[pageSize]']);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    items = items.slice(start, end);
  }

  // Parse populate tree
  const populateTree = parsePopulate(queryParams.populate);

  // Transform data to match Strapi format and resolve relations recursively
  return {
    data: items.map(item => {
      // If there are populate fields, resolve them recursively
      if (Object.keys(populateTree).length > 0) {
        return resolveRelation(item.id, collectionKey, populateTree);
      }
      // Otherwise, just return the item as before
      const attributes = { ...item };
      if (item.logo) {
        const mediaData = getMediaData();
        const media = mediaData[item.logo];
        attributes.logo = {
          data: media ? { attributes: { url: media.url } } : { attributes: { url: item.logo } }
        };
      }
      if (item.cover_image) {
        const mediaData = getMediaData();
        const media = mediaData[item.cover_image];
        attributes.cover_image = {
          data: media ? { attributes: { url: media.url } } : { attributes: { url: item.cover_image } }
        };
      }
      if (item.carousel) {
        attributes.carousel = {
          data: item.carousel.map(id => ({
            attributes: {
              url: id
            }
          }))
        };
      }
      // Hydrate ingredients for recipes
      if (collectionKey === 'recipe' && Array.isArray(item.ingredients)) {
        const ingredientsCollection = localData.data['sastojci.sirovine'] || {};
        attributes.ingredients = item.ingredients
          .map(id => ingredientsCollection[id])
          .filter(Boolean);
      }
      return {
        id: item.id,
        attributes
      };
    })
  };
};

export function getArticleByTitle(title, locale = 'sr') {
  const articles = localData.data['api::article.article'];
  if (!articles) return null;
  const found = Object.values(articles).find(
    (a) => a.title === title && a.locale === locale
  );
  if (!found) return null;

  // Optionally resolve cover_image as before
  let coverImageUrl = null;
  if (found.cover_image) {
    const mediaData =
      localData.data['plugin::upload.file'] ||
      localData.data['upload::file.file'] ||
      localData.data['file'] ||
      {};
    const media = mediaData[found.cover_image];
    coverImageUrl = media ? media.url : found.cover_image;
  }

  // Resolve categories to full objects
  let categories = [];
  if (found.categories && Array.isArray(found.categories)) {
    const categoriesData = localData.data['api::category.category'] || {};
    categories = found.categories
      .map((catId) => categoriesData[catId])
      .filter(Boolean);
  }

  return {
    ...found,
    cover_image: coverImageUrl,
    categories,
  };
}

export function getAllCategories(locale = 'sr') {
  const categories = localData.data['api::category.category'];
  if (!categories) return [];
  return Object.values(categories).filter((cat) => cat.locale === locale);
}

export function getMediaUrlById(id) {
  const mediaData =
    localData.data['plugin::upload.file'] ||
    localData.data['upload::file.file'] ||
    localData.data['file'] ||
    {};
  const media = mediaData[id];
  return media ? media.url : id;
} 