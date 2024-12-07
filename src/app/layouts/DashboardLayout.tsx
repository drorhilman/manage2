import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar will go here */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
