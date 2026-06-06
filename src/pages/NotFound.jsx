/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { AlertTriangle, Home, GraduationCap } from 'lucide-react';

/**
 * NOT FOUND COMPONENT (Bonus Feature #7 - 404 Page)
 * 
 * Displays an elegant fallback page when a user loads an unknown url.
 */

export function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center animate-fade-in transition-colors duration-200">
      
      <div className="max-w-md bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-808 p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col items-center">
        
        {/* Warning Icon */}
        <div className="p-4 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 mb-6 flex items-center justify-center">
          <AlertTriangle className="w-12 h-12" />
        </div>

        {/* Brand header */}
        <div className="flex items-center gap-1.5 mb-2">
          <GraduationCap className="w-5 h-5 text-violet-650" />
          <span className="font-bold text-xs text-zinc-400 dark:text-zinc-500 tracking-wider uppercase font-mono">
            NPT Student Portal
          </span>
        </div>

        <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight mb-2">
          404: Page Missing
        </h1>
        
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8 leading-relaxed">
          The requested URL path was not mapped into our application's routes. It may have been relocated, or typed incorrectly.
        </p>

        {/* Action Link row */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            id="notfound-home-btn"
            to="/dashboard"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm rounded-xl transition shadow-md"
          >
            <Home className="w-4 h-4" />
            Home Panel
          </Link>
          <Link
            id="notfound-login-btn"
            to="/login"
            className="flex-1 py-2.5 px-4 border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-zinc-805 font-semibold text-sm rounded-xl transition"
          >
            Tutor Login
          </Link>
        </div>

      </div>

    </div>
  );
}