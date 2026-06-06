/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useEffect } from 'react';

/**
 * CONTEXT API IN REACT:
 * Explain: React Context allows us to share data globally across the entire component tree,
 * without having to pass props down manually through multiple levels (prop drilling).
 * 
 * It is extremely useful for general settings like:
 * - User Authentication Status
 * - Theme Preferences (Light / Dark mode)
 * - Language Translations
 */

// 1. Create the Context with a default undefined value
const AuthContext = createContext(undefined);

// 2. AuthProvider Component: Manages authentication and theme state and delivers it to child components
export function AuthProvider({ children }) {
  // useState Hook: Explain state management inside components
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Bonus Feature: Persist login state in localStorage
    return localStorage.getItem('npt_isLoggedIn') === 'true';
  });

  const [user, setUserState] = useState(() => {
    const savedUser = localStorage.getItem('npt_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('npt_darkMode') === 'true';
  });

  // Effect hook to apply the dark mode CSS class whenever theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('npt_darkMode', String(darkMode));
  }, [darkMode]);

  // login function: sets state and updates localStorage
  const login = (name) => {
    const newUser = { 
      name, 
      email: `${name.toLowerCase()}@npt-tutor.com`, 
      role: "Private Tutor" 
    };
    setIsLoggedIn(true);
    setUserState(newUser);
    localStorage.setItem('npt_isLoggedIn', 'true');
    localStorage.setItem('npt_user', JSON.stringify(newUser));
  };

  // logout function: clears state and localStorage
  const logout = () => {
    setIsLoggedIn(false);
    setUserState(null);
    localStorage.removeItem('npt_isLoggedIn');
    localStorage.removeItem('npt_user');
  };

  // custom setUser wrapper that updates local storage too, allowing direct parameter or function updater
  const setUser = (updater) => {
    setUserState((prev) => {
      const nextUser = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem('npt_user', JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Make sure all required values are provided
  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    setUser,
    darkMode,
    toggleDarkMode
  };

  return (
    // Context Provider: Emits the value variables to all downstream subscribers
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom Hook: Beginner-friendly wrap of useContext to access state safely
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}