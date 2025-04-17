import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ConfigPage from './pages/ConfigPage';
import TestPage from './pages/TestPage';
import ResultsPage from './pages/ResultsPage';
import { TestProvider } from './context/TestContext';

function App() {
  return (
    <TestProvider>
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header />
          <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/config" element={<ConfigPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Router>
    </TestProvider>
  );
}

export default App;
