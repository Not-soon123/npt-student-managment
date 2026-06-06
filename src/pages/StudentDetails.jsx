/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';
import { 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Trash2, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Clock 
} from 'lucide-react';

/**
 * STUDENT DETAILS PAGE (Route: /dashboard/students/:id)
 * 
 * Demonstrates:
 * 1. useParams Hook:
 *    Explain: React Router allows variables inside URLs, defined as paths like `/students/:id`.
 *    The `useParams()` hook inspects the active browser URL path, extracts the key parameters (like "id"),
 *    and delivers it inside a nice key-value object (e.g., `{ id: "3" }`).
 * 2. useNavigate Hook:
 *    Allows the "Back To Directory" button to steer the client back or undo routes in a single line.
 * 3. Array Searching: Finds the specific student by scanning the unified dispatch reducer array.
 */

export function StudentDetails() {
  // useParams: Extract the variable parameter "id" from the route definition
  const { id } = useParams();
  
  const { students, dispatch } = useStudents();
  const navigate = useNavigate();

  // Convert extracted string path parameter to integer ID
  const studentId = Number(id);

  // Scan current records for matching student
  const student = students.find(s => s.id === studentId);

  // Handle deletion inside details page
  const handleDeleteSelf = () => {
    const confirm = window.confirm(`Really delete ${student?.name || 'this student'}? This item will be wiped permanently.`);
    if (confirm && student) {
      dispatch({ type: 'REMOVE_STUDENT', payload: student.id });
      // Redirect back to students roster since the current student no longer exists
      navigate('/dashboard/students');
    }
  };

  // If student record isn't found
  if (!student) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-805 p-8 rounded-3xl shadow-sm">
        <BookOpen className="w-16 h-16 text-rose-500/80 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-50 mb-2">Student Directory Error</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
          The requested student reference (ID #{id}) does not exist inside your private records database. It might have been deleted or not registered yet.
        </p>
        <Link 
          to="/dashboard/students"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-violet-600 hover:bg-violet-750 text-white font-semibold text-sm rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Dynamic Navigation Row / Back Button */}
      <div className="flex items-center justify-between">
        <button
          id="back-to-roster-btn"
          onClick={() => navigate('/dashboard/students')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students Directory
        </button>

        <button
          id="detail-delete-btn"
          onClick={handleDeleteSelf}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-rose-100 dark:border-rose-950/30 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Expel Student
        </button>
      </div>

      {/* Main Student Sheet Banner Grid */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-808 rounded-3xl shadow-sm overflow-hidden">
        
        {/* Banner header accent */}
        <div className="bg-gradient-to-r from-violet-600/10 via-indigo-600/10 to-transparent p-8 border-b border-zinc-100 dark:border-zinc-808 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-600 text-white font-black text-xl flex items-center justify-center">
              {student.name.charAt(0)}
            </div>
            <div>
              <span className="text-[11px] bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400 font-bold px-2.5 py-1 rounded-md mb-1.5 inline-block">
                STUDENT ID: #{student.id}
              </span>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 leading-tight">
                {student.name}
              </h1>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-4 py-3 text-center min-w-[80px]">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-semibold block">Academic Grade</span>
              <span className="text-lg font-bold text-zinc-800 dark:text-zinc-100">{student.grade}</span>
            </div>
            <div className="bg-white/50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-4 py-3 text-center min-w-[80px]">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-semibold block">Course Progress</span>
              <span className="text-lg font-bold text-violet-650 dark:text-violet-400">{student.progress || 75}%</span>
            </div>
          </div>
        </div>

        {/* Info Grid Details */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Section A: Registry details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-50 dark:border-zinc-800 pb-2 mb-3">
              Enrollment Details
            </h3>
            
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-zinc-405 dark:text-zinc-500" />
              <div>
                <span className="text-[11px] text-zinc-400 block leading-tight">Enrollment Topic</span>
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{student.subject || "General Science"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-zinc-405 dark:text-zinc-500" />
              <div>
                <span className="text-[11px] text-zinc-400 block leading-tight">Joined Class Date</span>
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{student.joinedDate || "2026-01-15"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-zinc-405 dark:text-zinc-500" />
              <div>
                <span className="text-[11px] text-zinc-400 block leading-tight">Parent/Guardian Emergency Contact</span>
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{student.parentContact || 'Not Specified'}</span>
              </div>
            </div>
          </div>

          {/* Section B: Academy Progress card */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-50 dark:border-zinc-800 pb-2 mb-3">
              Learning Tracker
            </h3>

            <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-808 flex flex-col justify-between h-[130px]">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-zinc-500">Mastery Assessment Score</span>
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{student.progress || 75}%</span>
                <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-violet-600 rounded-full transition-all" 
                    style={{ width: `${student.progress || 75}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section C: Action list */}
          <div className="space-y-4 lg:col-span-1 md:col-span-2">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-50 dark:border-zinc-800 pb-2 mb-3">
              Lesson Agenda Notes
            </h3>
            
            <div className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-805">
                <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-0.5">Lesson Focus:</span>
                Student is currently reviewing basic principles, problem-solving practices and core theorems. Keep assigning homework quizzes.
              </div>
              <p className="italic text-[10px] text-zinc-400 text-center leading-normal">
                Class logged time: Tuesday • Private Slot 04:00 PM
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}