// material-ui
import { useState } from 'react';
import { Button, TextField, Grid, Paper, Box, Typography, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

// Dummy Data (Sections for personal loan form)
const initialSections = [
  { id: 1, name: 'Personal Details' },
  { id: 2, name: 'Employment Details' },
  { id: 3, name: 'Bank Account Information' },
  { id: 4, name: 'KYC Information' }
];

// Color and Font Customization Options
const colors = ['primary', 'secondary', 'warning', 'success'];
const fonts = ['Roboto', 'Arial', 'Georgia', 'Tahoma'];

const AdminInterface = () => {
  const [sections, setSections] = useState(initialSections);
  const [textCustomization, setTextCustomization] = useState('Personal Loan Form');
  const [selectedColor, setSelectedColor] = useState('primary');
  const [selectedFont, setSelectedFont] = useState('Roboto');

  // Handle text customization
  const handleTextChange = (event) => {
    setTextCustomization(event.target.value);
  };

  // Handle section reordering (simple up and down logic for demo)
  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newSections = [...sections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    setSections(newSections);
  };

  const handleMoveDown = (index) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    setSections(newSections);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Admin Interface
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Customize Text
        </Typography>
        <TextField label="Form Title" fullWidth value={textCustomization} onChange={handleTextChange} variant="outlined" sx={{ mb: 2 }} />
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Reorder Sections
        </Typography>
        {sections.map((section, index) => (
          <Box key={section.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1">{section.name}</Typography>
            <Button onClick={() => handleMoveUp(index)}>Up</Button>
            <Button onClick={() => handleMoveDown(index)}>Down</Button>
          </Box>
        ))}
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Customize Theme
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField select label="Font" value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)} fullWidth>
              {fonts.map((font) => (
                <MenuItem key={font} value={font}>
                  {font}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField select label="Color Scheme" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} fullWidth>
              {colors.map((color) => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <Button variant="contained" color="primary">
        Save Configurations
      </Button>
    </Box>
  );
};

export default AdminInterface;
