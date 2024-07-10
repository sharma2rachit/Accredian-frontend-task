import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField, Grid } from '@mui/material';
import { styled } from '@mui/system';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const HeroSection = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
  color: '#fff',
  textAlign: 'center',
  flexDirection: 'column',
}));

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    referrer: '',
    referrerEmail: '',
    referee: '',
    refereeEmail: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://accredian-backend-task-ar1k.onrender.com/referrals", formData);
      console.log('Referral submitted successfully:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error submitting referral:', error);
    }
  };

  return (
    <HeroSection>
      <Typography variant="h2" component="h1" gutterBottom>
        Refer & Earn
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Invite your friends and earn rewards!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PersonAddAltIcon />}
        onClick={handleOpen}
        sx={{ mt: 2, bgcolor: '#ff4081', '&:hover': { bgcolor: '#ff79b0' } }}
      >
        Refer Now
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Referral Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Your Name"
                  name="referrer"
                  required
                  fullWidth
                  variant="outlined"
                  value={formData.referrer}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Your Email"
                  type="email"
                  name="referrerEmail"
                  required
                  fullWidth
                  variant="outlined"
                  value={formData.referrerEmail}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Friend's Name"
                  name="referee"
                  required
                  fullWidth
                  variant="outlined"
                  value={formData.referee}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Friend's Email"
                  type="email"
                  name="refereeEmail"
                  required
                  fullWidth
                  variant="outlined"
                  value={formData.refereeEmail}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </HeroSection>
  );
};

export default LandingPage;
