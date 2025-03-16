import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material";
import { CheckCircle, Cancel, HourglassEmpty } from "@mui/icons-material";

const PaymentHistory = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const paymentData = [
    { id: "TXN001", user: "AMAN", date: "2024-12-01", amount: 1500, status: "Success" },
    { id: "TXN002", user: "Smith", date: "2024-12-02", amount: 2000, status: "Failed" },
    { id: "TXN003", user: "Sam", date: "2024-12-03", amount: 1000, status: "Pending" },
  ];

  const filteredData = paymentData.filter((item) => {
    return (
      (!search || item.user.toLowerCase().includes(search.toLowerCase()) || item.id.includes(search)) &&
      (!statusFilter || item.status === statusFilter)
    );
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Success":
        return <CheckCircle style={{ color: "green" }} />;
      case "Failed":
        return <Cancel style={{ color: "red" }} />;
      case "Pending":
        return <HourglassEmpty style={{ color: "orange" }} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{
          background: "linear-gradient(90deg, #ff6f00, #ff8e53)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
      >
        Payment History
      </Typography>

      <Card style={{ marginBottom: "1rem" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Search by Transaction ID or User"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Status Filter"
                variant="outlined"
                fullWidth
                select
                SelectProps={{ native: true }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Pending">Pending</option>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <List>
        {filteredData.map((item) => (
          <ListItem key={item.id} divider>
            <Avatar>{item.user.charAt(0)}</Avatar>
            <ListItemText
              primary={
                <Typography variant="h6">
                  {item.user} ({item.id})
                </Typography>
              }
              secondary={`Date: ${item.date} | Amount: ₹${item.amount}`}
            />
            <ListItemSecondaryAction>
              <Badge
                badgeContent={getStatusIcon(item.status)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {filteredData.length === 0 && (
        <Typography variant="body1" align="center" color="textSecondary" style={{ marginTop: "1rem" }}>
          No results found.
        </Typography>
      )}
    </Container>
  );
};

export default PaymentHistory;
