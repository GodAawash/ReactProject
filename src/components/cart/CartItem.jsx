import React from 'react';
import { Box, Typography, IconButton, Grid, ButtonGroup, Button } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { Link as RouterLink } from 'react-router-dom';
import Image from '../common/Image';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, name, price, image, quantity, discount } = item;

  const discountedPrice = discount 
    ? (price - (price * discount / 100)).toFixed(2) 
    : price.toFixed(2);

  const itemTotal = (discountedPrice * quantity).toFixed(2);

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  const handleRemove = () => {
    removeFromCart(id);
  };

  return (
    <Box sx={{ 
      mb: 2, 
      p: 2, 
      border: '1px solid', 
      borderColor: 'divider',
      borderRadius: 1,
      '&:hover': { 
        bgcolor: 'action.hover'
      }
    }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3} md={2}>
          <Box 
            component={RouterLink} 
            to={`/product/${id}`}
            sx={{ display: 'block', textDecoration: 'none', height: 120 }}
          >
            <Image 
              src={image} 
              alt={name}
              imgSx={{ objectFit: 'contain', borderRadius: 1 }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={5} md={4}>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to={`/product/${id}`}
            sx={{ 
              textDecoration: 'none', 
              color: 'text.primary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {name}
          </Typography>
          
          {discount > 0 ? (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="body1" color="primary" fontWeight="medium">
                ${discountedPrice}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ ml: 1, textDecoration: 'line-through' }}
              >
                ${price.toFixed(2)}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ ml: 1, bgcolor: 'error.main', color: 'white', px: 0.5, borderRadius: 0.5 }}
              >
                {discount}% OFF
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1" color="primary" fontWeight="medium" sx={{ mt: 1 }}>
              ${price.toFixed(2)}
            </Typography>
          )}
        </Grid>

        <Grid item xs={6} sm={2} md={3}>
          <ButtonGroup size="small" sx={{ height: 40 }}>
            <Button onClick={handleDecrease}>
              <Remove fontSize="small" />
            </Button>
            <Button disabled sx={{ px: 2, minWidth: 40 }}>
              {quantity}
            </Button>
            <Button onClick={handleIncrease}>
              <Add fontSize="small" />
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={4} sm={1} md={2} sx={{ textAlign: 'right' }}>
          <Typography variant="body1" fontWeight="medium">
            ${itemTotal}
          </Typography>
        </Grid>

        <Grid item xs={2} sm={1} md={1} sx={{ textAlign: 'right' }}>
          <IconButton color="error" size="small" onClick={handleRemove}>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;
