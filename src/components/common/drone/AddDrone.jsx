import React, { useState } from "react";
import { 
  Box, Typography, TextField, Button, MenuItem, IconButton, Card, CardContent, 
  CardMedia, Grid, Paper 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [droneName, setDroneName] = useState("");
  const [droneBrand, setDroneBrand] = useState("");
  const [droneDesc, setDroneDesc] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [availability, setAvailability] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages([file]); // Store file in state
    }
  };

  const handleSubmit = async () => {
    if (!droneName || !droneBrand || !droneDesc || !pricePerDay || !availability) {
      alert("Please fill in all fields.");
      return;
    }

    if (images.length === 0) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    const isAvailable = availability === "Available" ? true : false;

    formData.append("Drone_name", droneName);
    formData.append("Drone_brand", droneBrand);
    formData.append("Drone_description", droneDesc);
    formData.append("Price_per_hour", "0"); // Fix: Include this field
    formData.append("Price_per_day", pricePerDay);
    formData.append("Availability", isAvailable);
    formData.append("Images", images[0]);

    try {
      const response = await axios.post("/drone/addDroneDetails", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status !== 201) {
        throw new Error("Failed to upload drone details");
      }

      console.log("Drone added successfully:", response.data);

      // Reset form fields
      setDroneName("");
      setDroneBrand("");
      setDroneDesc("");
      setPricePerDay("");
      setAvailability("");
      setImages([]);

      alert("Drone added successfully!");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error adding drone: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ width: 500, padding: 3, borderRadius: 3, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
            Upload Drone Details
          </Typography>

          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              textAlign: "center", 
              bgcolor: "#f7f7f7", 
              borderRadius: 2, 
              mb: 2 
            }}
          >
            <input 
              type="file" 
              accept="image/*" 
              id="upload-button" 
              style={{ display: "none" }} 
              onChange={handleImageUpload} 
            />
            <label htmlFor="upload-button">
              <Button 
                variant="contained" 
                component="span" 
                startIcon={<CloudUploadIcon />} 
                sx={{ textTransform: "none" }}
              >
                Upload Image
              </Button>
            </label>
          </Paper>

          {images.length > 0 && (
            <Box display="flex" justifyContent="center" mb={2}>
              <CardMedia 
                component="img" 
                image={URL.createObjectURL(images[0])} 
                alt="Drone" 
                sx={{ width: 150, height: 150, borderRadius: 2 }} 
              />
              <IconButton 
                onClick={() => setImages([])} 
                sx={{ bgcolor: "red", color: "white", ml: 1, "&:hover": { bgcolor: "#d32f2f" } }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Drone Name" 
                value={droneName} 
                onChange={(e) => setDroneName(e.target.value)} 
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Drone Brand" 
                value={droneBrand} 
                onChange={(e) => setDroneBrand(e.target.value)} 
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Drone Description" 
                multiline 
                rows={3} 
                value={droneDesc} 
                onChange={(e) => setDroneDesc(e.target.value)} 
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Price per Day" 
                type="number" 
                value={pricePerDay} 
                onChange={(e) => setPricePerDay(e.target.value)} 
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                fullWidth 
                select 
                label="Availability" 
                value={availability} 
                onChange={(e) => setAvailability(e.target.value)}
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Not Available">Not Available</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Button 
            fullWidth 
            variant="contained" 
            onClick={handleSubmit} 
            sx={{ 
              mt: 3, 
              bgcolor: "#1976D2", 
              color: "white", 
              textTransform: "none", 
              fontSize: "16px",
              "&:hover": { bgcolor: "#1565C0" } 
            }}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ImageUploader;
