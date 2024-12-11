import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel, useTheme, useMediaQuery } from '@mui/material';
import myImage from '../../../assets/auth/image3_upscaled.jpg'; // Ensure the correct path to your image file

const LoginPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Simulate a delay to show the roll-out effect
    setTimeout(() => {
      setIsFormVisible(true);
    }, 500); // Adjust the delay as needed
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${myImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
          opacity: 5 // Adjust opacity as needed
        }}
      />

      {/* Login Form */}
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
          width: { xs: '90%', md: '400px' },
          transform: isFormVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        <Typography
          variant={isSmallScreen ? 'h5' : 'h4'}
          sx={{ marginBottom: 2, fontWeight: 'bold', color: '#222' }}
        >
          Sign In
        </Typography>
        <TextField
          fullWidth
          label="Username"
          variant="filled"
          InputProps={{
            style: {
              background: 'rgba(255, 255, 255, 0.5)',
              color: '#333',
              borderRadius: '8px',
            },
          }}
          InputLabelProps={{
            style: { color: '#333' },
          }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="filled"
          InputProps={{
            style: {
              background: 'rgba(255, 255, 255, 0.5)',
              color: '#333',
              borderRadius: '8px',
            },
          }}
          InputLabelProps={{
            style: { color: '#333' },
          }}
          sx={{ marginBottom: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            marginBottom: 2,
            background: '#4CAF50',
            color: '#fff',
            padding: '10px 0',
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: '8px',
            transition: 'background 0.3s ease',
            '&:hover': {
              background: '#45a049',
            },
          }}
        >
          Sign In
        </Button>
        <FormControlLabel
          control={<Checkbox sx={{ color: '#333' }} />}
          label="Remember Me"
          sx={{ marginBottom: 1, color: '#444' }}
        />
        <Typography
          variant="body2"
          sx={{ marginBottom: 1, color: '#444', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Forgot Password?
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;