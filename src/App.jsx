/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { DashboardHome } from './pages/DashboardHome';
import { Students } from './pages/Students';
import { StudentDetails } from './pages/StudentDetails';
import { Attendance } from './pages/Attendance';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

/**
 * MAIN APP CONTAINER (src/App.jsx)
 * 
 * Demonstrates:
 * 1. Root Providers (AuthProvider & StudentProvider):
 *    We wrap the entire website in our Context Providers first. This gives every child page
 *    and nested component instant subscriptions to Auth status, tutoring student states, and dark/light modes.
 * 
 * 2. Nested Router Layout (BrowserRouter, Routes, Route):
 *    - "/login" redirects to Login page.
 *    - "/" redirects automatically to "/dashboard" for convenient startup.
 *    - "/dashboard" wraps all inner sub-pages inside a `<ProtectedRoute>`. If login succeeds:
 *      - Path "/dashboard" (Index Route) displays `DashboardHome`.
 *      - Path "/dashboard/students" displays `Students` list manager.
 *      - Path "/dashboard/students/:id" loads `StudentDetails` dynamically using parametric keys.
 *      - Path "/dashboard/attendance" registers interactive class status.
 *      - Path "/dashboard/profile" alters tutor settings globally.
 * 
 * 3. Catch-All Routing (*):
 *    Unknown paths render our customized 404 page (`NotFound`).
 */

export default function App() {
  return (
    // 1. Context Providers wrap all sub-trees
    <AuthProvider>
      <StudentProvider>
        
        {/* 2. BrowserRouter starts the reactive address history */}
        <BrowserRouter>
          <Routes>
            {/* Index utility redirection for convenience */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Public authentication page */}
            <Route path="/login" element={<Login />} />

            {/* 
              Protected Nested Dashboard layout:
              Guards all child options. If unauthorized, ProtectedRoute redirects immediately to /login.
              Inside Dashboard, different views are structured as sub-routes matching their respective paths,
              rendering sequentially inside the central <Outlet /> node.
            */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              {/* Index Route describes the default view for the /dashboard base route */}
              <Route index element={<DashboardHome />} />
              
              <Route path="students" element={<Students />} />
              <Route path="students/:id" element={<StudentDetails />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* 3. Catch-All unmapped 404 redirects */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

      </StudentProvider>
    </AuthProvider>
  );
}