// src/pages/VendorDashboard.jsx
import React from "react";
import { 
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, 
  Container, Grid, Card, CardContent, Button 
} from "@mui/material";
import { Dashboard, ShoppingCart, AddCircle, Person, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DroneList from "../drone/DroneList";

const VendorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Vendor Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          <ListItem button onClick={() => navigate("/Home")}>
            <Dashboard />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ShoppingCart />
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button onClick={() => navigate("/AddDrone")}>
            <AddCircle />
            <ListItemText primary="Add Drone" />
          </ListItem>
          <ListItem button onClick={() => navigate("/Profile")}>
            <Person />
            <ListItemText primary="Profile" />
          </ListItem>
          
        </List>
      </Drawer>

      <main style={{ marginLeft: 240, padding: "20px" }}>
        <Container>
          <Grid container spacing={4}>

            <Grid item xs={12}>
              <Typography variant="h3" textAlign="center" gutterBottom fontWeight="bold" color="grey.300">
                LISTED DRONES
              </Typography>
              <DroneList />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default VendorDashboard;
