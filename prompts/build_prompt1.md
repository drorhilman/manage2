
# Context & Objective:
You are an experienced JavaScript developer responsible for building a feature-rich small business management application using React, Vite, Chakra UI, and Firebase. This system will enable a small business to manage customers, job descriptions, products, pricing, orders, and special offers, as well as generate detailed reports and analytics. Your goal is to produce a secure, scalable, and intuitive application with clean code, strong architecture, and a thoughtful user experience.

Core Requirements Overview

1.	Authentication & Authorization
• Use Firebase Authentication with Google Sign-In as the primary method.
• Implement whitelist-based access control where only specified email addresses (e.g., drorhilman@gmail.com) can log in. Manage this whitelist in Firestore.
• Leverage Firebase security rules and custom claims if needed, ensuring that only authenticated and authorized users can read/write specific data.
2.	Data Management
• Store and manage the following entities in Firestore: users, customers, job descriptions, products, prices, orders, and special offers.
• Maintain a logical schema that ensures quick lookups, proper indexing, and easy cross-referencing.
• Implement Firestore security rules that enforce row-level security and ensure users can only access data they’re authorized to see or modify.
3.	UI & UX Guidelines
• Use React (with hooks and Context API) for state management and Vite for bundling and hot module reloading.
• Utilize Chakra UI for a consistent, responsive, and accessible design system. Keep UI clean, modern, and mobile-responsive.
• Provide intuitive navigation (e.g., a sidebar or top nav with sections for Dashboard, Customers, Orders, Products, Job Descriptions, Prices, Special Offers, and Reports).
• Ensure forms are user-friendly, with inline validation messages and clear input feedback.
• Implement efficient data presentation patterns (search, filters, sorting, pagination, infinite scroll) for large datasets.
4.	Business Logic & Features
• Customers:
• Create, update, and remove customers.
• Store multiple contact methods (phone, email, URLs), addresses, and other relevant fields.
• View a detailed customer page showing all associated orders and easy access to add or edit customer details.
• Job Descriptions & Products:
• Maintain lists of job descriptions and products with name, description, and an active flag.
• Provide batch operations for activating/deactivating items.
• Allow users to create, edit, and delete these entries.
• Prices:
• Store a combinational price list keyed by Customer + Job Description + Product.
• Automatically fetch the relevant price when creating or editing an order. If no price is found, prompt the user to add one.
• Maintain price history and effective dates for potential future reporting.
• Orders:
• Create orders tied to a customer, specifying date (default today), job description, product, quantity, price, and optional special offer.
• Edit existing orders to adjust any field.
• Validate inputs (e.g., quantity > 0, date format) and ensure pricing consistency.
• Consider a calendar or list view for quick order navigation and possibly a status workflow (e.g., pending, completed).
• Special Offers:
• Manage special offers with start/end dates, discount type (fixed/percentage), and discount value.
• Associate offers with one or more customers.
• Integrate these discounts into final order calculations and reporting.
• Reporting & Analytics:
• Provide filterable reports by customer, job description, product, date range, amount, and price.
• Implement charts (e.g., using a library like Recharts) for visual analytics:
• Revenue over time
• Top customers and top products by revenue
• Breakdown by job descriptions
• Allow exporting reports to PDF (e.g., via React-PDF) and CSV.
• Consider a feature to email or share reports with customers.
• Implement a default monthly report template that can be quickly generated for a given customer.

Data Schema Guidelines

Proposed Firestore Collections:

users/
  uid: string
  email: string
  role: string (e.g., admin, user)
  whitelisted: boolean

customers/
  id: auto-generated
  name: string
  businessName: string
  contacts: array of { type: string (e.g. "email", "phone"), value: string, primary: boolean }
  addresses: array of { type: string (e.g. "billing", "shipping"), address: string, primary: boolean }

jobDescriptions/
  id: auto-generated
  name: string
  description: string
  active: boolean

products/
  id: auto-generated
  name: string
  description: string
  basePrice: number
  active: boolean

prices/
  id: auto-generated
  customerId: reference(customers)
  jobDescriptionId: reference(jobDescriptions)
  productId: reference(products)
  price: number
  effectiveDate: timestamp

orders/
  id: auto-generated
  customerId: reference(customers)
  date: timestamp
  jobDescriptionId: reference(jobDescriptions)
  productId: reference(products)
  quantity: number
  price: number
  specialOfferId: reference(specialOffers) or null
  status: string (e.g., "pending", "completed")

specialOffers/
  id: auto-generated
  name: string
  description: string
  startDate: timestamp
  endDate: timestamp
  discountType: string ("percentage" or "fixed")
  discountValue: number
  customerIds: array of references(customers)

Indexes & Security Rules:
• Define composite indexes in firestore.indexes.json for common queries (e.g., orders by customerId + date, prices by customerId + jobDescriptionId + productId).
• Implement strict security rules in firestore.rules that ensure:
• Only authenticated users can access data.
• Only whitelisted users can read/write certain collections.
• Enforce role-based operations if multiple user roles are required later.

UI/UX Details

1.	Authentication Screen:
• A simple, professional login page with a “Sign in with Google” button.
• If user is not on the whitelist, show an error message and deny access.
2.	Main Dashboard:
• Present a list of recently modified customers and orders.
• Quick links (cards) for navigating to different management pages (Customers, Orders, etc.).
3.	Customers Page:
• Display a searchable, sortable table with name and business name.
• Pagination or infinite scroll for large datasets.
• Click on a customer to see a detail page with their orders and a button to add a new order.
• Modal forms for adding/editing a customer.
4.	Job Descriptions & Products Pages:
• Similar searchable tables.
• Filters for active/inactive items.
• Batch update operations if needed.
5.	Orders Page:
• Provide both a list and a calendar view.
• Filters by customer, date range, job description, product.
• Add/Edit order modal that auto-fetches prices and calculates totals including offers.
6.	Reports Page:
• Date range pickers with presets (e.g., last 7 days, last month).
• Interactive charts (e.g., revenue trend line, bar chart for top products).
• Export buttons for PDF/CSV.
• A detail report page for generating a monthly report per customer, with special offers highlighted.
7.	Special Offers Page:
• Table of ongoing and upcoming offers.
• Link offers to customers, show effective discount in the UI.
• Modal for adding/editing offers.

Performance & Scalability

1.	Optimized Queries:
• Use indexed queries in Firestore to handle large datasets efficiently.
• Implement pagination and/or infinite scrolling for big collections.
2.	Build & Bundle Optimization:
• Leverage Vite for fast builds and apply code splitting to reduce initial load times.
• Lazy load non-critical routes.
3.	Caching & State Management:
• Use React’s Context and possibly local caching for frequently accessed data (e.g., job descriptions, products).
• Implement optimistic UI updates for improving perceived performance on order creation/edits.
4.	Cloud Functions:
• Consider Cloud Functions for complex business logic (e.g., scheduled report generation, bulk updates).
• Add server-side data validation if needed.

Security & Compliance

1.	Authentication & Authorization:
• Strictly enforce whitelist checks.
• If using roles, store roles in custom claims and verify them in Firestore rules.
2.	Data Validation:
• Validate inputs on the client side before sending to Firestore.
• (Optional) Use Cloud Functions for server-side validation triggers.
3.	Security Rules Testing:
• Write tests to ensure Firestore rules block unauthorized access.
• Verify that role-based rules and whitelist logic are correctly enforced.

Testing & Quality Assurance

1.	Unit Tests:
• Use Jest and React Testing Library for component and logic tests.
2.	Integration Tests:
• Test Firebase operations with the Firebase emulator suite.

CI/CD & Deployment

1.	Local Development:
• Use npm run dev in frontend for local development.
• Run firebase emulators:start to test Firestore, Auth, and Functions locally.
2.	Continuous Integration:
• Integrate linting (ESLint), formatting (Prettier), and run tests on each commit.
• Use GitHub Actions or a similar CI tool.
3.	Deployment to Firebase:
• npm run build for frontend.
• firebase deploy to host static files and deploy cloud functions.
• Maintain environment variables using .env files or Firebase environment config.

Documentation & Maintenance

1.	Developer Documentation:
• A comprehensive README with setup instructions and environment details.
• Inline code comments for complex logic.
2.	User Documentation:
• Basic user guide covering login, navigation, customer management, order creation, and reporting.
3.	Security & Compliance Docs:
• Document Firestore rules and authentication logic.
• Note any GDPR or privacy considerations if storing personal data.
4.	Scaling & Future Features:
• Consider future enhancements like PWA capabilities, multi-language support, and advanced analytics.
• Plan out potential API integrations (e.g., exporting data to external accounting tools).

Your Task:
Build this application step by step. Start with authentication and a secure Firestore schema, then implement customers, job descriptions, and products management. Next, handle pricing and order workflows, followed by reporting and special offers. Throughout development, emphasize performance, security, user experience, and code quality. Continuously test and refine the solution to ensure it meets all outlined requirements.
