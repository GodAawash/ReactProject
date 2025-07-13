import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube, LinkedIn, Email, Phone, LocationOn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom component="div">
              SHOE HAVEN
            </Typography>
            <Typography variant="body2" component="div" sx={{ mb: 2 }}>
              Your one-stop destination for premium footwear, offering quality, comfort and style for everyone.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" aria-label="Facebook" component="a" href="#" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter" component="a" href="#" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram" component="a" href="#" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="YouTube" component="a" href="#" target="_blank">
                <YouTube />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn" component="a" href="#" target="_blank">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/products" color="inherit" display="block" sx={{ mb: 1 }}>
              Products
            </Link>
            <Link component={RouterLink} to="/categories" color="inherit" display="block" sx={{ mb: 1 }}>
              Categories
            </Link>
            <Link component={RouterLink} to="/sale" color="inherit" display="block" sx={{ mb: 1 }}>
              Sale
            </Link>
            <Link component={RouterLink} to="/new-arrivals" color="inherit" display="block" sx={{ mb: 1 }}>
              New Arrivals
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
            <Link component={RouterLink} to="/faq" color="inherit" display="block" sx={{ mb: 1 }}>
              FAQs
            </Link>
            <Link component={RouterLink} to="/shipping" color="inherit" display="block" sx={{ mb: 1 }}>
              Shipping & Returns
            </Link>
            <Link component={RouterLink} to="/size-guide" color="inherit" display="block" sx={{ mb: 1 }}>
              Size Guide
            </Link>
            <Link component={RouterLink} to="/privacy-policy" color="inherit" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="body2">123 Shoe Avenue, Fashion District, City</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">+1 (555) 123-4567</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">support@shoehaven.com</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ mb: { xs: 2, md: 0 } }}>
            &copy; {new Date().getFullYear()} SHOE HAVEN. All rights reserved.
          </Typography>
          <Box>
            <Link color="inherit" sx={{ mx: 1 }} component={RouterLink} to="/terms">
              Terms of Service
            </Link>
            <Link color="inherit" sx={{ mx: 1 }} component={RouterLink} to="/privacy">
              Privacy Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
