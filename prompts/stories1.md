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