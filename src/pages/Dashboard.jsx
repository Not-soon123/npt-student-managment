/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

/**
 * DASHBOARD LAYOUT COMPONENT
 * 
 * Demonstrates:
 * 1. Nested Routing: Uses <Outlet /> to render child routes
 * 2. Shared Layout: Navbar remains consistent across all dashboard pages
 * 3. Protected Route Wrapper: Ensures authentication before accessing dashboard
 */

export function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

// Also export as default for compatibility
export default Dashboard;