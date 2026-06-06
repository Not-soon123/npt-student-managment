/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PROTECTED ROUTES:
 * Explain: A protected route intercepts access to pages that require a user to log in.
 * If authentication fails or is missing (isLoggedIn is false), it redirects the client to "/login"
 * using the <Navigate /> component from react-router-dom.
 * 
 * Props:
 * - children: Represents the actual dashboard component we want to guard.
 */

export function ProtectedRoute({ children }) {
  // We grab our global login state from the AuthContext
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Navigate with "replace" mimics a server redirect, overwriting browser history
    // We can also store the current path in state to return here after logging in!
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in, safely display the child content
  return <>{children}</>;
}