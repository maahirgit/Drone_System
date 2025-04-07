import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import { People, ShoppingCart } from '@mui/icons-material';

const AdminDashboard = () => {
  const [view, setView] = useState(null); // 'users' or 'orders'
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        if (view === 'users') {
          const response = await axios.get('/user/getUser');
          setUsers(response.data.data);
        } else if (view === 'orders') {
          const response = await axios.get('/order/getOrder');
          setOrders(response.data.data); // <-- Updated to access orders correctly
        }
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (view) fetchData();
  }, [view]);

  const renderTable = () => {
    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    if (view === 'users') {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Role</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.Fname} {user.Lname}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.Role_id?.Role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    if (view === 'orders') {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Order ID</b></TableCell>
              <TableCell><b>Customer</b></TableCell>
              <TableCell><b>Drone</b></TableCell>
              <TableCell><b>Days</b></TableCell>
              <TableCell><b>Price/Day</b></TableCell>
              <TableCell><b>Total</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.User_id?.Fname} {order.User_id?.Lname}</TableCell>
                <TableCell>{order.Drone_id?.Drone_name}</TableCell>
                <TableCell>{order.Days}</TableCell>
                <TableCell>₹{order.Price}</TableCell>
                <TableCell><strong>₹{order.Total_price}</strong></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    return <Typography>Select a view to begin.</Typography>;
  };

  return (
    <Box sx={{ p: 4, background: '#f4f6f8', minHeight: '100vh' }}>
      <Card sx={{ maxWidth: 1000, mx: 'auto', boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Admin Dashboard
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" mb={4}>
            <Button
              variant={view === 'users' ? 'contained' : 'outlined'}
              color="primary"
              startIcon={<People />}
              onClick={() => setView('users')}
            >
              View Users
            </Button>
            <Button
              variant={view === 'orders' ? 'contained' : 'outlined'}
              color="secondary"
              startIcon={<ShoppingCart />}
              onClick={() => setView('orders')}
            >
              View Orders
            </Button>
          </Stack>

          {renderTable()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
