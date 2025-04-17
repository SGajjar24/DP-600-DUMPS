import React, { useState } from 'react';
import { Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PDFService } from '../services/PDFService';
import { useTest } from '../context/TestContext';

const PDFExport = () => {
  const { questions, userAnswers, calculateScore } = useTest();
  const [generating, setGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleGeneratePDF = async () => {
    if (questions.length === 0) return;
    
    setGenerating(true);
    try {
      // Calculate test results
      const testResults = calculateScore();
      
      // Generate PDF
      const pdf = await PDFService.generateResultsPDF(
        testResults,
        questions,
        userAnswers
      );
      
      // Save the PDF
      PDFService.savePDF(pdf, 'dp600-exam-results.pdf');
      
      // Show success message
      setShowSuccess(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setShowError(true);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={generating ? <CircularProgress size={20} color="inherit" /> : <PictureAsPdfIcon />}
        onClick={handleGeneratePDF}
        disabled={generating || questions.length === 0}
      >
        {generating ? 'Generating PDF...' : 'Export Results as PDF'}
      </Button>
      
      <Snackbar 
        open={showSuccess} 
        autoHideDuration={6000} 
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          PDF generated successfully!
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={showError} 
        autoHideDuration={6000} 
        onClose={() => setShowError(false)}
      >
        <Alert onClose={() => setShowError(false)} severity="error">
          Failed to generate PDF. Please try again.
        </Alert>
      </Snackbar>
    </>
  );
};

export default PDFExport;
