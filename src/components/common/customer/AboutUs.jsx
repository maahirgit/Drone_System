import React from 'react';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" gutterBottom align="center" style={{ fontWeight: 'bold', color: '#2E3B55' }}>
        About Us
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#f4f6f8' }}>
            <Typography variant="h5" gutterBottom style={{ fontWeight: '600' }}>
              Who We Are
            </Typography>
            <Typography variant="body1" paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              At our core, we are a diverse team of passionate innovators and problem-solvers, bound together by a shared vision of providing high-quality, reliable, and customer-centric services. We take immense pride in our work and always seek to improve and elevate our offerings. Every project we undertake is a reflection of our commitment to excellence, and we believe that by combining creativity with precision, we can achieve remarkable outcomes. Our team brings together unique skill sets and perspectives, allowing us to approach every challenge with fresh ideas and an unwavering determination to succeed.
            </Typography>
            <Typography variant="body1" paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              We are more than just a company—we are a community united by a passion for making a difference. Whether we’re creating innovative solutions, offering personalized services, or building lasting relationships, we are always guided by our core values of integrity, trust, and quality. Our mission is to redefine the industry and set new benchmarks for excellence, while delivering exceptional experiences that our customers can rely on every single day.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#f4f6f8' }}>
            <Typography variant="h5" gutterBottom style={{ fontWeight: '600' }}>
              Our Vision
            </Typography>
            <Typography variant="body1" paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              Our vision is to be a leader in our field, recognized for our commitment to quality, innovation, and customer satisfaction. We aspire to create a lasting impact that not only benefits our clients but also inspires those around us to reach for greater heights. We envision a world where our services, products, and solutions transform businesses, enhance lives, and contribute to the betterment of society as a whole. Our goal is to continue growing and evolving in a way that allows us to meet the ever-changing needs of the market, while remaining steadfast in our dedication to integrity and excellence.
            </Typography>
            <Typography variant="body1" paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              With every project we undertake, we aim to set new standards of quality and excellence. We strive to foster a culture of continuous improvement, creativity, and collaboration, where every team member is empowered to contribute their best ideas and work toward a shared purpose. By staying true to our vision and values, we are confident that we will not only achieve success but will also inspire others to join us on this exciting journey of growth and innovation.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box mt={4} textAlign="center">
        <Typography variant="h6" style={{ fontWeight: '600', color: '#2E3B55' }}>Contact Us</Typography>
        <Typography variant="body1" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          For inquiries, feedback, or any questions, feel free to reach out to us at contact@company.com. Our team is always ready to assist you with any information or support you may need. We look forward to hearing from you and building a meaningful connection.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
