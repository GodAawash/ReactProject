import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Drawer,
  IconButton,
  Divider,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Slider,
  Button,
  Breadcrumbs,
  Link,
  useMediaQuery,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FilterList, Close, NavigateNext } from '@mui/icons-material';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';

// Simulating a data fetch
import { fetchProducts, fetchCategories, fetchBrands } from '../utils/api';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A to Z' },
  { value: 'name_desc', label: 'Name: Z to A' },
  { value: 'popular', label: 'Most Popular' },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [openFilters, setOpenFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('newest');
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  
  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });

  // Parse URL params on mount
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    
    // Set initial filter values from URL
    if (params.categories) setSelectedCategories(params.categories.split(','));
    if (params.brands) setSelectedBrands(params.brands.split(','));
    if (params.priceMin && params.priceMax) setPriceRange([Number(params.priceMin), Number(params.priceMax)]);
    if (params.sortBy) setSortBy(params.sortBy);
    if (params.onSale) setOnSaleOnly(params.onSale === 'true');
    if (params.page) pagination.currentPage = Number(params.page);
  }, []);

  // Load products and filter options
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Build query params for the API
        const queryParams = {
          page: pagination.currentPage,
          limit: pagination.itemsPerPage,
          sortBy,
          categories: selectedCategories.join(','),
          brands: selectedBrands.join(','),
          priceMin: priceRange[0],
          priceMax: priceRange[1],
          onSale: onSaleOnly
        };
        
        const [productsData, categoriesData, brandsData] = await Promise.all([
          fetchProducts(queryParams),
          fetchCategories(),
          fetchBrands()
        ]);
        
        setProducts(productsData.items);
        setPagination({
          currentPage: productsData.page,
          totalPages: productsData.totalPages,
          totalItems: productsData.totalItems,
          itemsPerPage: productsData.limit
        });
        
        setCategories(categoriesData);
        setBrands(brandsData);
        setError(null);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Update URL with filters
    const params = {};
    if (selectedCategories.length) params.categories = selectedCategories.join(',');
    if (selectedBrands.length) params.brands = selectedBrands.join(',');
    if (priceRange[0] > 0 || priceRange[1] < 500) {
      params.priceMin = priceRange[0];
      params.priceMax = priceRange[1];
    }
    if (sortBy !== 'newest') params.sortBy = sortBy;
    if (onSaleOnly) params.onSale = 'true';
    if (pagination.currentPage > 1) params.page = pagination.currentPage;
    
    setSearchParams(params);
  }, [
    selectedCategories, 
    selectedBrands, 
    priceRange, 
    sortBy, 
    onSaleOnly, 
    pagination.currentPage,
    pagination.itemsPerPage
  ]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
    // Reset to page 1 when filters change
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleBrandChange = (brandId) => {
    setSelectedBrands(prev => {
      if (prev.includes(brandId)) {
        return prev.filter(id => id !== brandId);
      } else {
        return [...prev, brandId];
      }
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceChangeCommitted = () => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSaleChange = (event) => {
    setOnSaleOnly(event.target.checked);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (event, page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 500]);
    setSortBy('newest');
    setOnSaleOnly(false);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const toggleFilters = () => {
    setOpenFilters(!openFilters);
  };

  const filterContent = (
    <Box sx={{ p: isMobile ? 2 : 0 }}>
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={toggleFilters}>
            <Close />
          </IconButton>
        </Box>
      )}

      <Button 
        variant="outlined" 
        size="small" 
        onClick={resetFilters}
        sx={{ mb: 2, width: isMobile ? '100%' : 'auto' }}
      >
        Reset Filters
      </Button>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        Price Range
      </Typography>
      <Box sx={{ px: 1, my: 3 }}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          onChangeCommitted={handlePriceChangeCommitted}
          valueLabelDisplay="on"
          min={0}
          max={500}
          valueLabelFormat={(value) => `$${value}`}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">${priceRange[0]}</Typography>
          <Typography variant="body2" color="text.secondary">${priceRange[1]}</Typography>
        </Box>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Categories
        </Typography>
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox 
                  checked={selectedCategories.includes(category.id)} 
                  onChange={() => handleCategoryChange(category.id)}
                  size="small"
                />
              }
              label={
                <Typography variant="body2">
                  {category.name} ({category.count})
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Brands
        </Typography>
        <FormGroup>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand.id}
              control={
                <Checkbox 
                  checked={selectedBrands.includes(brand.id)} 
                  onChange={() => handleBrandChange(brand.id)}
                  size="small"
                />
              }
              label={
                <Typography variant="body2">
                  {brand.name} ({brand.count})
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Discount
        </Typography>
        <FormControlLabel
          control={
            <Checkbox 
              checked={onSaleOnly} 
              onChange={handleSaleChange}
              size="small"
            />
          }
          label={
            <Typography variant="body2">
              On Sale Only
            </Typography>
          }
        />
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Products</Typography>
        </Breadcrumbs>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          All Products
        </Typography>
        <Typography color="text.secondary">
          {loading ? 'Loading...' : `Showing ${pagination.totalItems} products`}
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {/* Filters - sidebar for desktop, drawer for mobile */}
        {!isMobile ? (
          <Grid item xs={12} md={3} lg={2.5}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
              {filterContent}
            </Paper>
          </Grid>
        ) : (
          <Drawer
            anchor="left"
            open={openFilters}
            onClose={toggleFilters}
            sx={{ 
              '& .MuiDrawer-paper': { 
                width: '280px', 
                boxSizing: 'border-box' 
              } 
            }}
          >
            {filterContent}
          </Drawer>
        )}
        
        {/* Product listing */}
        <Grid item xs={12} md={9} lg={9.5}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2
          }}>
            {isMobile && (
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={toggleFilters}
              >
                Filters
              </Button>
            )}
            
            <Box sx={{ 
              ml: isMobile ? 0 : 'auto',
              display: 'flex',
              alignItems: 'center',
              width: isMobile ? '100%' : 'auto'
            }}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  {sortOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          
          <ProductGrid 
            products={products}
            loading={loading}
            error={error}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductsPage;
