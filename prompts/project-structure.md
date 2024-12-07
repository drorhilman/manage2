# Application Structure Plan

## Directory Structure Overview

```
src/
├── app/                    # Application core setup
├── components/            # Reusable components
├── features/             # Feature-specific components
├── layouts/              # Layout components
├── lib/                  # Utilities and configurations
├── pages/               # Route pages
├── hooks/               # Custom hooks
├── styles/              # Global styles
└── types/               # TypeScript types
```

## Detailed Structure Breakdown

### `/src/app/`
- `App.tsx` - Main application component
- `router.tsx` - React Router configuration
- `Providers.tsx` - Context providers wrapper

### `/src/lib/`
- `firebase/`
  - `config.ts` - Firebase configuration
  - `auth.ts` - Authentication utilities
  - `db.ts` - Firestore utilities
  - `storage.ts` - Firebase storage utilities
- `utils/`
  - `date-utils.ts` - Date formatting utilities
  - `price-utils.ts` - Price calculation utilities
  - `validation.ts` - Form validation utilities
- `constants.ts` - Application constants

### `/src/components/ui/`
All shadcn/ui components will be stored here following their documentation structure:
- `button.tsx`
- `input.tsx`
- `select.tsx`
- `dialog.tsx`
- `table.tsx`
- etc.

### `/src/components/common/`
Shared components used across features:
- `SearchBar.tsx`
- `FilterPanel.tsx`
- `StatusBadge.tsx`
- `Pagination.tsx`
- `LoadingSpinner.tsx`
- `ErrorBoundary.tsx`
- `ConfirmationDialog.tsx`
- `NotificationToast.tsx`

### `/src/layouts/`
- `RootLayout.tsx` - Main application layout
- `AuthLayout.tsx` - Authentication pages layout
- `DashboardLayout.tsx` - Main dashboard layout
- `components/`
  - `Header.tsx`
  - `Sidebar.tsx`
  - `TabNavigation.tsx`
  - `UserMenu.tsx`

### `/src/features/`

#### `/src/features/auth/`
- `components/`
  - `GoogleSignInButton.tsx`
  - `AuthGuard.tsx`
- `hooks/`
  - `useAuth.ts`
- `types/`
  - `auth.types.ts`

#### `/src/features/customers/`
- `components/`
  - `CustomerList.tsx`
  - `CustomerCard.tsx`
  - `CustomerForm.tsx`
  - `CustomerDetails.tsx`
  - `CustomerContacts.tsx`
  - `CustomerAddresses.tsx`
- `hooks/`
  - `useCustomers.ts`
  - `useCustomerForm.ts`

#### `/src/features/orders/`
- `components/`
  - `OrderList.tsx`
  - `OrderCalendar.tsx`
  - `OrderForm.tsx`
  - `OrderDetails.tsx`
  - `OrderStatusFlow.tsx`
  - `PriceCalculator.tsx`
- `hooks/`
  - `useOrders.ts`
  - `useOrderCalculations.ts`

#### `/src/features/products/`
- `components/`
  - `ProductList.tsx`
  - `ProductForm.tsx`
  - `ProductPricing.tsx`
  - `JobDescriptionList.tsx`
  - `JobDescriptionForm.tsx`
- `hooks/`
  - `useProducts.ts`
  - `useJobDescriptions.ts`

#### `/src/features/offers/`
- `components/`
  - `OfferList.tsx`
  - `OfferForm.tsx`
  - `OfferStatus.tsx`
  - `OfferCalculator.tsx`
- `hooks/`
  - `useOffers.ts`
  - `useOfferCalculations.ts`

#### `/src/features/reports/`
- `components/`
  - `ReportDashboard.tsx`
  - `RevenueChart.tsx`
  - `CustomerMetrics.tsx`
  - `ProductMetrics.tsx`
  - `ExportControls.tsx`
- `hooks/`
  - `useReports.ts`
  - `useChartData.ts`

### `/src/pages/`
Route components:
- `AuthPage.tsx`
- `DashboardPage.tsx`
- `CustomersPage.tsx`
- `CustomerDetailsPage.tsx`
- `OrdersPage.tsx`
- `OrderDetailsPage.tsx`
- `ProductsPage.tsx`
- `JobDescriptionsPage.tsx`
- `OffersPage.tsx`
- `ReportsPage.tsx`

### `/src/hooks/`
Shared hooks:
- `useDebounce.ts`
- `useLocalStorage.ts`
- `useMediaQuery.ts`
- `usePagination.ts`
- `useSort.ts`
- `useFilter.ts`

### `/src/types/`
Shared TypeScript interfaces and types:
- `customer.types.ts`
- `order.types.ts`
- `product.types.ts`
- `offer.types.ts`
- `report.types.ts`

### `/src/styles/`
- `globals.css` - Global styles and Tailwind directives
- `themes.css` - Theme-related styles

## Component Reusability Strategy

### Common UI Components
These components will be built using shadcn/ui as base and customized for the application:
- Form elements (inputs, selects, buttons)
- Data display elements (tables, cards)
- Feedback elements (alerts, toasts)
- Layout elements (tabs, panels)

### Feature-Specific Components
Built using common UI components and handling specific business logic:
- List views (CustomerList, OrderList, etc.)
- Detail views (CustomerDetails, OrderDetails)
- Forms (CustomerForm, OrderForm)
- Metrics displays (RevenueChart, CustomerMetrics)

## Routing Structure

```
/
├── /auth
├── /dashboard
├── /customers
│   ├── /
│   └── /:id
├── /orders
│   ├── /
│   ├── /calendar
│   └── /:id
├── /products
│   ├── /
│   └── /:id
├── /job-descriptions
│   ├── /
│   └── /:id
├── /offers
│   ├── /
│   └── /:id
└── /reports
```

## State Management Strategy

1. Firebase Realtime Data
- Customer data
- Order information
- Product catalog
- Special offers

2. Local State
- UI state (mobile/desktop view)
- Form state
- Filter/sort preferences
- Pagination state

3. Cache Strategy
- Customer list caching
- Product catalog caching
- Recent orders caching

## Security Considerations

1. Firebase Security Rules
- User authentication rules
- Data access permissions
- Whitelist verification

2. Route Protection
- AuthGuard component
- Role-based access control
- Whitelist verification

## Performance Optimizations

1. Component Lazy Loading
- Route-based code splitting
- Heavy component lazy loading
- Dynamic imports for large features

2. Data Loading
- Pagination implementation
- Infinite scroll where appropriate
- Data caching strategy

3. Asset Optimization
- Image optimization
- Icon sprite sheets
- CSS optimization
