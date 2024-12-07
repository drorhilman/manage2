# General orientation:
Use shadcn/ui, React, Firebase, and Tailwind CSS to create the application
note: the 
1. `firebase.json` configuration file resides in the project’s root directory
2.You will use firebase as host!
3. the main codebase is located in the `./src` folder. 
4. All required npm modules will be installed at the project’s root `./node_modules`
5. and the build system is `vite`. 
The application’s structure must fully integrate these technologies and adhere to this project layout for consistency and maintainability.


# User Stories Specification

## Epic: Authentication & User Management

### US-1: Google Authentication
**As a** business owner
**I want to** log in using my Google account
**So that** I can securely access the system

**Acceptance Criteria:**
- User can click "Sign in with Google" button
- Only whitelisted emails can access the system
- Non-whitelisted users receive clear error message
- Session persists across browser refreshes
- Logout functionality available

**Technical Notes:**
- Implement Firebase Authentication with Google provider
- Store whitelist in Firestore users collection
- Set up security rules for whitelist verification
- Implement custom claims for role-based access


### US-1.5: Google Authentication for Local Development
As a developer, I want to be able to override the login hen running locally, so i can jump right into the view of the product,
without having to login every time.

## Epic: Customer Management

### US-2: Customer List View
**As a** business owner
**I want to** view all my customers in a list
**So that** I can manage my client base effectively

**Acceptance Criteria:**
- Display customer name, business name, and contact info
- Implement search by name/business name
- Add sorting by name/date
- Show key metrics (total orders, revenue)
- Support pagination or infinite scroll
- Include quick actions (edit, view details, new order)

**Technical Notes:**
- Use Firestore queries with proper indexes
- Implement client-side caching
- Add proper loading states
- Consider virtualization for large lists

### US-3: Customer Details Management
**As a** business owner
**I want to** create and edit customer details
**So that** I can maintain accurate customer information

**Acceptance Criteria:**
- Add/edit customer basic info (name, business name)
- Manage multiple contact methods (email, phone, URL)
- Support multiple addresses (billing, shipping)
- Mark primary contact and address
- Track creation and modification dates
- Validate all inputs

**Technical Notes:**
- Use Firestore batch operations for complex updates
- Implement form validation with proper error messages
- Add optimistic updates for better UX

## Epic: Order Management

### US-4: Order Creation
**As a** business owner
**I want to** create new orders for customers
**So that** I can track my business transactions

**Acceptance Criteria:**
- Select customer from dropdown
- Set order date (default to today)
- Choose job description from list
- Select product and quantity
- Auto-populate price based on customer/job/product
- Allow price override with reason
- Apply special offers if available
- Calculate totals with discounts
- Save as draft or complete

**Technical Notes:**
- Implement complex form state management
- Add real-time price calculations
- Use transactions for order creation
- Add proper validation rules

### US-5: Order Management
**As a** business owner
**I want to** view and manage existing orders
**So that** I can track and modify business transactions

**Acceptance Criteria:**
- View orders in list and calendar views
- Filter by customer, date range, status
- Edit existing orders
- Track order status changes
- Show order history and modifications
- Calculate order totals with discounts

**Technical Notes:**
- Implement efficient filtering system
- Use proper indexes for queries
- Add audit logging for changes

## Epic: Product & Pricing Management

### US-6: Product Management
**As a** business owner
**I want to** manage products and job descriptions
**So that** I can standardize my service offerings

**Acceptance Criteria:**
- CRUD operations for products and job descriptions
- Set active/inactive status
- Include name and detailed description
- Track usage in orders
- Support batch operations
- Show related pricing information

**Technical Notes:**
- Implement soft delete for inactive items
- Add validation rules
- Consider caching for frequently accessed data

### US-7: Price Management
**As a** business owner
**I want to** manage pricing for customer-job-product combinations
**So that** I can maintain consistent pricing

**Acceptance Criteria:**
- Set prices for specific combinations
- Track price history with effective dates
- Support bulk price updates
- Show usage in orders
- Validate price changes

**Technical Notes:**
- Design efficient price lookup system
- Implement price history tracking
- Add validation rules

## Epic: Special Offers

### US-8: Special Offer Management
**As a** business owner
**I want to** create and manage special offers
**So that** I can provide discounts to customers

**Acceptance Criteria:**
- Create offers with start/end dates
- Set discount type (percentage/fixed)
- Assign to specific customers
- Show active/upcoming/expired offers
- Apply automatically to eligible orders
- Track usage and impact

**Technical Notes:**
- Implement date-based filtering
- Add automatic offer application logic
- Consider notification system for expiring offers

## Epic: Reporting & Analytics

### US-9: Basic Reporting
**As a** business owner
**I want to** generate reports on my business activities
**So that** I can analyze performance and share with customers

**Acceptance Criteria:**
- Filter by date range, customer, product, job
- Show revenue metrics and trends
- Generate customer-specific reports
- Export to PDF/CSV
- Save report preferences
- Schedule automated reports

**Technical Notes:**
- Implement efficient aggregation queries
- Add report template system
- Consider background processing for large reports

### US-10: Analytics Dashboard
**As a** business owner
**I want to** view business analytics
**So that** I can make informed decisions

**Acceptance Criteria:**
- Show revenue trends
- Display top customers/products
- Visualize job distribution
- Track month-over-month growth
- Show special offer impact
- Support interactive filtering

**Technical Notes:**
- Use efficient data aggregation
- Implement client-side caching
- Consider real-time updates
- Add proper loading states


Proposed Visual Design Stories Document

1. Global UI Principles

	•	Color Palette:
	•	Background: White (#FFFFFF) or very light grey (#F7F7F7)
	•	Primary text: Dark grey (#333333) for readability
	•	Accent color: Blue-grey (#607D8B) for headers, buttons, and tab highlights
	•	Hover/Focus states: Slightly darker shade of blue-grey or a soft underline
	•	Typography:
	•	Use a standard, legible sans-serif font (e.g., system UI font or Roboto)
	•	Base font size: 16–18px on mobile (scales up slightly on desktop)
	•	Headings: 1.2–1.5em larger than base
	•	Ensure text is easily readable with ample line spacing
	•	Layout:
	•	Mobile-first: single-column, vertical scrolling.
	•	On larger screens: introduce padding, maybe a max-width container (e.g., 1200px) centered in the viewport.
	•	Keep margins consistent (e.g., 16px standard padding).
	•	Interaction & Navigation:
	•	A fixed header with a simple title or logo (if any) on the left, a user avatar or menu on the right.
	•	Below the header, a horizontal tab bar with minimal tab labels and icons to differentiate sections (optional).
	•	Tapping a tab changes the main content area below.
	•	On mobile, all primary actions should be reachable with a thumb (consider placing key actions at bottom if needed, but sticking to top tabs per requirements).
	•	Minimize the number of sub-pages. Where possible, use modals or inline expansions.

2. Authentication & Landing

	•	Sign-In Screen (Mobile):
	•	White background, centered “Sign in with Google” button.
	•	A subtle application name or logo (text-based) at the top.
	•	Blue-grey accent for the sign-in button’s border or icon.
	•	After successful sign-in, user is taken directly to the “Customers” tab (the main dashboard).
	•	No Whitelist Access Case:
	•	Show a simple inline error message in red text below the sign-in button.
	•	Text: “Your account is not authorized. Contact admin for access.”

3. Main Navigation & Dashboard

	•	Header (Mobile):
	•	A thin bar at the very top with the app name or logo on the left (e.g., “MyBiz”) and a user avatar/menu icon on the right.
	•	Background: White with a light shadow for contrast.
	•	Tab Bar (Below Header):
	•	Horizontal row with 5-6 tabs: Customers | Orders | Products | Job Descriptions | Offers | Reports
	•	Use text labels only or text+icon. On mobile, icons plus short text labels help quick recognition.
	•	Selected tab highlighted with a blue-grey underline or background tint.
	•	Tabs are scrollable horizontally if they don’t fit on smaller screens.
	•	Default Landing Tab: Customers:
	•	Shows the customer list page by default.

4. Customers List (Mobile First)

	•	List Layout:
	•	A vertical list with each customer in a card-like row:
	•	Customer Name (bold, larger font)
	•	Business Name (smaller, grey text)
	•	Key metrics (e.g., total orders) as a secondary line, possibly icons for phone/email.
	•	A search bar at the top of the customer list to filter by name/business.
	•	A floating “+” button at the bottom right corner for “Add Customer” if screen space allows, or place a button at the top of the list.
	•	On desktop: the list can appear as a table with sortable columns. On mobile, keep it as a simple list, to reduce complexity.
	•	Customer Details:
	•	Tapping a customer row opens the “Customer Details” view:
	•	A back arrow at the top (replaces tabs momentarily or show a top-level breadcrumb)
	•	Display name, business name, contacts (expandable), addresses (expandable).
	•	A section for viewing recent orders of this customer listed below.
	•	An “Edit” button (top right) opens a modal or a dedicated edit screen.
	•	On desktop: details can appear in a side panel or modal next to the list, but prioritize mobile flow (full-screen view).

5. Orders

	•	Order List/Calendar Toggle:
	•	A small toggle at the top of the Orders tab to switch between “List” and “Calendar” view. On mobile, default to list view for simplicity.
	•	Order List:
	•	Each order line shows: Date, Customer Name (if not filtered), Product/Job descriptor, Price, Status.
	•	A filter icon at top for date range/customer.
	•	Order Creation:
	•	“+ Order” button floating at bottom right or at the top.
	•	Step-by-step form on mobile:
	1.	Select Customer
	2.	Choose Job Description
	3.	Select Product (with price auto-filled)
	4.	Adjust quantity, check special offer applied (if any)
	5.	Confirm total price & Save
	•	Each step in a new screen or a well-structured scrollable form to reduce clutter.

6. Products & Job Descriptions

	•	Products Tab (Mobile):
	•	Simple list: Product Name (bold) and short description beneath.
	•	A toggle/filter to show active/inactive products.
	•	“+ Product” button to add a new product with a minimal form (Name, Description, Base Price).
	•	Editing in a modal or dedicated edit screen.
	•	Job Descriptions Tab (Mobile):
	•	Similar layout to products: a list of job descriptions.
	•	“+ Job Description” to add new entries.
	•	Allow simple inline actions like activating/deactivating.

7. Special Offers

	•	Offers Tab (Mobile):
	•	List of offers with Name, Date Range, Discount Type & Value.
	•	Icon or badge indicating if currently active, upcoming, or expired.
	•	“+ Offer” button leads to a simple form: Offer Name, Description, Start/End Date pickers, Discount Type/Value, Customer selection via multi-select dropdown.
	•	On desktop, expand the layout to show more details side-by-side.

8. Reports & Analytics

	•	Reports Tab (Mobile):
	•	A filter icon at the top to open a slide-over panel with date range, customer/product selectors.
	•	Show key metrics: total revenue (large number), top customer (small card), top product (small card).
	•	Basic charts:
	•	A simple line chart for revenue trend (use React UI library’s default chart styling).
	•	A bar chart for top customers.
	•	Export buttons (PDF/CSV) as small icons next to the filters or on a toolbar at the top.
	•	On desktop: charts and tables can be displayed side-by-side.

9. Responsive Behavior

	•	Phone Screen (Primary):
	•	Single-column layout.
	•	Tabs scroll horizontally if too many tabs.
	•	Floating action buttons only if screen real estate allows, otherwise top-aligned buttons.
	•	Tablet & Desktop:
	•	Increase padding around main content.
	•	Allow some two-column layouts (e.g., customer list on left, details on right).
	•	Keep the top tabs in a single row visible.
	•	Charts and lists can be placed side-by-side for better use of space.

10. Accessibility & Usability

	•	Font sizes large enough for readability on small screens.
	•	Sufficient contrast between text and background.
	•	Clear touch targets (minimum 44x44px).
	•	Simple color coding for states (e.g., inactive products in lighter grey, active in normal text color).


# General orientation:
Use shadcn/ui, React, Firebase, and Tailwind CSS to create the application
note: the 
1. `firebase.json` configuration file resides in the project’s root directory
2.You will use firebase as host!
3. the main codebase is located in the `./src` folder. 
4. All required npm modules will be installed at the project’s root `./node_modules`
5. and the build system is `vite`. 
The application’s structure must fully integrate these technologies and adhere to this project layout for consistency and maintainability.
