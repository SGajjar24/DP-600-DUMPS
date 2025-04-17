import React from 'react';
import { Typography, Box, Card, CardContent, Grid, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          DP-600 Exam Preparation
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Microsoft Fabric Analytics Engineer Associate Certification
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                About the Exam
              </Typography>
              <Typography paragraph>
                The DP-600 exam measures your ability to implement analytics solutions using Microsoft Fabric. 
                As a Fabric Analytics Engineer, you should have expertise in designing, creating, and managing 
                analytical assets such as semantic models, data warehouses, and lakehouses.
              </Typography>
              <Typography paragraph>
                The exam covers three main areas:
              </Typography>
              <Typography component="ul" sx={{ pl: 2 }}>
                <li>Maintain a data analytics solution (25-30%)</li>
                <li>Prepare data (45-50%)</li>
                <li>Implement and manage semantic models (25-30%)</li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Practice Tests
              </Typography>
              <Typography paragraph>
                Choose a practice test length to begin your preparation:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => navigate('/config', { state: { testLength: 15 } })}
                >
                  15 Question Test
                </Button>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => navigate('/config', { state: { testLength: 30 } })}
                >
                  30 Question Test
                </Button>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => navigate('/config', { state: { testLength: 45 } })}
                >
                  45 Question Test
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Exam Preparation Tips
            </Typography>
            <Typography paragraph>
              To prepare effectively for the DP-600 exam:
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Understand the core concepts of Microsoft Fabric</li>
              <li>Practice with lakehouses, warehouses, and semantic models</li>
              <li>Learn SQL, KQL, and DAX query languages</li>
              <li>Review security and governance best practices</li>
              <li>Study data transformation and preparation techniques</li>
              <li>Understand performance optimization for semantic models</li>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default HomePage;
