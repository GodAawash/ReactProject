import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Divider, 
  Button, 
  TextField, 
  Stack,
  InputAdornment,
  IconButton,
  Alert,
  Collapse
} from '@mui/material';
import { Send, LocalShipping } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartSummary = () => {
  const { cart, subtotal } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [discount, setDiscount] = useState(0);

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax - discount;

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handlePromoCodeSubmit = (e) => {
    e.preventDefault();
    
    // Example promo code logic
    if (promoCode.toLowerCase() === 'shoes10') {
      setDiscount(subtotal * 0.1); // 10% discount
      setPromoSuccess('Promo code applied: 10% off');
      setPromoError('');
    } else if (promoCode.toLowerCase() === 'freeship') {
      if (shipping > 0) {
        setDiscount(shipping);
        setPromoSuccess('Promo code applied: Free shipping');
        setPromoError('');
      } else {
        setPromoError('Shipping is already free for your order');
        setPromoSuccess('');
      }
    } else {
      setPromoError('Invalid promo code');
      setPromoSuccess('');
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Order Summary
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1 }}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
        </Typography>
        
        <form onSubmit={handlePromoCodeSubmit}>
          <TextField
            fullWidth
            size="small"
            label="Promo Code"
            variant="outlined"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    edge="end" 
                    type="submit"
                    disabled={!promoCode.trim()}
                  >
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        
        <Collapse in={!!promoError || !!promoSuccess}>
          {promoError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {promoError}
            </Alert>
          )}
          
          {promoSuccess && (
            <Alert severity="success" sx={{ mt: 1 }}>
              {promoSuccess}
            </Alert>
          )}
        </Collapse>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Stack spacing={1.5}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Subtotal</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Shipping</Typography>
            {shipping === 0 && (
              <Typography 
                variant="body2" 
                sx={{ 
                  ml: 1, 
                  color: 'success.main', 
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.75rem'
                }}
              >
                <LocalShipping fontSize="inherit" sx={{ mr: 0.5 }} />
                Free
              </Typography>
            )}
          </Box>
          <Typography>${shipping.toFixed(2)}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Tax (7%)</Typography>
          <Typography>${tax.toFixed(2)}</Typography>
        </Box>
        
        {discount > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="error.main">Discount</Typography>
            <Typography color="error.main">-${discount.toFixed(2)}</Typography>
          </Box>
        )}
      </Stack>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Total
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          ${total.toFixed(2)}
        </Typography>
      </Box>
      
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        fullWidth
        onClick={handleCheckout}
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </Button>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
        Secure payment processing. All major credit cards accepted.
      </Typography>
    </Paper>
  );
};

export default CartSummary;
