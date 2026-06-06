/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  ShieldAlert, 
  Check, 
  Smartphone, 
  FileText 
} from 'lucide-react';

/**
 * PROFILE COMPONENT (Route: /dashboard/profile)
 * 
 * Demonstrates:
 * 1. Global Context Customizer (setUser):
 *    Reads the original auth state, and provides an edit-view to alter the tutor's name.
 *    By calling `setUser({ ...user, name: newName })`, the changes bubble up to the AuthContext provider,
 *    updating the Welcome Header AND DashboardHome greetings instantly!
 * 2. useState for local form management:
 *    Keeps track of input values and displays confirmation animations.
 */

export function Profile() {
  const { user, setUser } = useAuth();
  
  // Local useState hooks to capture form fields during staging
  const [tutorName, setTutorName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('+251-900-1122');
  const [bio, setBio] = useState('Senior Mathematics and Physics mentor specialized in preparing intermediate students for college-entrance tests.');
  
  const [saveBanner, setSaveBanner] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!tutorName.trim()) return;

    // Trigger Context API global variable modifier
    setUser({
      name: tutorName.trim(),
      email: email.trim() || 'natan@npt-tutor.com',
      role: 'Private Tutor'
    });

    setSaveBanner(true);
    // Dim the banner after some time
    setTimeout(() => setSaveBanner(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Tutor Settings & Profile
        </h1>
        <p className="text-zinc-455 dark:text-zinc-400 text-sm mt-1">
          Adjust your personal information, modify email notifications, and calibrate global account preferences.
        </p>
      </div>

      {saveBanner && (
        <div id="profile-success-banner" className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-400 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-5 h-5" />
          Tutor profile updated successfully! Settings synchronized globally.
        </div>
      )}

      {/* Main Form/Grid */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-808 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-3">
        
        {/* Tutor Badge Sidebar Card */}
        <div className="bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-8 border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-808 flex flex-col items-center justify-between text-center">
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg mx-auto">
              {user?.name.charAt(0) || 'N'}
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-50" id="badge-tutor-name">
                {user?.name}
              </h3>
              <p className="text-xs text-violet-600 dark:text-violet-400 font-bold uppercase tracking-wider mt-1">
                Private Tutor Specialist
              </p>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-xs mx-auto leading-relaxed">
              Updates made inside this sheet will propagate dynamically across the top Navigation, Welcome Greetings, and Stats dashboards.
            </p>
          </div>

          <div className="pt-8 border-t border-zinc-100 dark:border-zinc-803/60 w-full text-left space-y-3.5">
            <div className="flex items-center gap-2 text-xs">
              <Smartphone className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-500 font-medium">{phone}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Mail className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-505 dark:text-zinc-400 font-medium truncate shrink">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Input Form Fields Sheet */}
        <form onSubmit={handleProfileSave} className="md:col-span-2 p-8 space-y-6">
          <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 border-b border-zinc-50 dark:border-zinc-805 pb-3 flex items-center gap-1.5 mb-2">
            <User className="w-5 h-5 text-violet-600" />
            Core Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tutor-name-field" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Authorized Tutor Name
              </label>
              <input
                id="tutor-name-field"
                type="text"
                required
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
                className="mt-1.5 w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 focus:border-violet-500 focus:bg-white rounded-xl text-sm transition-all outline-none"
              />
            </div>

            <div>
              <label htmlFor="tutor-email-field" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="tutor-email-field"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 focus:border-violet-500 focus:bg-white rounded-xl text-sm transition-all outline-none"
              />
            </div>

            <div>
              <label htmlFor="tutor-phone-field" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Telephone Contact
              </label>
              <input
                id="tutor-phone-field"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 focus:border-violet-500 focus:bg-white rounded-xl text-sm transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                System Authorized Credentials
              </label>
              <div className="mt-2.5 p-3.5 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-950/30 rounded-xl flex items-start gap-2 text-[11px] text-amber-800 dark:text-amber-400 leading-normal">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Admin roles can only be adjusted by system engineers. Submit requests for permission overrides.
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label htmlFor="tutor-bio-field" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <FileText className="w-4 h-4 text-zinc-450" />
              Tutor Bio Statement
            </label>
            <textarea
              id="tutor-bio-field"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 focus:bg-white rounded-xl text-sm outline-none transition-all resize-none"
            />
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-808 flex justify-end">
            <button
              id="save-profile-btn"
              type="submit"
              className="flex items-center gap-1.5 py-3 px-6 bg-violet-600 hover:bg-violet-750 text-white font-bold text-sm rounded-xl shadow-md active:bg-violet-850 transition-colors pointer-events-auto cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Commit Changes
            </button>
          </div>
        </form>

      </div>

    </div>
  );
}