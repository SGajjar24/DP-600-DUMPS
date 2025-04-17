import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Button, Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CircularProgress, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTest, TestLength } from '../context/TestContext';

const ConfigPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTestLength, setQuestions, resetTest } = useTest();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLength, setSelectedLength] = useState<TestLength>(
    (location.state as any)?.testLength || 15
  );

  useEffect(() => {
    // Reset the test when entering the config page
    resetTest();
  }, [resetTest]);

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLength(Number(event.target.value) as TestLength);
  };

  const handleStartTest = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Set the test length in context
      setTestLength(selectedLength);
      
      // Load the questions based on selected length
      const response = await fetch(`/test_${selectedLength}.json`);
      if (!response.ok) {
        throw new Error('Failed to load questions');
      }
      
      const questions = await response.json();
      setQuestions(questions);
      
      // Navigate to the test page
      navigate('/test');
    } catch (err) {
      console.error('Error loading questions:', err);
      setError('Failed to load questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Configure Your Test
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Customize your practice test settings before you begin
        </Typography>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FormLabel component="legend">Test Length</FormLabel>
            <RadioGroup
              aria-label="test-length"
              name="test-length"
              value={selectedLength}
              onChange={handleLengthChange}
            >
              <FormControlLabel value={15} control={<Radio />} label="15 Questions (Quick Practice)" />
              <FormControlLabel value={30} control={<Radio />} label="30 Questions (Standard Practice)" />
              <FormControlLabel value={45} control={<Radio />} label="45 Questions (Full Exam Simulation)" />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
          disabled={loading}
        >
          Back to Home
        </Button>
        <Button
          variant="contained"
          onClick={handleStartTest}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Loading...' : 'Start Test'}
        </Button>
      </Box>
    </Container>
  );
};

export default ConfigPage;
