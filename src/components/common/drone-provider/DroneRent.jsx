import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
} from "@mui/material";

const DroneRentalHistory = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [page, setPage] = useState(1);

  const rentalData = [
    { id: "D123", renter: "AMAN", dates: "12/01 - 12/05", status: "Returned", price: 2000 },
    { id: "D124", renter: "Smith", dates: "12/03 - 12/08", status: "Active", price: 2500 },
    { id: "D125", renter: "Sam", dates: "12/05 - 12/10", status: "Overdue", price: 3000 },
  ];

  const filteredData = rentalData.filter((item) => {
    return (
      (!search || item.renter.toLowerCase().includes(search.toLowerCase()) || item.id.includes(search)) &&
      (!statusFilter || item.status === statusFilter)
    );
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Drone Rental History
      </Typography>

      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <TextField
          label="Search by Renter or Drone ID"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: "1 1 300px" }}
        />
        <FormControl variant="outlined" style={{ flex: "1 1 150px" }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Returned">Returned</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
        <Button variant="contained" color="primary">
          Filter
        </Button>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Drone ID</TableCell>
              <TableCell>Renter Name</TableCell>
              <TableCell>Rental Dates</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price (₹)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.renter}</TableCell>
                <TableCell>{item.dates}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    style={{
                      color:
                        item.status === "Active"
                          ? "green"
                          : item.status === "Overdue"
                          ? "red"
                          : "blue",
                    }}
                  >
                    {item.status}
                  </Typography>
                </TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
        <Pagination
          count={Math.ceil(filteredData.length / 10)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </div>
    </Container>
  );
};

export default DroneRentalHistory;
