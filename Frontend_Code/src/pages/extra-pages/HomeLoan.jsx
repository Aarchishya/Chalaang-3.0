import { useState } from 'react';
import { Typography, Grid, Box, Button, IconButton } from '@mui/material';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

// Section components and their corresponding input fields
const sectionsConfig = {
  personalInfo: { key: 'personalInfo', label: 'Personal Info' },
  identityProof: { key: 'identityProof', label: 'Identity Proof' },
  employmentDetails: { key: 'employmentDetails', label: 'Employment and Income Details' },
  creditHistory: { key: 'creditHistory', label: 'Credit History' },
  proofOfAddress: { key: 'proofOfAddress', label: 'Proof of Address' },
  loanPurpose: { key: 'loanPurpose', label: 'Loan Purpose' },
  coApplicantDetails: { key: 'coApplicantDetails', label: 'Co-Applicant Details' },
  financialAssets: { key: 'financialAssets', label: 'Financial Assets' },
  references: { key: 'references', label: 'References' },
  bankDetails: { key: 'bankDetails', label: 'Bank Details' },
  loanAmount: { key: 'loanAmount', label: 'Loan Amount' },
  repaymentPlan: { key: 'repaymentPlan', label: 'Repayment Plan' },
  guarantorDetails: { key: 'guarantorDetails', label: 'Guarantor Details' },
  collateralDetails: { key: 'collateralDetails', label: 'Collateral Details' }
};

// Drag source for a section
function Section({ section, index, moveSection, deleteSection }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'section',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <Box ref={drag} sx={{ p: 2, mb: 2, bgcolor: 'grey.200', cursor: 'move', opacity, position: 'relative' }}>
      <Typography variant="h6">{section.label}</Typography>
      <IconButton onClick={() => deleteSection(index)} size="small" sx={{ position: 'absolute', top: 8, right: 8 }}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

// Drop target for reordering sections
function DropArea({ children, moveSection }) {
  const [, drop] = useDrop({
    accept: 'section',
    hover: (draggedItem, monitor) => {
      const draggedIndex = draggedItem.index;
      const hoverIndex = children.props.index;

      if (draggedIndex === hoverIndex) return;

      moveSection(draggedIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    }
  });

  return <Box ref={drop}>{children}</Box>;
}

export default function HomeLoanPage() {
  const [sections, setSections] = useState([
    sectionsConfig.personalInfo,
    sectionsConfig.identityProof,
    sectionsConfig.employmentDetails,
    sectionsConfig.creditHistory,
    sectionsConfig.proofOfAddress
  ]);

  const [deletedSections, setDeletedSections] = useState([]);
  const navigate = useNavigate();

  // Handle the drag-and-drop reordering of sections
  const moveSection = (dragIndex, hoverIndex) => {
    const draggedSection = sections[dragIndex];
    const newSections = [...sections];
    newSections.splice(dragIndex, 1);
    newSections.splice(hoverIndex, 0, draggedSection);
    setSections(newSections);
  };

  // Handle deleting sections
  const deleteSection = (index) => {
    const deletedSection = sections[index];
    setSections(sections.filter((_, i) => i !== index));
    setDeletedSections([...deletedSections, deletedSection]);
  };

  // Handle re-adding sections
  const addSection = (section) => {
    setSections([...sections, section]);
    setDeletedSections(deletedSections.filter((s) => s.key !== section.key));
  };

  // Handle submitting and navigating to the FormPage with the selected order
  const handleSubmit = () => {
    navigate('/form', { state: { orderedSections: sections } });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
          Arrange Sections for Personal Loan Application
        </Typography>

        {/* First Row: Rearrange Sections */}
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" fontWeight="bold" mb={2} textAlign="center">
              Rearrange Sections:
            </Typography>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={12} sm={6}>
                {sections.map((section, index) => (
                  <DropArea key={index} moveSection={moveSection}>
                    <Section section={section} index={index} moveSection={moveSection} deleteSection={deleteSection} />
                  </DropArea>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Second Row: Add Back Deleted Sections */}
        <Grid container justifyContent="center" spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={8}>
            {deletedSections.length > 0 && (
              <>
                <Typography variant="h6" fontWeight="bold" mb={2} textAlign="center">
                  Add Back Deleted Sections:
                </Typography>
                <Box textAlign="center">
                  {deletedSections.map((section, index) => (
                    <Button key={index} variant="outlined" sx={{ mr: 2, mb: 2 }} onClick={() => addSection(section)}>
                      Add {section.label}
                    </Button>
                  ))}
                </Box>
              </>
            )}
          </Grid>
        </Grid>

        {/* Third Row: Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit and Create Form
          </Button>
        </Box>
      </Box>
    </DndProvider>
  );
}
