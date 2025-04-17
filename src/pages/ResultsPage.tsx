import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button, 
  Container, 
  Grid, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTest, Question } from '../context/TestContext';
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
import PDFExport from '../components/test/PDFExport';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { questions, userAnswers, isTestComplete, calculateScore, resetTest } = useTest();
  
  // If test is not complete, redirect to home
  useEffect(() => {
    if (!isTestComplete && questions.length === 0) {
      navigate('/');
    }
  }, [isTestComplete, questions.length, navigate]);

  const { score, total, percentage } = calculateScore();
  const isPassing = percentage >= 70; // Assuming 70% is passing score

  const handleRetakeTest = () => {
    resetTest();
    navigate('/config');
  };

  // Group questions by category for the detailed results
  const questionsByCategory: Record<string, Question[]> = {};
  questions.forEach(question => {
    if (!questionsByCategory[question.category]) {
      questionsByCategory[question.category] = [];
    }
    questionsByCategory[question.category].push(question);
  });

  // Calculate category scores
  const categoryScores = Object.entries(questionsByCategory).map(([category, categoryQuestions]) => {
    let correctCount = 0;
    categoryQuestions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer && question.correct_answer && userAnswer === question.correct_answer) {
        correctCount++;
      }
    });
    
    const categoryTotal = categoryQuestions.length;
    const categoryPercentage = categoryTotal > 0 ? Math.round((correctCount / categoryTotal) * 100) : 0;
    
    return {
      category,
      score: correctCount,
      total: categoryTotal,
      percentage: categoryPercentage
    };
  });

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Test Results
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          DP-600 Microsoft Fabric Analytics Engineer Practice Test
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Overall Score
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                my: 4
              }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                  <CircularProgress
                    variant="determinate"
                    value={percentage}
                    size={120}
                    thickness={5}
                    color={isPassing ? 'success' : 'error'}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4" component="div" color="text.secondary">
                      {percentage}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6" color={isPassing ? 'success.main' : 'error.main'}>
                  {isPassing ? 'PASS' : 'FAIL'}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {score} correct out of {total} questions
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Passing score: 70% or higher
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Category Breakdown
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell align="center">Score</TableCell>
                      <TableCell align="center">Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categoryScores.map((category) => (
                      <TableRow key={category.category}>
                        <TableCell component="th" scope="row">
                          {formatCategoryName(category.category)}
                        </TableCell>
                        <TableCell align="center">
                          {category.score}/{category.total}
                        </TableCell>
                        <TableCell align="center">
                          {category.percentage}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Question Analysis
              </Typography>
              <List>
                {questions.map((question, index) => {
                  const userAnswer = userAnswers[question.id] || '';
                  const isCorrect = userAnswer === question.correct_answer;
                  
                  return (
                    <React.Fragment key={question.id}>
                      {index > 0 && <Divider component="li" />}
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography
                                component="span"
                                variant="body1"
                                color={isCorrect ? 'success.main' : 'error.main'}
                                sx={{ fontWeight: 'bold', mr: 1 }}
                              >
                                {isCorrect ? '✓' : '✗'}
                              </Typography>
                              <Typography component="span" variant="body1">
                                Question {index + 1}: {question.question}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="text.primary">
                                Your answer: {userAnswer ? `${userAnswer}. ${question.options[userAnswer] || 'Not answered'}` : 'Not answered'}
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2" color="success.main">
                                Correct answer: {question.correct_answer ? `${question.correct_answer}. ${question.options[question.correct_answer] || ''}` : 'N/A'}
                              </Typography>
                              {question.explanation && (
                                <React.Fragment>
                                  <br />
                                  <Typography component="span" variant="body2" color="text.secondary">
                                    Explanation: {question.explanation}
                                  </Typography>
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </React.Fragment>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<ReplayIcon />}
          onClick={handleRetakeTest}
        >
          Retake Test
        </Button>
        
        <PDFExport />
      </Box>
    </Container>
  );
};

export default ResultsPage;
