import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography, Button, Container, Grid, Card, CardContent, CardMedia, TextField, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Import assets
import landingimage from "../../../assets/auth/Wallpaper.jpg";
import precision from "../../../assets/auth/highprecision.jpg";
import realtimemonitoring from "../../../assets/auth/realtimemonitoring.jpg";
import customizablesolution from "../../../assets/auth/customizablesol.jpg";
import BatteryLife from "../../../assets/auth/BatteryLife.jpg";
import video1 from "../../../assets/auth/video1.mp4";
import video2 from "../../../assets/auth/video2.mp4";
import video3 from "../../../assets/auth/video3.mp4";
import droneImage1 from "../../../assets/auth/part1.jpg"; // Replace with your drone image
import droneImage2 from "../../../assets/auth/part2.jpg"; // Replace with your drone image

// Import social media icons
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

// Styled component for slider
const StyledSlider = styled(Slider)({
  ".slick-prev, .slick-next": {
    zIndex: 10,
    width: "40px",
    height: "40px",
  },
  ".slick-prev": {
    left: "10px",
  },
  ".slick-next": {
    right: "10px",
  },
  ".slick-prev:before, .slick-next:before": {
    color: "white",
    fontSize: "30px",
    opacity: 1,
  },
});

// Gradient Text Style
const gradientTextStyle = {
  background: "linear-gradient(to right, #ffffff, #d3d3d3, #808080)",
  WebkitBackgroundClip: "text",
  color: "transparent",
  fontWeight: "bold",
  letterSpacing: "2px",
  textTransform: "uppercase",
  fontFamily: "Arial, sans-serif",
  WebkitTextStroke: "1px black",
};

// Default Button Text Style
const defaultButtonTextStyle = {
  color: "#e0e0e0",
  fontSize: "1rem",
  fontWeight: "600",
  transition: "all 0.3s ease-in-out",
  background: "linear-gradient(to right, #ffffff, #d3d3d3, #808080)",
  backgroundClip: "text",
  border: "1px solid #333",
  "&:hover": {
    color: "#333",
    border: "1px solid #333",
  },
};

function LandingPage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  // Video Slider Settings
  const videoSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (_, next) => setActiveIndex(next),
  };

  // Video Array
  const videos = [video1, video2, video3];

  // Feature Image Array
  const featureImages = [precision, realtimemonitoring, BatteryLife, customizablesolution];

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${landingimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h2" gutterBottom sx={gradientTextStyle}>
            Revolutionizing Aerial Solutions
          </Typography>
          <Typography variant="h5" gutterBottom sx={gradientTextStyle}>
            Explore the power of technology to elevate your operations.
          </Typography>
          <Button variant="contained" color="secondary" size="large" sx={{ m: 2, ...defaultButtonTextStyle }} onClick={() => navigate("DroneList")}>
            Explore Drones
          </Button>
          <Button variant="outlined" color="secondary" size="large" sx={defaultButtonTextStyle} onClick={() => navigate("/admin/ContactUs")}>
            Contact Us
          </Button>
        </Container>
      </Box>

      {/* Video Slider Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={gradientTextStyle}>
          Watch Our Drones in Action
        </Typography>
        <StyledSlider {...videoSliderSettings}>
          {videos.map((video, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: "100%",
                boxShadow: "none",
                background: "transparent",
                margin: "0 10px",
                transition: "transform 0.5s, opacity 0.5s",
                opacity: index === activeIndex ? 1 : 0.4,
                transform: index === activeIndex ? "scale(1)" : "scale(0.85)",
              }}
            >
              <CardMedia
                component="video"
                src={video}
                autoPlay
                muted
                loop
                playsInline
                sx={{
                  width: "100%",
                  height: "40vh", // Set height to 100vh for fullscreen effect
                  borderRadius: "10px",
                  filter: index === activeIndex ? "none" : "blur(3px)",
                  transition: "filter 0.5s ease-in-out",
                }}
              />
            </Card>
          ))}
        </StyledSlider>
      </Container>

      {/* Drone Image Partition with Text */}
      <Box sx={{ py: 6 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  backgroundImage: `url(${droneImage1})`, // Replace with your drone image
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "620px",
                  borderRadius: "10px",
                }}
              >
                {/* Overlay Text */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "2rem",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Drone in Action
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  backgroundImage: `url(${droneImage2})`, // Replace with your drone image
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "620px",
                  borderRadius: "10px",
                }}
              >
                {/* Overlay Text */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "2rem",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    cursor: "pointer",

                  }}
                  onClick={() => navigate("/admin/DroneList")}
                >
                  Explore the Future
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={gradientTextStyle}>
          Why Choose Our Drones?
        </Typography>
        <Grid container spacing={4}>
          {["High Precision Drones", "Real-Time Monitoring", "Long Battery Life", "Customizable Solutions"].map((feature, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Card>
                <CardMedia component="img" alt={feature} height="140" image={featureImages[index] || "https://via.placeholder.com/300x200"} />
                <CardContent>
                  <Typography gutterBottom variant="h5" sx={gradientTextStyle}>
                    {feature}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter Subscription Section */}
      <Box sx={{ bgcolor: "#e0e0e0", py: 6 }}>
        <Container>
          <Typography variant="h4" gutterBottom align="center" sx={gradientTextStyle}>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            Stay updated with the latest drone technology news, offers, and insights.
          </Typography>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField fullWidth label="Enter your email" variant="outlined" />
                <Button variant="contained" color="black" >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section (Updated Footer) */}
      <Box sx={{ bgcolor: "#333", color: "white", py: 6 }}>
        <Container>
          <Grid container spacing={4} justifyContent="space-between">
            

            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={gradientTextStyle}>
                Contact Information
              </Typography>
              <Typography variant="body1">Email: support@flysync.com</Typography>
              <Typography variant="body1">Phone: +91-1234567890</Typography>
              <Typography variant="body1">Address: 123 Tech Park, City, Country</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={gradientTextStyle}>
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Button
                  variant="text"
                  sx={{ color: "white", fontSize: "1.5rem" }}
                  onClick={() => window.open("https://www.facebook.com", "_blank")}
                >
                  <Facebook />
                </Button>
                <Button
                  variant="text"
                  sx={{ color: "white", fontSize: "1.5rem" }}
                  onClick={() => window.open("https://www.instagram.com", "_blank")}
                >
                  <Instagram />
                </Button>
                <Button
                  variant="text"
                  sx={{ color: "white", fontSize: "1.5rem" }}
                  onClick={() => window.open("https://www.twitter.com", "_blank")}
                >
                  <Twitter />
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              &copy; 2025 DroneTech. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default LandingPage;
