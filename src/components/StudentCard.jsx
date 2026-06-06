/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit2, ChevronRight, GraduationCap } from 'lucide-react';

/**
 * PROPS AND COMPONENT DESIGN:
 * Explain: In React, "props" (short for properties) allow a parent component to pass custom data,
 * objects, or function callbacks down to child components.
 * 
 * Rules of Props:
 * 1. Read-Only: A component must never modify its own props.
 * 2. Unidirectional: Data flows one-way from parent to child.
 */

export function StudentCard({ student, onRemove, onEditClick }) {
  // Extract student details for ease of rendering
  const { id, name, grade, subject, progress = 75 } = student;

  // Let's decide a progress theme color based on progress percentage
  const getProgressColor = (percent) => {
    if (percent >= 85) return 'bg-emerald-500';
    if (percent >= 70) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-150">
                {name}
              </h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Grade {grade} • {subject || "General"}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-150">
            {/* Edit Button */}
            <button
              id={`edit-student-${id}`}
              onClick={() => onEditClick(student)}
              className="p-1.5 text-zinc-500 hover:text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              title="Edit Student Info"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            {/* Delete Button */}
            <button
              id={`delete-student-${id}`}
              onClick={() => onRemove(id)}
              className="p-1.5 text-zinc-500 hover:text-rose-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              title="Remove Student"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bonus Feature: Student Progress Tracker bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-zinc-500 dark:text-zinc-400">Academy Performance</span>
            <span className="text-zinc-700 dark:text-zinc-300">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getProgressColor(progress)}`} 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
        <span className="text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold px-2 py-0.5 rounded-md">
          ID: #{id}
        </span>
        
        {/* React Router Link: Link directs us to detailed sub-views without a full page reload */}
        <Link
          id={`view-details-${id}`}
          to={`/dashboard/students/${id}`}
          className="flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
        >
          View Details
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}