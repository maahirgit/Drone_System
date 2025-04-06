import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Import Heart Icon
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";




const DroneList = ({ userId, setCartItems }) => {
  const [drones, setDrones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await axios.get("/drone/getDroneDetails");
        let droneData = response.data.data;

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
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in localStorage");
      alert("You must be logged in to add items to cart.");
      return;
    }


    const cartData = {
      User_id: userId,
      Drone_id: drone._id,
      Start_date: new Date().toISOString().split("T")[0],
      End_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      Price_per_day: drone.Price_per_day,
    };

    console.log("cart data",cartData)

    try {
      const responses = await axios.post("/cart/createCart", cartData);
      console.log(responses.data)

      console.log("product added to cart")
      navigate("/AddToCart");


      
      toast.success("Drone added to cart successfully!", {
        position: "top-right",
      });
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart!", { position: "top-right" });
    }
  };

  

  return (
    <Container maxWidth="md" style={{ marginTop: "20px", marginBottom: "20px" }}>
      {loading ? (
        <Typography variant="h6" align="center">
          Loading drones...
        </Typography>
      ) : drones.length === 0 ? (
        <Typography variant="h6" align="center">
          No drones available
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {drones.map((drone) => (
            <Grid item xs={12} sm={6} md={4} key={drone._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="180"
                  image={drone.Images}
                  alt={drone.Drone_name}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {drone.Drone_name}
                  </Typography>
                  <Typography variant="subtitle1" align="center">
                    Brand: {drone.Drone_brand}
                  </Typography>
                  <Typography variant="subtitle2" align="center">
                    {drone.Drone_description}
                  </Typography>
                  <Typography variant="subtitle1" align="center">
                    Price per day: {drone.Price_per_day}
                  </Typography>

                  {/* Buttons: Add to Cart + Wishlist (Styled like your image) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                      gap: "10px",
                    }}
                  >
                    {/* Add to Cart Button */}
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleAddToCart(drone)}
                    >
                      Add to Cart
                    </Button>

                    
                    
                  </div>
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
