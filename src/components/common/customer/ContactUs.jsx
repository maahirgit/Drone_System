import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Paper } from '@mui/material';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" gutterBottom align="center" style={{ fontWeight: 'bold', color: '#2E3B55' }}>
        Contact Us
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#f4f6f8' }}>
            <Typography variant="h5" gutterBottom style={{ fontWeight: '600' }}>
              We Would Love to Hear From You!
            </Typography>
            <Typography variant="body1" paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              If you have any questions, suggestions, or feedback, feel free to reach out to us. We're here to assist you with anything you need, whether it's related to our products or services. Our team is always available to respond promptly and help you in any way we can. Use the form below to get in touch with us.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#f4f6f8' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Your Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                required
              />
              <TextField
                label="Your Message"
                variant="outlined"
                fullWidth
                margin="normal"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
              />
              <Box mt={2} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  style={{ padding: '10px 30px', fontSize: '1rem' }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Box mt={4} textAlign="center">
        <Typography variant="h6" style={{ fontWeight: '600', color: '#2E3B55' }}>Our Address</Typography>
        <Typography variant="body1" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          1234 Main Street, Suite 100, City, Country
        </Typography>
        <Typography variant="h6" style={{ fontWeight: '600', color: '#2E3B55' }}>Contact Info</Typography>
        <Typography variant="body1" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          Email: contact@company.com
        </Typography>
        <Typography variant="body1" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          Phone: +123-456-7890
        </Typography>
      </Box>
    </Container>
  );
};

export default ContactUs;
