import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const ProductDetail = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Box display="flex" sx={{ height: "100vh", margin: "0 50px" }}>
      {/* Left Panel (Small Product Images) */}
      <Box
        sx={{
          width: "10%",  // Decreased width of the first column to 10%
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          gap: 2,
        }}
      >
        <Typography variant="h6">Product Images</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <label htmlFor="image-upload">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <Button variant="contained" component="span">Upload Images</Button>
          </label>
          {images.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={image}
              alt={`Product Angle ${index + 1}`}
              sx={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderRadius: 4,
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </Box>
      </Box>

      {/* Gap between the first and second columns */}
      <Box sx={{ width: "5%" }}></Box>

      {/* Second Column (Main Image of Product) */}
      <Box
        sx={{
          width: "35%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedImage ? (
          <Box
            component="img"
            src={selectedImage}
            alt="Selected Product"
            sx={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ) : (
          <Typography variant="h6">Select an Image</Typography>
        )}
      </Box>

      {/* Gap between second and third columns */}
      <Box sx={{ width: "5%" }}></Box>

      {/* Third Column (Product Details) */}
      <Box
        sx={{
          width: "35%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: "20px",
          marginTop: "40px",  // Added marginTop for spacing
          justifyContent: "center",  // Center the text vertically
        }}
      >
        <Typography variant="h5">Product Details</Typography>
        <Typography variant="body1">
          <strong>Name:</strong> Product XYZ
        </Typography>
        <Typography variant="body1">
          <strong>Price:</strong> $199.99
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
        <Typography variant="body1">
          <strong>Start Date:</strong> January 1, 2024
        </Typography>
        <Typography variant="body1">
          <strong>End Date:</strong> December 31, 2024
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetail;
