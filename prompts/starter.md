# Starter Guide for Business Management Project

## Project Overview
This project is a Business Management application designed to manage orders, offers, and reports. It utilizes Firebase for backend services and Vite for a fast development experience. The architecture is based on a modular approach, with separate components for each feature, ensuring maintainability and scalability.

## Running Locally with Vite
To run the project locally using Vite, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd buss-manage2
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   Run the following command to start the Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` to view the application.

## Running Firebase Locally with Emulator
To run Firebase services locally, you need to set up the Firebase Emulator Suite:

1. **Install Firebase Tools**:
   If you haven't already, install Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   In the project directory, run:
   ```bash
   firebase init
   ```
   Follow the prompts to set up Firestore, Functions, and Hosting.

3. **Start the Emulator**:
   Run the following command to start the Firebase Emulator Suite:
   ```bash
   firebase emulators:start
   ```
   This will start the emulators for Firestore and any other services you have configured.

## Deploying to Firebase Remote
To deploy your application to Firebase Hosting, follow these steps:

1. **Build the Project**:
   First, build the project for production:
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**:
   Run the following command to deploy your application:
   ```bash
   firebase deploy
   ```
   After deployment, you will receive a hosting URL where your application is live.

## Conclusion
This guide provides a quick start to running and deploying the Business Management project. For further details, refer to the documentation of the respective tools and libraries used in this project.
