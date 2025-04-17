import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' DP-600 Exam Preparation App | '}
          <Link color="inherit" href="https://learn.microsoft.com/en-us/credentials/certifications/fabric-analytics-engineer-associate/" target="_blank" rel="noopener">
            Microsoft Fabric Analytics Engineer Associate
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
