/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Users, 
  CalendarCheck, 
  UserCircle, 
  LogOut, 
  Sun, 
  Moon,
  GraduationCap
} from 'lucide-react';

/**
 * NAVBAR COMPONENT
 * 
 * Demonstrates:
 * 1. Context API Integration: Reads the authenticated tutor names dynamically.
 * 2. React Router Link: Replaces standard <a> tags to prevent complete HTML reloads,
 *    making the app an incredibly responsive SPA.
 * 3. useNavigate Hook: Imperative redirection in JavaScript (e.g., inside callbacks like logout).
 */

export function Navbar() {
  const { user, logout, darkMode, toggleDarkMode } = useAuth();
  
  // useNavigate Hook provides an active router context navigator
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to handle logs out safely and redirect
  const handleLogout = () => {
    logout();
    // useNavigate trigger to go immediately back to the authentication screen
    navigate('/login');
  };

  // Helper function to check if a navigation route is active for styling
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Brand/Logo Section */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-zinc-900 dark:text-zinc-50 tracking-tight">
              NPT <span className="text-violet-600 font-medium">Tutor</span>
            </span>
          </div>

          {/* Desktop Navigation Link Tabs */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              id="nav-home"
              to="/dashboard"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>

            <Link
              id="nav-students"
              to="/dashboard/students"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive('/dashboard/students') || location.pathname.startsWith('/dashboard/students/')
                  ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <Users className="w-4 h-4" />
              Students
            </Link>

            <Link
              id="nav-attendance"
              to="/dashboard/attendance"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive('/dashboard/attendance') 
                  ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              Attendance
            </Link>

            <Link
              id="nav-profile"
              to="/dashboard/profile"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive('/dashboard/profile') 
                  ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <UserCircle className="w-4 h-4" />
              Profile
            </Link>
          </div>

          {/* Action Center (Welcome Name, Dark Mode toggle, Logout) */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
              Tutor: <span className="text-zinc-900 dark:text-zinc-100 font-bold">{user?.name}</span>
            </span>

            {/* Dark Mode toggle Button (Context API Bonus #3) */}
            <button
              id="theme-toggle"
              onClick={toggleDarkMode}
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-transparent dark:border-transparent rounded-xl transition-all"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-zinc-600" />}
            </button>

            {/* Logout button */}
            <button
              id="nav-logout"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 dark:text-rose-400 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Navigation Tabs for better responsiveness and touch layouts */}
      <div className="flex md:hidden border-t border-zinc-100 dark:border-zinc-800/70 justify-around py-1 bg-zinc-50/50 dark:bg-zinc-900/50">
        <Link
          id="mobile-nav-home"
          to="/dashboard"
          className={`flex flex-col items-center p-2 text-[10px] font-medium transition-colors ${
            isActive('/dashboard') ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          Home
        </Link>

        <Link
          id="mobile-nav-students"
          to="/dashboard/students"
          className={`flex flex-col items-center p-2 text-[10px] font-medium transition-colors ${
            isActive('/dashboard/students') || location.pathname.startsWith('/dashboard/students/') ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          Students
        </Link>

        <Link
          id="mobile-nav-attendance"
          to="/dashboard/attendance"
          className={`flex flex-col items-center p-2 text-[10px] font-medium transition-colors ${
            isActive('/dashboard/attendance') ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <CalendarCheck className="w-5 h-5 mb-0.5" />
          Attendance
        </Link>

        <Link
          id="mobile-nav-profile"
          to="/dashboard/profile"
          className={`flex flex-col items-center p-2 text-[10px] font-medium transition-colors ${
            isActive('/dashboard/profile') ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <UserCircle className="w-5 h-5 mb-0.5" />
          Profile
        </Link>
      </div>
    </nav>
  );
}

// Add default export for compatibility with both import styles
export default Navbar;