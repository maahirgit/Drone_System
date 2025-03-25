import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";

const AddToCart = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items on page load
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`/cart/${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCartItems();
  }, [userId]);

  // Remove item from cart
  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`/cart/remove/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center">Shopping Cart</Typography>

      {cartItems.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Drone Name</TableCell>
                <TableCell>Price (₹)</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <IconButton color="secondary" onClick={() => handleRemoveItem(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">
          Your cart is empty. Add items to proceed!
        </Typography>
      )}
    </Container>
  );
};

export default AddToCart;
