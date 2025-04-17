import React, { useState } from 'react';
import { Typography, Box, Card, CardContent, Button, Container, Radio, RadioGroup, FormControlLabel, FormControl, LinearProgress, Paper, Divider, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { 
    questions, 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    userAnswers, 
    setUserAnswer, 
    completeTest 
  } = useTest();
  
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // If no questions are loaded, redirect to config page
  if (questions.length === 0) {
    navigate('/config');
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(currentQuestion.id, event.target.value);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleFinish = () => {
    completeTest();
    navigate('/results');
  };

  const handleShowExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const isAnswered = userAnswers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          DP-600 Practice Test
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        </Box>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Question {currentQuestionIndex + 1}:
              </Typography>
              <Typography variant="body1" paragraph>
                {currentQuestion.question}
              </Typography>
              
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  aria-label="question-options"
                  name="question-options"
                  value={userAnswers[currentQuestion.id] || ''}
                  onChange={handleAnswerChange}
                >
                  {Object.entries(currentQuestion.options).map(([key, value]) => (
                    <FormControlLabel 
                      key={key} 
                      value={key} 
                      control={<Radio />} 
                      label={`${key}. ${value}`} 
                      sx={{ 
                        mb: 1,
                        p: 1,
                        borderRadius: 1,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>

          {showExplanation && currentQuestion.explanation && (
            <Paper sx={{ p: 2, mb: 4, backgroundColor: theme.palette.grey[50] }}>
              <Typography variant="h6" gutterBottom>
                Explanation:
              </Typography>
              <Typography variant="body2">
                {currentQuestion.explanation}
              </Typography>
              {currentQuestion.correct_answer && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" fontWeight="bold">
                    Correct Answer: {currentQuestion.correct_answer}
                  </Typography>
                </Box>
              )}
            </Paper>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <Button
              variant="outlined"
              onClick={handleShowExplanation}
            >
              {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
            </Button>

            {isLastQuestion ? (
              <Button
                variant="contained"
                endIcon={<CheckCircleIcon />}
                onClick={handleFinish}
                disabled={!isAnswered}
              >
                Finish Test
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </Grid>

        {!isMobile && (
          <Grid item md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Question Navigator
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={1}>
                  {questions.map((_, index) => (
                    <Grid item key={index}>
                      <Button
                        variant={index === currentQuestionIndex ? "contained" : "outlined"}
                        color={userAnswers[questions[index].id] ? "success" : "primary"}
                        size="small"
                        onClick={() => {
                          setCurrentQuestionIndex(index);
                          setShowExplanation(false);
                        }}
                        sx={{ minWidth: '40px' }}
                      >
                        {index + 1}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    Answered: {Object.keys(userAnswers).length}/{totalQuestions}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFinish}
                    size="small"
                  >
                    Finish Test
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default TestPage;
