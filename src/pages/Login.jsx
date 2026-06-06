/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, LogIn } from 'lucide-react';

/**
 * LOGIN COMPONENT (Route: /login)
 * 
 * Demonstrates:
 * 1. useNavigate Hook: Programmatic navigation after successful login
 * 2. useState for form input management
 * 3. Context API integration for authentication
 */

export function Login() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      login(name.trim());
      setIsLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex flex-col items-center justify-center p-6 transition-colors duration-200">
      
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-808 rounded-3xl shadow-xl p-8 md:p-10 animate-fade-in">
        
        {/* Logo/Brand Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            NPT Tutor Portal
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Sign in to manage your classroom
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="tutor-name" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Tutor Name
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <input
                id="tutor-name"
                type="text"
                required
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-808 focus:border-violet-500 focus:bg-white dark:focus:bg-zinc-900 rounded-xl text-sm outline-none transition-all"
                autoComplete="name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="tutor-demo" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Demo Access
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <input
                id="tutor-demo"
                type="text"
                disabled
                value="demo-mode (no password required)"
                className="w-full pl-10 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-500 dark:text-zinc-400 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              This is a demo application. Enter any name to continue.
            </p>
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In to Dashboard
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Hint */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-808 text-center">
          <p className="text-xs text-zinc-400">
            Demo Mode: No password required<br />
            Enter any name to access the dashboard
          </p>
        </div>

      </div>
    </div>
  );
}

// Also export as default for compatibility
export default Login;