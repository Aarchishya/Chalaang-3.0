// material-ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// project import
import MainCard from 'components/MainCard';

export default function SamplePage() {
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Loan types with specific routes
  const loanTypes = [
    { title: 'Personal Loan', description: 'Quick personal loans with minimal paperwork.', path: '/personalloan' },
    { title: 'Home Loan', description: 'Get financing for your dream home.', path: '/home-loan' },
    { title: 'Education Loan', description: 'Education loans for students at low interest rates.', path: '/education-loan' },
    { title: 'Business Loan', description: 'Boost your business with flexible loan options.', path: '/business-loan' }
  ];

  const handleLoanStart = (path) => {
    navigate(path); // Navigate to the selected loan page
  };

  return (
    <MainCard title="Loan Options">
      <Grid container spacing={3}>
        {loanTypes.map((loan, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MainCard>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                  {loan.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                  {loan.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleLoanStart(loan.path)} // Trigger navigation to the correct loan page
                  sx={{ textTransform: 'capitalize' }}
                >
                  Let’s Start
                </Button>
              </Box>
            </MainCard>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
}
