# Deployment Guide for DP-600 Exam Preparation App

This guide provides instructions for deploying the DP-600 Exam Preparation application both locally and on cloud platforms like Vercel and Render.

## Local Deployment

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps for Local Deployment

1. **Install dependencies**:
   ```bash
   cd dp600_app
   npm install
   ```

2. **Build the application**:
   ```bash
   npm run build
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

## Deployment on Vercel

### Prerequisites
- A GitHub account
- A Vercel account (can sign up with GitHub)

### Steps for Vercel Deployment

1. **Push your code to GitHub**:
   Create a new repository on GitHub and push your code.

2. **Import your project to Vercel**:
   - Log in to Vercel
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `build`
     - Install Command: `npm install`

3. **Configure environment variables** (if needed):
   - Add any required environment variables in the Vercel project settings

4. **Deploy**:
   Click "Deploy" and wait for the deployment to complete

5. **Access your application**:
   Vercel will provide a URL for your deployed application

## Deployment on Render

### Prerequisites
- A Render account

### Steps for Render Deployment

1. **Create a new Web Service on Render**:
   - Log in to Render
   - Click "New" and select "Web Service"
   - Connect your GitHub repository

2. **Configure the service**:
   - Name: `dp600-exam-prep` (or your preferred name)
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Configure environment variables** (if needed):
   - Add any required environment variables in the Render service settings

4. **Deploy**:
   Click "Create Web Service" and wait for the deployment to complete

5. **Access your application**:
   Render will provide a URL for your deployed application

## Important Notes

- The application uses a simple Express server to serve both the API endpoints and the static React application
- For production deployments, you might want to consider separating the API and frontend into different services
- Make sure all JSON data files (question database, test sets) are properly included in your deployment
- The PDF generation feature requires client-side JavaScript to be enabled in the browser

## Troubleshooting

- If you encounter CORS issues, check the CORS configuration in `server.js`
- If the API endpoints are not accessible, verify the proxy settings in `vite.config.js`
- For deployment issues, check the platform-specific logs for error messages
