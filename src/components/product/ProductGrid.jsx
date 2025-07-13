import React from 'react';
import { Grid, Box, Typography, Pagination, CircularProgress, Alert } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, error, title, pagination, onPageChange }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No products found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      {title && (
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
          {title}
        </Typography>
      )}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {pagination && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={onPageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductGrid;
