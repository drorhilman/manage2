# Project Architecture Overview

This document provides an overview of the project structure, setup, and architecture for the Vite-Firebase project located in the root directory.

## Project Structure

### Root Directory
- **Configuration Files**: 
  - `.gitignore`: Specifies files and directories to be ignored by Git.
  - `apphosting.yaml`: Configuration for app hosting.
  - `firestore.indexes.json`: Firestore indexes configuration.
  - `firestore.rules`: Firestore security rules.
  - `package.json`: Contains metadata about the project and its dependencies.

### Frontend Directory
- **Main Entry Point**: 
  - `index.html`: The main HTML file for the frontend application.
- **Build Tool**: 
  - `vite.config.js`: Configuration for Vite, the build tool used in this project.
- **Source Code**:
  - `src/`: Contains React components and other source files.
    - `App.jsx`: Main application component.
    - `Login.jsx`: Login component.
    - `main.jsx`: Entry point for the React application.
    - `firebase.js`: Handles Firebase configuration and initialization.
- **Public Assets**:
  - `public/`: Contains static assets like `vite.svg`.

### Functions Directory
- **Cloud Functions**:
  - `index.js`: Main file for Firebase Cloud Functions.
  - `.eslintrc.js`: ESLint configuration for the functions.

### Dataconnect Directory
- **GraphQL Files**:
  - `mutations.gql`, `queries.gql`, `schema.gql`: GraphQL operations and schema definitions.

### Public Directory
- **Static Files**:
  - `index.html`: Another entry point for static hosting.

## UI Libraries
- The project uses React as the UI library, as specified in the `frontend/package.json` file.

## Firebase Integration
- The project uses Firebase for backend services, including Firestore for database operations and Cloud Functions for server-side logic.

## Development Setup

### Running Locally
1. Navigate to the `frontend` directory.
2. Install dependencies using `npm install`.
3. Start the development server with `npm run dev`.

### Emulating Firebase Transactions
1. Install the Firebase CLI if not already installed.
2. Use `firebase emulators:start` to start the Firebase emulators for Firestore and Functions.

### Deployment to Firebase
1. Build the frontend application using `npm run build` in the `frontend` directory.
2. Deploy the application and functions using `firebase deploy`.

This architecture overview should help you understand the setup and structure of the project, enabling further development and enhancements.
