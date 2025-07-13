import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowForward } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import Image from '../components/common/Image';

// Simulating a data fetch
import { fetchFeaturedProducts, fetchNewArrivals, fetchCategories } from '../utils/api';
import heroBackground from '../assets/images/hero-bg.jpg';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${heroBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: theme.spacing(10, 2),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    height: '400px',
    padding: theme.spacing(6, 2),
  },
}));

const CategoryCard = styled(Paper)(({ theme }) => ({
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  textAlign: 'center',
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
    '& .overlay': {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
  },
}));

const CategoryOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'background-color 0.3s ease',
  zIndex: 1,
});

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [featuredData, newArrivalsData, categoriesData] = await Promise.all([
          fetchFeaturedProducts(),
          fetchNewArrivals(),
          fetchCategories()
        ]);
        
        setFeaturedProducts(featuredData);
        setNewArrivals(newArrivalsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error('Error loading homepage data:', err);
        setError('Failed to load homepage data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Step Into Comfort & Style
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Discover premium footwear for every occasion
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large" 
              component={RouterLink} 
              to="/products"
              sx={{ px: 4, py: 1.5 }}
            >
              Shop Now
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              color="inherit"
              component={RouterLink} 
              to="/new-arrivals"
              sx={{ px: 4, py: 1.5, borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              New Arrivals
            </Button>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="xl">
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
            Shop By Category
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item key={category.id} xs={12} sm={6} md={4}>
                <CategoryCard
                  component={RouterLink}
                  to={`/category/${category.id}`}
                  sx={{ 
                    textDecoration: 'none',
                    position: 'relative'
                  }}
                >
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      imgSx={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <CategoryOverlay className="overlay">
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {category.name}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="inherit"
                      size="small"
                      sx={{ 
                        mt: 1, 
                        borderColor: 'white',
                        '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' }
                      }}
                    >
                      Explore
                    </Button>
                  </CategoryOverlay>
                </CategoryCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
              Featured Products
            </Typography>
            <Button 
              endIcon={<ArrowForward />} 
              component={RouterLink} 
              to="/products"
            >
              View all
            </Button>
          </Box>
          
          <ProductGrid 
            products={featuredProducts} 
            loading={loading} 
            error={error} 
          />
        </Box>

        <Divider sx={{ my: 6 }} />

        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
              New Arrivals
            </Typography>
            <Button 
              endIcon={<ArrowForward />} 
              component={RouterLink} 
              to="/new-arrivals"
            >
              View all
            </Button>
          </Box>
          
          <ProductGrid 
            products={newArrivals} 
            loading={loading} 
            error={error} 
          />
        </Box>

        <Box 
          sx={{ 
            my: 6, 
            p: 4, 
            bgcolor: 'primary.light', 
            borderRadius: 2,
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Subscribe for Exclusive Offers
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Join our newsletter and be the first to know about new arrivals, seasonal sales and exclusive promotions.
          </Typography>
          <Box 
            component="form" 
            sx={{ 
              display: 'flex', 
              maxWidth: 500, 
              mx: 'auto',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1
            }}
          >
            <Box 
              component="input" 
              type="email" 
              placeholder="Your email address" 
              required
              sx={{ 
                flex: 1,
                p: 1.5,
                border: 'none',
                borderRadius: 1,
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '1rem'
              }}
            />
            <Button 
              variant="contained" 
              type="submit"
              sx={{ 
                bgcolor: 'primary.dark', 
                py: { xs: 1, sm: 0 }, 
                px: 3,
                '&:hover': { bgcolor: 'primary.dark' } 
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
