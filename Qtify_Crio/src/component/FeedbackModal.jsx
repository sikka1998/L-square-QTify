import React, { useState } from 'react';
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FeedbackModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      description: ''
    });
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="feedback-modal-title"
      aria-describedby="feedback-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 500 },
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography id="feedback-modal-title" variant="h6" component="h2" fontWeight="bold">
            Feedback
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder="Full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ 
              mt: 1, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#34C94B',
                },
                '&:hover fieldset': {
                  borderColor: '#34C94B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#34C94B',
                },
              }
            }}
          />
          
          <TextField
            fullWidth
            placeholder="Email ID"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ 
              mt: 1, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#34C94B',
                },
                '&:hover fieldset': {
                  borderColor: '#34C94B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#34C94B',
                },
              }
            }}
          />
          
          <TextField
            fullWidth
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ 
              mt: 1, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#34C94B',
                },
                '&:hover fieldset': {
                  borderColor: '#34C94B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#34C94B',
                },
              }
            }}
          />
          
          <TextField
            fullWidth
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            sx={{ 
              mt: 1, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#34C94B',
                },
                '&:hover fieldset': {
                  borderColor: '#34C94B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#34C94B',
                },
              }
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ 
                bgcolor: '#34C94B',
                color: 'white',
                '&:hover': {
                  bgcolor: '#2ea13f',
                },
                textTransform: 'none',
                borderRadius: 4,
                px: 4,
                py: 1
              }}
            >
              Submit Feedback
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default FeedbackModal; 