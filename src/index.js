import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Global styles
const styles = `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

a {
  text-decoration: none;
  color: #0078d4;
}

a:hover {
  text-decoration: underline;
}
`;

document.addEventListener('DOMContentLoaded', () => {
  // Create style element
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
  
  // Create root element if it doesn't exist
  let rootElement = document.getElementById('root');
  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
  }
  
  // Create a message element
  const messageElement = document.createElement('div');
  messageElement.style.textAlign = 'center';
  messageElement.style.padding = '2rem';
  messageElement.style.maxWidth = '600px';
  messageElement.style.margin = '0 auto';
  messageElement.style.marginTop = '2rem';
  messageElement.style.backgroundColor = '#fff';
  messageElement.style.borderRadius = '8px';
  messageElement.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
  
  messageElement.innerHTML = `
    <h1 style="color: #0078d4; margin-bottom: 1rem;">DP-600 Exam Preparation App</h1>
    <p style="margin-bottom: 1rem;">This application is being set up to serve the test preparation content.</p>
    <p style="margin-bottom: 1rem;">Please run the development server to access the full application.</p>
    <div style="margin-top: 2rem;">
      <p style="font-weight: bold;">Features:</p>
      <ul style="list-style-type: none; margin-top: 0.5rem; text-align: left; display: inline-block;">
        <li>✓ 15/30/45 question practice tests</li>
        <li>✓ Comprehensive coverage of exam topics</li>
        <li>✓ Detailed explanations and solutions</li>
        <li>✓ PDF export of test results</li>
        <li>✓ Responsive design for all devices</li>
      </ul>
    </div>
  `;
  
  // Render the message
  rootElement.appendChild(messageElement);
});
