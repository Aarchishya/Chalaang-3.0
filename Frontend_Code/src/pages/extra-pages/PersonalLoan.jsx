// material-ui
import { Typography, Grid, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

// Example: Fetch configurations from AdminInterface (in a real app, fetch this from API or database)
const config = {
  title: 'Personal Loan Application',
  sections: ['Personal Details', 'Employment Details', 'Bank Account Information', 'KYC Information'],
  font: 'Roboto',
  color: 'primary'
};

export default function PersonalLoanPage() {
  const [formData, setFormData] = useState({
    personalDetails: '',
    employmentDetails: '',
    bankAccountInfo: '',
    kycInfo: ''
  });

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} color={config.color} fontFamily={config.font}>
        {config.title}
      </Typography>
      <Grid container spacing={3}>
        {config.sections.map((section, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant="h6" fontWeight="bold">
              {section}
            </Typography>
            {section === 'Personal Details' && (
              <TextField
                fullWidth
                label="Enter Personal Details"
                value={formData.personalDetails}
                onChange={(e) => handleInputChange(e, 'personalDetails')}
                sx={{ mt: 2 }}
              />
            )}
            {section === 'Employment Details' && (
              <TextField
                fullWidth
                label="Enter Employment Details"
                value={formData.employmentDetails}
                onChange={(e) => handleInputChange(e, 'employmentDetails')}
                sx={{ mt: 2 }}
              />
            )}
            {section === 'Bank Account Information' && (
              <TextField
                fullWidth
                label="Enter Bank Account Information"
                value={formData.bankAccountInfo}
                onChange={(e) => handleInputChange(e, 'bankAccountInfo')}
                sx={{ mt: 2 }}
              />
            )}
            {section === 'KYC Information' && (
              <TextField
                fullWidth
                label="Enter KYC Information"
                value={formData.kycInfo}
                onChange={(e) => handleInputChange(e, 'kycInfo')}
                sx={{ mt: 2 }}
              />
            )}
          </Grid>
        ))}
      </Grid>

      {/* Centered Submit Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" color={config.color}>
          Submit Application
        </Button>
      </Box>
    </Box>
  );
}
