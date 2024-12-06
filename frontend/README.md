# Project Overview
This project is a management application that allows users to manage orders, offers, and reports. It utilizes Firebase for backend services, including Firestore for data storage and authentication.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project in the Firebase console.
   - Add your Firebase configuration to `frontend/src/firebase.js`.

## Usage Instructions
1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Firestore Schema Documentation
- **Users Collection**
  - `uid`: string (User ID)
  - `whitelisted`: boolean (Indicates if the user is whitelisted)

- **Orders Collection**
  - `customerName`: string (Name of the customer)
  - `jobDescription`: string (Description of the job)
  - `productName`: string (Name of the product)
  - `quantity`: number (Quantity of the product)

- **Offers Collection**
  - `description`: string (Description of the offer)
  - `applicableCustomers`: array (List of customer IDs applicable for the offer)

- **Reports Collection**
  - `customerName`: string (Name of the customer)
  - `productName`: string (Name of the product)
  - `revenue`: number (Revenue generated)
  - `date`: date (Date of the report)

## Deployment Instructions
1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Firebase Hosting:
   ```bash
   firebase deploy
   ```

Ensure you have the Firebase CLI installed and configured with your Firebase project.
