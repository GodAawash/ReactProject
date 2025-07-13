import React, { useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import { BrokenImage } from '@mui/icons-material';

const Image = ({ src, alt, sx, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx
      }}
    >
      {loading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}

      {error ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            bgcolor: 'action.hover',
            color: 'text.secondary',
            borderRadius: 1,
            p: 2
          }}
        >
          <BrokenImage sx={{ fontSize: '3rem', opacity: 0.7, mb: 1 }} />
          {alt && (
            <Box component="span" sx={{ textAlign: 'center', fontSize: '0.875rem' }}>
              {alt}
            </Box>
          )}
        </Box>
      ) : (
        <Box
          component="img"
          src={src}
          alt={alt || "Image"}
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            display: error ? 'none' : 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            ...(!loading && !error && props.imgSx)
          }}
          {...props}
        />
      )}
    </Box>
  );
};

export default Image;
