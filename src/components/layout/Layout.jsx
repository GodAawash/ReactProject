import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useCart } from '../../context/CartContext';

const Layout = ({ children }) => {
  const { cart } = useCart();
  const cartItemsCount = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <Header cartItemsCount={cartItemsCount} />
      <Box component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
