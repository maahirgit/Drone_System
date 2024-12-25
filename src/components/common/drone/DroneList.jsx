import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Container } from "@mui/material";
import drone1 from "../../../assets/drone/drone1.jpg";
import drone2 from "../../../assets/drone/mavic-2.jpg";

const drones = [
  { id: 1, name: "DJI Mavic 3", price: "$5,498.00", image: drone1 },
  { id: 2, name: "DJI FPV Drone", price: "$739.00", image: drone2 },
];

const DroneList = () => (
  <Container
    maxWidth="md" // Reduce the container width
    style={{ marginTop: "20px", marginBottom: "20px" }}
  >
    <Grid container spacing={3} justifyContent="center">
      {drones.map((drone) => (
        <Grid item xs={12} sm={6} md={4} key={drone.id}>
          <Card
            sx={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow effect
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)" },
            }}
          >
            <CardMedia component="img" height="180" image={drone.image} alt={drone.name} />
            <CardContent>
              <Typography variant="h6" align="center">
                {drone.name}
              </Typography>
              <Typography variant="subtitle1" align="center" color="textSecondary">
                {drone.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "10px" }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default DroneList;
