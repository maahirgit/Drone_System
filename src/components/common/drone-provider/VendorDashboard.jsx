import React from "react";
import { 
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, 
  Container, Grid, Card, CardContent, Button, CardMedia 
} from "@mui/material";
import { Dashboard, ShoppingCart, AddCircle, Person, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import drone1 from "../../../assets/drone/drone1.jpg";
import drone2 from "../../../assets/drone/mavic-2.jpg";

const drones = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  name: `Drone Model ${index + 1}`,
  price: `₹${(index + 1) * 5000}`,
  image: index % 2 === 0 ? drone1 : drone2,
  description: "High-performance drone with advanced features for aerial photography and surveillance."
}));

const VendorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* AppBar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Vendor Dashboard</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
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
          <ListItem button>
            <Dashboard />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ShoppingCart />
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button>
            <AddCircle />
            <ListItemText primary="Add Drone" />
          </ListItem>
          <ListItem button>
            <Person />
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <Settings />
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <main style={{ marginLeft: 240, padding: "20px" }}>
        <Container>
          <Grid container spacing={4}>
            {/* Recent Orders */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Recent Orders</Typography>
                  <Button fullWidth variant="contained" color="primary">View All</Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Profile Settings */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Profile Settings</Typography>
                  <Button fullWidth variant="contained" color="secondary">Update Profile</Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Product List - Drones */}
            <Grid item xs={12}>
              <Typography variant="h3" textAlign="center" gutterBottom fontWeight="bold" color="grey.300">
                LISTED DRONES
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {drones.map((drone) => (
                  <Grid item xs={12} sm={6} md={4} key={drone.id}>
                    <Card
                      sx={{
                        maxWidth: 360,
                        mx: "auto",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#1e1e1e",
                        color: "#ffffff",
                        boxShadow: "0 6px 12px rgba(255, 255, 255, 0.1)",
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 12px 24px rgba(255, 255, 255, 0.2)",
                        }
                      }}
                    >
                      <CardMedia component="img" height="220" image={drone.image} alt={drone.name} />
                      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold" color="grey.300">
                          {drone.name}
                        </Typography>
                        <Typography variant="body1" color="grey.500" sx={{ mb: 2 }}>
                          {drone.description}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4caf50" }}>
                          {drone.price}
                        </Typography>
                      </CardContent>
                      <Button 
                        variant="contained" 
                        sx={{ backgroundColor: "#424242", color: "#ffffff", py: 1.5, fontSize: "1rem", "&:hover": { backgroundColor: "#616161" } }} 
                        fullWidth 
                        onClick={() => navigate("DroneDetails")}
                      >
                        Detail
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default VendorDashboard;
