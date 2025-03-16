import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Grid,
  Fab,
  Pagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Wishlist() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Wishlist</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary" // Change to "temporary" for debugging
        anchor="left"
        onClose={() => {}}
      >
        <List>
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Account" />
          </ListItem>
        </List>
      </Drawer>

      <main style={{ marginLeft: 240, padding: '20px' }}>
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/150"
                  alt="Product"
                />
                <CardContent>
                  <Typography variant="h6">Product {item}</Typography>
                  <Typography variant="body2">$20.00</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Add to Cart
                  </Button>
                  <Button size="small" color="secondary">
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Pagination count={10} color="primary" style={{ marginTop: 20 }} />

        <Fab
          color="primary"
          aria-label="add"
          style={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <AddIcon />
        </Fab>
      </main>
    </div>
  );
}

export default Wishlist;



