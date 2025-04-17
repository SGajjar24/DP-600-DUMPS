# DP-600 Exam Preparation App

A comprehensive test preparation application for the Microsoft Fabric DP-600 certification exam with multiple test length options and PDF export functionality.

## Features

- Practice tests with 15, 30, or 45 questions
- Questions organized by exam domains:
  - Maintain a data analytics solution (25-30%)
  - Prepare data (45-50%)
  - Implement and manage semantic models (25-30%)
- Detailed explanations for all questions
- Test results with category breakdown
- PDF export of test results and solutions
- Responsive design for desktop and mobile devices

## Technology Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Material-UI (MUI)
- **State Management**: React Context API
- **PDF Generation**: jsPDF and html2canvas
- **Server**: Express.js
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd dp600_app
   npm install
   ```

### Running Locally

1. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the Vite development server on port 3001.

2. In a separate terminal, start the API server:
   ```bash
   npm start
   ```
   This will start the Express server on port 3000.

3. Open your browser and navigate to `http://localhost:3001`

### Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Deployment

For detailed deployment instructions, see [deployment_guide.md](deployment_guide.md).

## Project Structure

```
dp600_app/
├── public/                  # Static assets
├── src/                     # Source code
│   ├── assets/              # Images and other assets
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Common UI elements
│   │   ├── layout/          # Layout components
│   │   └── test/            # Test-specific components
│   ├── context/             # React context for state management
│   ├── data/                # Question data and categories
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Application pages
│   ├── services/            # Service functions (PDF generation, etc.)
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── server.js                # Express server for API and static serving
├── question_database.json   # Complete question database
├── test_15.json             # 15-question test set
├── test_30.json             # 30-question test set
├── test_45.json             # 45-question test set
├── question_categories.json # Question categories and topics
└── package.json             # NPM package configuration
```

## License

This project is for educational purposes only. Microsoft Fabric and DP-600 are trademarks of Microsoft Corporation.
