import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import { Delete, Add, Remove } from "@mui/icons-material";
import axios from "axios";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.warn("User ID not found in localStorage");
        return;
      }

      try {
        const response = await axios.get(`/cart/getcart/${userId}`);
        const dataWithDays = response.data.data.map((item) => ({
          ...item,
          days: 1,
        }));
        setCartItems(dataWithDays);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`/cart/remove/${id}`);
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleChangeDays = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, days: Math.max(1, item.days + delta) }
          : item
      )
    );
  };

  const handleCalculateTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.Drone_id.Price_per_day * item.days,
      0
    );
    setTotalAmount(total);
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    try {
      for (const item of cartItems) {
        const orderData = {
          User_id: userId,
          Drone_id: item.Drone_id._id,
          Price: item.Drone_id.Price_per_day,
          Days: item.days,
        };

        await axios.post("/order/createOrder", orderData);
      }

      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to complete checkout. Please try again later.");
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "30px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Drone Name</strong></TableCell>
                  <TableCell><strong>Price (₹)</strong></TableCell>
                  <TableCell><strong>Days</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.Drone_id.Drone_name}</TableCell>
                    <TableCell>{item.Drone_id.Price_per_day}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleChangeDays(item._id, -1)}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      {item.days}
                      <IconButton
                        size="small"
                        onClick={() => handleChangeDays(item._id, 1)}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <Button
              variant="outlined"
              color="success"
              style={{ marginRight: "15px" }}
              onClick={handleCalculateTotal}
            >
              Calculate Total Amount
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>

          {totalAmount !== null && (
            <Typography
              variant="h6"
              align="right"
              style={{ marginTop: "10px", color: "#2e7d32" }}
            >
              Total Amount: ₹{totalAmount}
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">
          Your cart is empty. Add items to proceed!
        </Typography>
      )}
    </Container>
  );
};

export default AddToCart;
