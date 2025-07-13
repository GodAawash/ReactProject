// Mock data for products, categories, and brands
const mockProducts = Array.from({ length: 36 }, (_, i) => ({
  id: `p${i + 1}`,
  name: `Shoe Model ${i + 1}`,
  price: 59.99 + (i % 10) * 10,
  image: `https://picsum.photos/seed/shoe${i + 1}/300/300`,
  description: `Comfortable and stylish shoe perfect for everyday wear. Feature-packed with the latest technology for optimal comfort and support.`,
  rating: Math.floor(Math.random() * 5) / 2 + 2.5, // Rating between 2.5 and 5
  discount: i % 5 === 0 ? Math.floor(Math.random() * 30) + 10 : 0, // 0%, 10-40% discount
  isNew: i % 7 === 0,
  features: [
    "Breathable mesh upper",
    "Cushioned insole",
    "Durable rubber outsole",
    "Available in multiple colors",
  ],
  stock: Math.floor(Math.random() * 50) + 5,
  brand: `brand${(i % 5) + 1}`,
  category: `cat${(i % 4) + 1}`,
}));

const mockCategories = [
  { id: "cat1", name: "Running", count: 9, image: "https://picsum.photos/seed/running/500/300" },
  { id: "cat2", name: "Casual", count: 9, image: "https://picsum.photos/seed/casual/500/300" },
  { id: "cat3", name: "Formal", count: 9, image: "https://picsum.photos/seed/formal/500/300" },
  { id: "cat4", name: "Sports", count: 9, image: "https://picsum.photos/seed/sports/500/300" },
];

const mockBrands = [
  { id: "brand1", name: "Nike", count: 7 },
  { id: "brand2", name: "Adidas", count: 6 },
  { id: "brand3", name: "Puma", count: 6 },
  { id: "brand4", name: "Reebok", count: 5 },
  { id: "brand5", name: "New Balance", count: 6 },
];

// Utility function to filter and sort products
const filterAndSortProducts = (products, filters) => {
  let filteredProducts = [...products];

  // Filter by categories
  if (filters.categories && filters.categories.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      filters.categories.includes(p.category)
    );
  }

  // Filter by brands
  if (filters.brands && filters.brands.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      filters.brands.includes(p.brand)
    );
  }

  // Filter by price range
  if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
    filteredProducts = filteredProducts.filter(p => 
      p.price >= filters.priceMin && p.price <= filters.priceMax
    );
  }

  // Filter by sale items
  if (filters.onSale) {
    filteredProducts = filteredProducts.filter(p => p.discount > 0);
  }

  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'popular':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Newest first - no sorting needed as mock data is already in this order
        break;
    }
  }

  return filteredProducts;
};

// Pagination utility
const paginateResults = (items, page = 1, limit = 12) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  
  return {
    items: paginatedItems,
    page,
    limit,
    totalItems: items.length,
    totalPages: Math.ceil(items.length / limit)
  };
};

// Mock API functions with artificial delay to simulate network requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all products with filtering, sorting, and pagination
export const fetchProducts = async (params = {}) => {
  await delay(800); // Simulate network delay
  
  const filteredProducts = filterAndSortProducts(mockProducts, params);
  return paginateResults(filteredProducts, params.page, params.limit);
};

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
  await delay(500);
  
  const product = mockProducts.find(p => p.id === productId);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

// Fetch featured products
export const fetchFeaturedProducts = async () => {
  await delay(600);
  
  // Get products with highest ratings
  return mockProducts
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);
};

// Fetch new arrivals
export const fetchNewArrivals = async () => {
  await delay(600);
  
  // Get products marked as new
  const newProducts = mockProducts.filter(p => p.isNew);
  
  // If not enough new products, supplement with other products
  if (newProducts.length < 4) {
    const additionalProducts = mockProducts
      .filter(p => !p.isNew)
      .slice(0, 4 - newProducts.length);
    
    return [...newProducts, ...additionalProducts].slice(0, 4);
  }
  
  return newProducts.slice(0, 4);
};

// Fetch all categories
export const fetchCategories = async () => {
  await delay(400);
  return mockCategories;
};

// Fetch all brands
export const fetchBrands = async () => {
  await delay(400);
  return mockBrands;
};

// Fetch related products
export const fetchRelatedProducts = async (productId, limit = 4) => {
  await delay(500);
  
  const currentProduct = mockProducts.find(p => p.id === productId);
  if (!currentProduct) {
    return mockProducts.slice(0, limit);
  }
  
  // Find products in the same category
  const relatedByCat = mockProducts.filter(p => 
    p.id !== productId && p.category === currentProduct.category
  );
  
  // If not enough related by category, add some from the same brand
  if (relatedByCat.length < limit) {
    const relatedByBrand = mockProducts.filter(p => 
      p.id !== productId && 
      p.category !== currentProduct.category && 
      p.brand === currentProduct.brand
    );
    
    return [...relatedByCat, ...relatedByBrand].slice(0, limit);
  }
  
  return relatedByCat.slice(0, limit);
};

// Mock search function
export const searchProducts = async (query) => {
  await delay(600);
  
  if (!query || query.trim() === '') {
    return { items: [], totalItems: 0 };
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  const results = mockProducts.filter(product => 
    product.name.toLowerCase().includes(normalizedQuery) || 
    product.description.toLowerCase().includes(normalizedQuery)
  );
  
  return {
    items: results.slice(0, 20),
    totalItems: results.length
  };
};
