/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useStudents } from '../context/StudentContext';
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Save, 
  AlertCircle,
  Users
} from 'lucide-react';

/**
 * ATTENDANCE COMPONENT (Route: /dashboard/attendance)
 * 
 * Demonstrates:
 * 1. Array Mapping: Iterates over the list of registered students dynamically!
 *    This ensures that when you add/remove students on the Students page,
 *    the Attendance list updates automatically in perfect consensus.
 * 2. useState for local record compilation:
 *    Stores the selected status (Present, Absent, Late) for each student.
 */

export function Attendance() {
  const { students } = useStudents();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Local state representing attendance sheet
  const [attendanceSheet, setAttendanceSheet] = useState(() => {
    // By default, initialize all enrolled students as 'Present'
    const initialSheet = {};
    students.forEach(student => {
      initialSheet[student.id] = 'Present';
    });
    return initialSheet;
  });

  const [recordedHistory, setRecordedHistory] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Toggle dynamic status clicks
  const handleStatusChange = (studentId, status) => {
    setAttendanceSheet(prev => ({
      ...prev,
      [studentId]: status
    }));
    setSaveSuccess(false);
  };

  // Submit and save attendance list locally
  const handleSaveAttendance = () => {
    setRecordedHistory(prev => [
      { date: new Date().toLocaleDateString(), sheet: { ...attendanceSheet } },
      ...prev
    ]);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Derive simple class ratio stats
  const totalStudents = students.length;
  const presentCount = Object.values(attendanceSheet).filter(s => s === 'Present').length;
  const absentCount = Object.values(attendanceSheet).filter(s => s === 'Absent').length;
  const lateCount = Object.values(attendanceSheet).filter(s => s === 'Late').length;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-808 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Attendance Log Sheet
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4 text-violet-600" />
            Active Session: {currentDate}
          </p>
        </div>

        {totalStudents > 0 && (
          <button
            id="save-attendance-btn"
            onClick={handleSaveAttendance}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-violet-600 hover:bg-violet-750 text-white font-semibold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            File Sessions Logs
          </button>
        )}
      </div>

      {saveSuccess && (
        <div id="attendance-success-banner" className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-950 text-emerald-800 dark:text-emerald-400 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Attendance log records submitted successfully! Entries appended to local session histories.
        </div>
      )}

      {totalStudents === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-805 rounded-3xl max-w-lg mx-auto p-6">
          <Users className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <h3 className="font-bold text-zinc-700 dark:text-zinc-400">Roster Empty</h3>
          <p className="text-zinc-400 text-sm mt-1 mb-4">
            Register students in your Student Management Directory to trigger interactive roll-call records.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Attendance Marking List */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-808 rounded-3xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-100 dark:border-zinc-808 flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-450 uppercase tracking-widest">Student Roll</span>
                <span className="text-xs font-bold text-zinc-450 uppercase tracking-widest">Mark Status</span>
              </div>

              <div className="divide-y divide-zinc-100 dark:divide-zinc-808/80">
                {students.map(student => {
                  const activeStatus = attendanceSheet[student.id] || 'Present';

                  return (
                    <div 
                      key={student.id} 
                      className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs flex items-center justify-center">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-830 dark:text-zinc-100">{student.name}</h4>
                          <p className="text-[11px] text-zinc-400">Grade {student.grade} • ID: #{student.id}</p>
                        </div>
                      </div>

                      {/* Status Selector Choice Buttons */}
                      <div className="flex bg-zinc-100/60 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200/40 dark:border-zinc-850">
                        <button
                          id={`attn-present-${student.id}`}
                          onClick={() => handleStatusChange(student.id, 'Present')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                            activeStatus === 'Present'
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                          }`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Present
                        </button>
                        
                        <button
                          id={`attn-absent-${student.id}`}
                          onClick={() => handleStatusChange(student.id, 'Absent')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                            activeStatus === 'Absent'
                              ? 'bg-rose-500 text-white shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Absent
                        </button>

                        <button
                          id={`attn-late-${student.id}`}
                          onClick={() => handleStatusChange(student.id, 'Late')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                            activeStatus === 'Late'
                              ? 'bg-amber-500 text-white shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          Late
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Attendance Stats Cards column */}
          <div className="space-y-6 col-span-1">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-808 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-101 border-b border-zinc-55 pb-3 flex items-center gap-1">
                <AlertCircle className="w-5 h-5 text-violet-600" />
                Session Stat Summary
              </h3>

              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-medium">Checked Class List:</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">{totalStudents} Students</span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-medium">Total Present Ratio:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{presentCount} Present</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-medium">Total Absent Ratio:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">{absentCount} Absent</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-medium">Lateness Counter:</span>
                  <span className="font-bold text-amber-500">{lateCount} Late</span>
                </div>
              </div>

              {/* Attendance health visual bar */}
              <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-850 rounded-full mt-6 overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: `${(presentCount / totalStudents) * 100}%` }} title="Present" />
                <div className="bg-amber-500 h-full" style={{ width: `${(lateCount / totalStudents) * 100}%` }} title="Late" />
                <div className="bg-rose-500 h-full" style={{ width: `${(absentCount / totalStudents) * 100}%` }} title="Absent" />
              </div>
            </div>

            {/* Attendance Filing Histories */}
            {recordedHistory.length > 0 && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-808 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-xs text-zinc-400 uppercase tracking-widest pb-2 border-b">
                  Historian Logs
                </h3>
                <div className="space-y-3 max-h-[140px] overflow-y-auto pr-1">
                  {recordedHistory.map((log, ix) => {
                    const lPres = Object.values(log.sheet).filter(s => s === 'Present').length;
                    const lTot = Object.keys(log.sheet).length;
                    return (
                      <div key={ix} className="flex justify-between items-center text-xs p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{log.date}</span>
                        <span className="text-zinc-500 font-medium">
                          Roster checklist ratio {lPres}/{lTot} Present
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}