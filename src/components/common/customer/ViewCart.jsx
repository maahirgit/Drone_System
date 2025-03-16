import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Dji mavic 4',
      image: 'https://example.com/nike-cosmic-runner.jpg', // Replace with actual image URL
      price: 3595,
      quantity: 1,
    },
    // Add more cart items here
  ]);

  const handleQuantityChange = (itemId, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: action === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  return (
    <Box sx={{ margin: '20px' }}>
      <Grid container spacing={2} alignItems="stretch">
        {/* Cart Items Section */}
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
                sx={{ width: 150 }}
              />
              <CardContent sx={{ flex: '1' }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                  <IconButton onClick={() => handleQuantityChange(item.id, 'decrease')}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ margin: '0 10px' }}>
                    {item.quantity}
                  </Typography>
                  <IconButton onClick={() => handleQuantityChange(item.id, 'increase')}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Summary Section - Full Height */}
        <Grid item xs={12} md={4} sx={{ alignSelf: 'stretch' }}>
          <Card sx={{ padding: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5">Summary</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>
                  ₹ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">
                  ₹ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Button variant="contained" fullWidth sx={{ marginTop: 2 }}>
                Guest Checkout
              </Button>
              <Button variant="contained" fullWidth sx={{ marginTop: 1 }}>
                Member Checkout
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
