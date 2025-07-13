import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Button, 
  Divider, 
  Card, 
  CardContent,
  Breadcrumbs,
  Link,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  NavigateNext, 
  ShoppingCart, 
  ArrowBack, 
  LocalShipping, 
  Security, 
  Replay
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const CartPage = () => {
  const { cart, clearCart } = useCart();
  
  const hasItems = cart.length > 0;
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 4 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">Shopping Cart</Typography>
      </Breadcrumbs>
      
      {/* Cart Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          <ShoppingCart sx={{ mr: 1, fontSize: '2rem', verticalAlign: 'middle' }} />
          Your Shopping Cart
        </Typography>
        
        {hasItems && (
          <Button 
            variant="outlined" 
            color="error" 
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        )}
      </Box>
      
      {hasItems ? (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} lg={8}>
            <Card variant="outlined" sx={{ mb: { xs: 4, lg: 0 } }}>
              <CardContent>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">
                    {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                  </Typography>
                  <Typography variant="h6">
                    Price
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                {cart.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </CardContent>
            </Card>
          </Grid>
          
          {/* Cart Summary */}
          <Grid item xs={12} lg={4}>
            <CartSummary />
            
            <Paper sx={{ mt: 3, p: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                We Offer
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <LocalShipping fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Free shipping on orders over $100" 
                    secondary="Standard delivery: 5-7 business days"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Replay fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="30-day easy returns" 
                    secondary="Return for refund or exchange"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Security fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Secure Checkout" 
                    secondary="SSL encrypted payment processing"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Card variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ 
            mb: 4, 
            display: 'flex', 
            justifyContent: 'center', 
            opacity: 0.7 
          }}>
            <ShoppingCart sx={{ fontSize: 80 }} />
          </Box>
          
          <Typography variant="h5" sx={{ mb: 2 }}>
            Your cart is empty
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          
          <Button 
            variant="contained" 
            size="large" 
            component={RouterLink} 
            to="/products" 
            startIcon={<ArrowBack />}
          >
            Continue Shopping
          </Button>
        </Card>
      )}
    </Container>
  );
};

export default CartPage;
