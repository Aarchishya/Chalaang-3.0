import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Typography, Grid, Box, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

// Initial sections configuration
const initialSectionsConfig = {
  personalInfo: {
    label: 'Personal Info',
    inputs: [
      { label: 'Full Name', type: 'text' },
      { label: 'Address', type: 'text' }
    ]
  },
  identityProof: {
    label: 'Identity Proof',
    inputs: [
      { label: 'ID Number', type: 'text' },
      { label: 'ID Type', type: 'text' }
    ]
  },
  employmentDetails: {
    label: 'Employment and Income Details',
    inputs: [
      { label: 'Employer Name', type: 'text' },
      { label: 'Monthly Income', type: 'number' }
    ]
  },
  creditHistory: {
    label: 'Credit History',
    inputs: [
      { label: 'Credit Score', type: 'number' },
      { label: 'Any Defaults', type: 'text' }
    ]
  },
  proofOfAddress: {
    label: 'Proof of Address',
    inputs: [
      { label: 'Utility Bill', type: 'text' },
      { label: 'Rental Agreement', type: 'text' }
    ]
  }
};

export default function FormPage() {
  const location = useLocation();
  const { orderedSections } = location.state;

  // State to hold the edited labels for each section
  const [sectionsConfig, setSectionsConfig] = useState(initialSectionsConfig);

  // Track editing state for each label
  const [editing, setEditing] = useState({});

  // State to track if the form is saved and ready for filling
  const [isFormReady, setIsFormReady] = useState(false);

  // State to track the data entered in the form
  const [formData, setFormData] = useState({});

  // Handle label edit toggle
  const handleEditToggle = (sectionKey, inputIndex) => {
    setEditing((prev) => ({
      ...prev,
      [`${sectionKey}-${inputIndex}`]: !prev[`${sectionKey}-${inputIndex}`]
    }));
  };

  // Handle label change
  const handleLabelChange = (e, sectionKey, inputIndex) => {
    const newLabel = e.target.value;

    setSectionsConfig((prevConfig) => ({
      ...prevConfig,
      [sectionKey]: {
        ...prevConfig[sectionKey],
        inputs: prevConfig[sectionKey].inputs.map((input, index) => (index === inputIndex ? { ...input, label: newLabel } : input))
      }
    }));
  };

  // Handle form submission (saving form labels and transitioning to input form)
  const handleSaveForm = () => {
    setIsFormReady(true); // Switch to form filling mode
  };

  // Handle form input changes
  const handleInputChange = (e, sectionKey, inputLabel) => {
    setFormData((prevData) => ({
      ...prevData,
      [sectionKey]: {
        ...prevData[sectionKey],
        [inputLabel]: e.target.value
      }
    }));
  };

  // Handle final form submission (after the form is filled)
  const handleFinalSubmit = () => {
    console.log('Final Form Data:', formData);
    // You can handle the form data submission here, e.g., send it to an API or save locally
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Personal Loan Application Form
      </Typography>

      <Grid container spacing={3}>
        {orderedSections.map((section, sectionIndex) => (
          <Grid item xs={12} key={sectionIndex}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              {sectionsConfig[section.key].label}
            </Typography>

            {/* Display inputs for each section */}
            {sectionsConfig[section.key].inputs.map((input, inputIndex) => (
              <Box key={inputIndex} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {/* If form is ready, show input fields to fill the form */}
                {isFormReady ? (
                  <TextField
                    fullWidth
                    label={input.label}
                    type={input.type}
                    value={formData[section.key]?.[input.label] || ''}
                    onChange={(e) => handleInputChange(e, section.key, input.label)}
                    sx={{ mr: 2 }}
                  />
                ) : (
                  <>
                    {editing[`${section.key}-${inputIndex}`] ? (
                      <TextField
                        fullWidth
                        value={input.label}
                        onChange={(e) => handleLabelChange(e, section.key, inputIndex)}
                        sx={{ mr: 2 }}
                      />
                    ) : (
                      <Typography sx={{ flexGrow: 1 }}>{input.label}</Typography>
                    )}
                    {/* Edit/Save button */}
                    <IconButton onClick={() => handleEditToggle(section.key, inputIndex)}>
                      {editing[`${section.key}-${inputIndex}`] ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                  </>
                )}
              </Box>
            ))}
          </Grid>
        ))}
      </Grid>

      {/* Submit or Save Form Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        {isFormReady ? (
          <Button variant="contained" color="primary" onClick={handleFinalSubmit}>
            Submit Filled Form
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleSaveForm}>
            Save Form and Start Filling
          </Button>
        )}
      </Box>
    </Box>
  );
}
