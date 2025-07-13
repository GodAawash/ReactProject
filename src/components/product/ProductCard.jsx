import React from 'react';
import { Card, CardContent, Typography, Box, Rating, Button, IconButton } from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Image from '../common/Image';

const ProductCard = ({ product }) => {
  const { id, name, price, image, rating, discount, isNew } = product;
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const discountedPrice = discount 
    ? (price - (price * discount / 100)).toFixed(2) 
    : price.toFixed(2);

  return (
    <Card 
      component={RouterLink} 
      to={`/product/${id}`}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.3s',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
        },
      }}
    >
      {isNew && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            left: 10, 
            bgcolor: 'secondary.main', 
            color: 'white', 
            py: 0.5, 
            px: 1, 
            borderRadius: 1,
            zIndex: 1
          }}
        >
          New
        </Box>
      )}
      
      {discount > 0 && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: isNew ? 45 : 10, 
            left: 10, 
            bgcolor: 'error.main', 
            color: 'white', 
            py: 0.5, 
            px: 1, 
            borderRadius: 1,
            zIndex: 1
          }}
        >
          {discount}% OFF
        </Box>
      )}

      <Box sx={{ position: 'relative' }}>
        <Box sx={{ height: 200 }}>
          <Image
            src={image}
            alt={name}
            imgSx={{ objectFit: 'contain', p: 2 }}
          />
        </Box>
        <IconButton 
          onClick={toggleFavorite}
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8, 
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper' }
          }}
          aria-label="add to favorites"
        >
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
          {name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            ({rating})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="primary" component="span" sx={{ fontWeight: 'bold' }}>
            ${discountedPrice}
          </Typography>
          
          {discount > 0 && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              component="span" 
              sx={{ ml: 1, textDecoration: 'line-through' }}
            >
              ${price.toFixed(2)}
            </Typography>
          )}
        </Box>

        <Button 
          variant="contained" 
          color="primary"
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          fullWidth
          sx={{ mt: 'auto' }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
