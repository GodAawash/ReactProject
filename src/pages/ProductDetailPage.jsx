import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Button, 
  Breadcrumbs, 
  Link, 
  Rating, 
  Tabs, 
  Tab, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton,
  Alert,
  CircularProgress,
  Snackbar,
  Paper
} from '@mui/material';
import { 
  ShoppingCart, 
  Favorite, 
  FavoriteBorder, 
  NavigateNext, 
  Remove, 
  Add 
} from '@mui/icons-material';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchProductById, fetchRelatedProducts } from '../utils/api';
import ProductGrid from '../components/product/ProductGrid';
import Image from '../components/common/Image';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        
        // Reset quantity when product changes
        setQuantity(1);
        
        // Fetch product and related products
        const [productData, relatedData] = await Promise.all([
          fetchProductById(productId),
          fetchRelatedProducts(productId)
        ]);
        
        setProduct(productData);
        setRelatedProducts(relatedData);
        setError(null);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setNotificationOpen(true);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error || 'Product not found'}
        </Alert>
        <Button 
          variant="contained" 
          component={RouterLink} 
          to="/products"
          sx={{ mt: 2 }}
        >
          Return to Products
        </Button>
      </Container>
    );
  }

  const { 
    name, 
    price, 
    image, 
    description, 
    rating, 
    discount, 
    features, 
    stock,
    category,
    brand
  } = product;

  const discountedPrice = discount 
    ? (price - (price * discount / 100)).toFixed(2) 
    : price.toFixed(2);

  const isInStock = stock > 0;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 4 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Link component={RouterLink} to="/products" color="inherit">
          Products
        </Link>
        <Link component={RouterLink} to={`/category/${category}`} color="inherit">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
        <Typography color="text.primary">{name}</Typography>
      </Breadcrumbs>

      {/* Product Details */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={1} 
            sx={{ 
              height: 500, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              p: 4,
              borderRadius: 2
            }}
          >
            <Image 
              src={image} 
              alt={name}
              imgSx={{ 
                objectFit: 'contain', 
                maxHeight: '100%', 
                maxWidth: '100%' 
              }}
            />
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            {name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={rating} precision={0.5} readOnly />
            <Typography color="text.secondary" sx={{ ml: 1 }}>
              ({rating})
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Typography color="text.secondary">
              Brand: <Link component={RouterLink} to={`/brand/${brand}`}>{brand}</Link>
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Typography 
              color={isInStock ? 'success.main' : 'error.main'} 
              fontWeight="medium"
            >
              {isInStock ? 'In Stock' : 'Out of Stock'}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            {discount > 0 ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  ${discountedPrice}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    ml: 2, 
                    textDecoration: 'line-through',
                    color: 'text.secondary'
                  }}
                >
                  ${price.toFixed(2)}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    ml: 2,
                    bgcolor: 'error.main',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1
                  }}
                >
                  {discount}% OFF
                </Typography>
              </Box>
            ) : (
              <Typography variant="h4" color="primary" fontWeight="bold">
                ${price.toFixed(2)}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" paragraph>
            {description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Quantity:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                onClick={() => handleQuantityChange(-1)} 
                disabled={quantity <= 1}
                size="small"
              >
                <Remove />
              </IconButton>
              <Typography 
                sx={{ 
                  mx: 2, 
                  minWidth: 40, 
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  py: 0.5,
                  px: 2
                }}
              >
                {quantity}
              </Typography>
              <IconButton 
                onClick={() => handleQuantityChange(1)} 
                disabled={quantity >= stock || !isInStock}
                size="small"
              >
                <Add />
              </IconButton>
              {stock <= 5 && stock > 0 && (
                <Typography variant="body2" color="error" sx={{ ml: 2 }}>
                  Only {stock} left!
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={!isInStock}
              sx={{ flex: 1 }}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large" 
              onClick={handleBuyNow}
              disabled={!isInStock}
              sx={{ flex: 1 }}
            >
              Buy Now
            </Button>
            <IconButton 
              color={isFavorite ? 'error' : 'default'} 
              onClick={handleToggleFavorite}
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Product Tabs */}
      <Box sx={{ mb: 6 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Description" />
          <Tab label="Features" />
          <Tab label="Shipping Info" />
        </Tabs>
        
        {/* Description Tab */}
        <Box sx={{ py: 3, display: activeTab === 0 ? 'block' : 'none' }}>
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
          <Typography variant="body1">
            Our {name} provides exceptional comfort and style for any occasion. 
            Crafted with premium materials and attention to detail, this shoe offers 
            the perfect blend of fashion and function.
          </Typography>
        </Box>
        
        {/* Features Tab */}
        <Box sx={{ py: 3, display: activeTab === 1 ? 'block' : 'none' }}>
          <List>
            {features.map((feature, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </List>
        </Box>
        
        {/* Shipping Tab */}
        <Box sx={{ py: 3, display: activeTab === 2 ? 'block' : 'none' }}>
          <Typography variant="body1" paragraph>
            <strong>Free Shipping:</strong> Orders over $100 qualify for free shipping.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Standard Shipping:</strong> 5-7 business days.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Express Shipping:</strong> 2-3 business days (additional charges apply).
          </Typography>
          <Typography variant="body1">
            <strong>Returns:</strong> Easy 30-day return policy. Items must be in original condition 
            with tags attached.
          </Typography>
        </Box>
      </Box>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            You May Also Like
          </Typography>
          <ProductGrid products={relatedProducts} />
        </Box>
      )}

      {/* Notification Snackbar */}
      <Snackbar
        open={notificationOpen}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {product.name} added to your cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetailPage;
