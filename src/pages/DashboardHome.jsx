/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useAuth } from '../context/AuthContext';
import { useStudents } from '../context/StudentContext';
import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Calendar,
  BookOpen,
  Mail,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * DASHBOARD HOME COMPONENT (Route: /dashboard)
 * 
 * Demonstrates:
 * 1. Context API consumption: Uses `useAuth` and `useStudents` to display combined 
 *    user-profile statistics and student information.
 * 2. Pure React calculations: Derives statistics (e.g., average progress, grade levels) 
 *    on-the-fly from our reducer state array, ensuring live reactive updating!
 */

export function DashboardHome() {
  const { user } = useAuth();
  const { students } = useStudents();

  // Simple statistics calculations derived from original state array
  const totalStudents = students.length;
  
  const averageProgress = totalStudents > 0 
    ? Math.round(students.reduce((acc, s) => acc + (s.progress || 0), 0) / totalStudents)
    : 0;

  // Grade Breakdown map
  const gradeCounts = students.reduce((acc, student) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1;
    return acc;
  }, {});

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Banner Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="bg-white/20 text-xs font-semibold px-3 py-1 rounded-full text-violet-100 uppercase tracking-widest">
            Tutor Hub
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {getGreeting()}, {user?.name}!
          </h1>
          <p className="text-violet-100/90 text-sm max-w-xl">
            Welcome to NPT Student Dashboard. Monitor your private class students, track active assignments, update learning progress, and evaluate attendance instantly.
          </p>
        </div>

        {/* Highlight Stats Pill */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 shrink-0 flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="text-xs text-violet-100 font-medium block">Tutor Account</span>
            <span className="text-sm font-bold block">{user?.name || "Natan"}</span>
            <span className="text-[11px] text-violet-200 block">{user?.email}</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards Grid (Bonus Feature #5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Total Students */}
        <div className="bg-white dark:bg-zinc-900 duration-200 hover:shadow-md transition-shadow p-6 rounded-2xl border border-zinc-100 dark:border-zinc-805 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider block">Total Students</span>
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50" id="stat-total-students">
              {totalStudents}
            </span>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 leading-none">
              Active student enrollments
            </p>
          </div>
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/45 text-blue-600 dark:text-blue-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Average Class Performance */}
        <div className="bg-white dark:bg-zinc-900 duration-200 hover:shadow-md transition-shadow p-6 rounded-2xl border border-zinc-100 dark:border-zinc-805 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider block">Academy Progress</span>
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
              {averageProgress}%
            </span>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Avg classroom mastery</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/45 text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Grade Distribution Overview */}
        <div className="bg-white dark:bg-zinc-900 duration-200 hover:shadow-md transition-shadow p-6 rounded-2xl border border-zinc-100 dark:border-zinc-805 flex items-center justify-between col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="space-y-1 w-full">
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider block">Grades Represented</span>
            <div className="flex gap-2.5 mt-2 flex-wrap">
              {Object.keys(gradeCounts).length === 0 ? (
                <span className="text-xs text-zinc-400">No active grade distribution.</span>
              ) : (
                Object.entries(gradeCounts).map(([grade, count]) => (
                  <span 
                    key={grade} 
                    className="text-xs font-semibold px-2.5 py-1 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-lg"
                  >
                    Grade {grade}: {count}
                  </span>
                ))
              )}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/45 text-violet-600 dark:text-violet-400 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Grid: Info Section and Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Tutor Profile Info Box */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-808 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-100 dark:border-zinc-803 pb-3 mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-violet-600" />
              Tutor Profile Overview
            </h2>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-zinc-400 block font-semibold uppercase">Tutor Name</span>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200" id="home-tutor-name">
                  {user?.name}
                </span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-semibold uppercase">Email Handle</span>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                  <Mail className="w-4 h-4 text-zinc-400 inline" />
                  {user?.email || "natan@npt-tutor.com"}
                </span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block font-semibold uppercase">Role Rank</span>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Lead Instructor & Program Administrator
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-803/65">
            <Link 
              to="/dashboard/profile"
              className="w-full py-2.5 px-4 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 rounded-xl text-center block text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              Modify Tutor Profile
            </Link>
          </div>
        </div>

        {/* Quick Classroom Roster Mini List */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-808 rounded-3xl p-6">
          <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-803 pb-3 mb-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-violet-600" />
              Active Classroom Roster
            </h2>
            <Link 
              to="/dashboard/students" 
              className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-semibold"
            >
              Manage All
            </Link>
          </div>

          {totalStudents === 0 ? (
            <div className="py-12 text-center text-zinc-400">
              No students enrolled in your directory. Head to the Students page to register.
            </div>
          ) : (
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {students.slice(0, 4).map(student => (
                <div 
                  key={student.id} 
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-808 hover:border-violet-100 dark:hover:border-violet-950 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold flex items-center justify-center">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{student.name}</h4>
                      <p className="text-[11px] text-zinc-450 dark:text-zinc-400">Grade {student.grade} • ID: #{student.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-2.5 py-1 rounded-lg">
                      Score: {student.progress}%
                    </span>
                    <Link
                      to={`/dashboard/students/${student.id}`}
                      className="text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 font-semibold"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              ))}
              {totalStudents > 4 && (
                <p className="text-xs text-zinc-400 text-center italic mt-2">
                  And {totalStudents - 4} other students...
                </p>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}