# User Management System

<!-- React-based user management application with authentication and CRUD operations -->

## Overview
A modern React application for managing users with authentication, built using TypeScript, Redux Toolkit, and styled-components.

## Features
- User authentication (login/logout)
- User CRUD operations (Create, Read, Update, Delete)
- Responsive design with theme support
- Form validation using Formik and Yup
- State management with Redux Toolkit

## Tech Stack
- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Styled Components
- **Forms**: Formik + Yup validation
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Notifications**: React Toastify

## Project Structure
```
src/
├── api/           # API service functions
├── components/    # Reusable UI components
├── features/      # Redux slices and thunks
├── pages/         # Page components
├── store/         # Redux store configuration
└── theme/         # Theme configuration and providers
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Available Scripts
- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Development
The application runs on `http://localhost:3000` in development mode.