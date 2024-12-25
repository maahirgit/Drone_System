import React, { useState } from "react";
import {
  Box,
  Typography,
  Input,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const formData = {
      name,
      price,
      startDate,
      endDate,
    };
    console.log("Form Data:", formData);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      height="100vh"
      sx={{ marginLeft: "50px" }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px",marginLeft:"200px",marginTop:"50px" }}>
        Enter Drone Details
      </Typography>
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={250}
          height={250}
        >
          <label htmlFor="image-upload">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            {image ? (
              <Box
                component="img"
                src={image}
                alt="Uploaded"
                sx={{
                  width: "180%",
                  height: "150%",
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
            ) : (
              <IconButton
                component="span"
                sx={{ fontSize: 100, color: "#757575" }}
              >
                <AddIcon sx={{ fontSize: 100 }} />
              </IconButton>
            )}
          </label>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={5}
          sx={{ marginLeft: "250px" }}
        >
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Price"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ width: "600px" }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageUploader;
