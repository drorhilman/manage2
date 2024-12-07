#!/bin/bash

# Function to create a file with basic content if it doesn't exist
create_file() {
    if [ ! -f "$1" ]; then
        echo "Creating file: $1"
        mkdir -p "$(dirname "$1")"
        
        # Add basic content based on file type
        case "$1" in
            *.tsx)
                echo "import React from 'react'

export default function ${2:-Component}() {
    return (
        <div>
            <h1>${2:-Component}</h1>
        </div>
    )
}" > "$1"
                ;;
            *.ts)
                echo "// ${2:-TypeScript file}" > "$1"
                ;;
            *.css)
                echo "/* ${2:-Styles} */" > "$1"
                ;;
            *)
                echo "// ${2:-File content}" > "$1"
                ;;
        esac
    fi
}

# Create root project directory if it doesn't exist
mkdir -p src

# Create main directory structure
directories=(
    "src/app"
    "src/app/layouts"
    "src/components/ui"
    "src/components/common"
    "src/components/charts"
    "src/components/navigation"
    "src/features/auth/hooks"
    "src/features/auth/components"
    "src/features/auth/data"
    "src/features/auth/types"
    "src/features/customers/hooks"
    "src/features/customers/components"
    "src/features/customers/data"
    "src/features/customers/types"
    "src/features/orders/hooks"
    "src/features/orders/components"
    "src/features/orders/data"
    "src/features/orders/types"
    "src/features/products/hooks"
    "src/features/products/components"
    "src/features/products/data"
    "src/features/products/types"
    "src/features/offers/hooks"
    "src/features/offers/components"
    "src/features/offers/data"
    "src/features/offers/types"
    "src/features/reports/hooks"
    "src/features/reports/components"
    "src/features/reports/data"
    "src/features/reports/types"
    "src/pages"
    "src/hooks"
    "src/lib/firebase"
    "src/lib/utils"
    "src/styles"
    "src/types"
)

# Create directories
for dir in "${directories[@]}"; do
    mkdir -p "$dir"
    echo "Created directory: $dir"
done

# Create app files
create_file "src/app/App.tsx" "App"
create_file "src/app/router.tsx" "Router"
create_file "src/app/Providers.tsx" "Providers"

# Create layout files
create_file "src/app/layouts/RootLayout.tsx" "RootLayout"
create_file "src/app/layouts/AuthLayout.tsx" "AuthLayout"
create_file "src/app/layouts/DashboardLayout.tsx" "DashboardLayout"

# Create UI components
create_file "src/components/ui/button.tsx" "Button"
create_file "src/components/ui/input.tsx" "Input"
create_file "src/components/ui/dialog.tsx" "Dialog"

# Create common components
create_file "src/components/common/SearchBar.tsx" "SearchBar"
create_file "src/components/common/FilterPanel.tsx" "FilterPanel"
create_file "src/components/common/StatusBadge.tsx" "StatusBadge"
create_file "src/components/common/Pagination.tsx" "Pagination"
create_file "src/components/common/LoadingSpinner.tsx" "LoadingSpinner"
create_file "src/components/common/ConfirmationDialog.tsx" "ConfirmationDialog"
create_file "src/components/common/NotificationToast.tsx" "NotificationToast"

# Create chart components
create_file "src/components/charts/LineChart.tsx" "LineChart"
create_file "src/components/charts/BarChart.tsx" "BarChart"

# Create navigation components
create_file "src/components/navigation/Header.tsx" "Header"
create_file "src/components/navigation/TabNavigation.tsx" "TabNavigation"
create_file "src/components/navigation/UserMenu.tsx" "UserMenu"

# Create feature files
features=("auth" "customers" "orders" "products" "offers" "reports")
for feature in "${features[@]}"; do
    create_file "src/features/$feature/index.ts" "$feature"
    create_file "src/features/$feature/hooks/use${feature^}.ts" "use${feature^}"
    create_file "src/features/$feature/types/${feature}.types.ts" "${feature}Types"
    create_file "src/features/$feature/data/${feature}Queries.ts" "${feature}Queries"
done

# Create pages
create_file "src/pages/AuthPage.tsx" "AuthPage"
create_file "src/pages/DashboardPage.tsx" "DashboardPage"
create_file "src/pages/CustomersPage.tsx" "CustomersPage"
create_file "src/pages/CustomerDetailsPage.tsx" "CustomerDetailsPage"
create_file "src/pages/OrdersPage.tsx" "OrdersPage"
create_file "src/pages/OrderDetailsPage.tsx" "OrderDetailsPage"
create_file "src/pages/ProductsPage.tsx" "ProductsPage"
create_file "src/pages/JobDescriptionsPage.tsx" "JobDescriptionsPage"
create_file "src/pages/OffersPage.tsx" "OffersPage"
create_file "src/pages/ReportsPage.tsx" "ReportsPage"
create_file "src/pages/NotFoundPage.tsx" "NotFoundPage"

# Create hooks
create_file "src/hooks/useDebounce.ts" "useDebounce"
create_file "src/hooks/useLocalStorage.ts" "useLocalStorage"
create_file "src/hooks/useMediaQuery.ts" "useMediaQuery"
create_file "src/hooks/usePagination.ts" "usePagination"
create_file "src/hooks/useFilter.ts" "useFilter"
create_file "src/hooks/useSort.ts" "useSort"

# Create Firebase configuration files
create_file "src/lib/firebase/config.ts" "firebaseConfig"
create_file "src/lib/firebase/auth.ts" "firebaseAuth"
create_file "src/lib/firebase/db.ts" "firebaseDB"
create_file "src/lib/firebase/storage.ts" "firebaseStorage"

# Create utility files
create_file "src/lib/utils/date-utils.ts" "dateUtils"
create_file "src/lib/utils/price-utils.ts" "priceUtils"
create_file "src/lib/utils/validation.ts" "validation"
create_file "src/lib/utils/formatters.ts" "formatters"
create_file "src/lib/constants.ts" "constants"

# Create style files
create_file "src/styles/globals.css" "globalStyles"
create_file "src/styles/themes.css" "themeStyles"

# Create type files
create_file "src/types/global.types.ts" "globalTypes"
create_file "src/types/index.ts" "types"

# Create root configuration files
create_file "vite.config.ts" "viteConfig"
create_file "tailwind.config.js" "tailwindConfig"
create_file "tsconfig.json" "tsconfigFile"
create_file "firebase.json" "firebaseConfig"
create_file ".env.example" "envExample"

echo "Project structure created successfully!"