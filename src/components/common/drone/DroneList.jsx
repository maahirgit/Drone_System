import React, { useState, useEffect } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Container } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DroneList = ({ userId, setCartItems }) => {
  const [drones, setDrones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await axios.get("http://localhost:3001/drone/getDroneDetails");
        
        let droneData = response.data.data;

        // If the response is a single object, convert it into an array
        if (!Array.isArray(droneData)) {
          droneData = [droneData];
        }

        setDrones(droneData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching drones:", error);
        toast.error("Failed to load drones!", { position: "top-right" });
        setLoading(false);
      }
    };

    fetchDrones();
  }, []);

  const handleAddToCart = async (drone) => {
    const cartData = {
      User_id: userId, // Logged-in user ID
      Drone_id: drone._id,
      Start_date: new Date().toISOString().split("T")[0],
      End_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      Price_per_day: drone.Price_per_day,
    };

    try {
      await axios.post("http://localhost:3001/cart/addtocart", cartData);

      // Fetch updated cart after adding item
      const response = await axios.get(`http://localhost:3001/cart/${userId}`);
      setCartItems(response.data);

      toast.success("Drone added to cart successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart!", { position: "top-right" });
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px", marginBottom: "20px" }}>
      {loading ? (
        <Typography variant="h6" align="center">Loading drones...</Typography>
      ) : drones.length === 0 ? (
        <Typography variant="h6" align="center">No drones available</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {drones.map((drone) => (
            <Grid item xs={12} sm={6} md={4} key={drone._id}>
              <Card>
                <CardMedia component="img" height="180" image={drone.Images} alt={drone.Drone_name} />
                <CardContent>
                  <Typography variant="h6" align="center">{drone.Drone_name}</Typography>
                  <Typography variant="subtitle1" align="center">Brand: {drone.Drone_brand}</Typography>
                  <Typography variant="subtitle2" align="center">{drone.Drone_description}</Typography>
                  <Typography variant="subtitle1" align="center">Price per day: ${drone.Price_per_day}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    onClick={() => handleAddToCart(drone)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default DroneList;
