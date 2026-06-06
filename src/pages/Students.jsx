/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStudents } from '../context/StudentContext';
import { StudentCard } from '../components/StudentCard';
import { 
  Plus, 
  Search, 
  Filter, 
  BookOpen, 
  X, 
  Check, 
  UserPlus
} from 'lucide-react';

/**
 * STUDENTS COMPONENT (Route: /dashboard/students)
 * 
 * Demonstrates:
 * 1. useReducer via Context: Reads `students` and `dispatch` from StudentContext.
 *    - To delete a student, we call: `dispatch({ type: "REMOVE_STUDENT", payload: studentId })`.
 *    - To add a student, we call: `dispatch({ type: "ADD_STUDENT", payload: newStudentInfo })`.
 *    - To edit a student, we call: `dispatch({ type: "EDIT_STUDENT", payload: editedStudentInfo })`.
 * 2. useState for local UI flows:
 *    - Search input query tracking
 *    - Selected grade filter category
 *    - Toggle Add Student Drawer/Form
 *    - Track which student is currently being edited
 */

export function Students() {
  const { students, dispatch } = useStudents();

  // Local state for searching/filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');

  // Local state for registering a new student
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('8');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newProgress, setNewProgress] = useState(80);
  const [newContact, setNewContact] = useState('');

  // Local state for editing an existing student (Bonus Feature #2)
  const [editingStudent, setEditingStudent] = useState(null);
  const [editName, setEditName] = useState('');
  const [editGrade, setEditGrade] = useState('');
  const [editSubject, setEditSubject] = useState('');
  const [editProgress, setEditProgress] = useState(80);
  const [editContact, setEditContact] = useState('');

  // Handle addition trigger
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    // Trigger reducer dispatch action to ADD_STUDENT
    dispatch({
      type: 'ADD_STUDENT',
      payload: {
        name: newName.trim(),
        grade: Number(newGrade),
        subject: newSubject,
        progress: Number(newProgress),
        parentContact: newContact.trim() || '+251-911-0000',
        joinedDate: new Date().toISOString().split('T')[0]
      }
    });

    // Reset local form values
    setNewName('');
    setNewGrade('8');
    setNewSubject('Mathematics');
    setNewProgress(80);
    setNewContact('');
    setIsAdding(false);
  };

  // Handle remove/deletion trigger
  const handleRemoveStudent = (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this student? This operation is persistent.");
    if (confirmed) {
      // Trigger reducer dispatch action to REMOVE_STUDENT
      dispatch({
        type: 'REMOVE_STUDENT',
        payload: id
      });
    }
  };

  // Open Edit student form
  const handleEditClick = (student) => {
    setEditingStudent(student);
    setEditName(student.name);
    setEditGrade(String(student.grade));
    setEditSubject(student.subject || 'Mathematics');
    setEditProgress(student.progress || 75);
    setEditContact(student.parentContact || '');
  };

  // Submit edits
  const handleSaveEdits = (e) => {
    e.preventDefault();
    if (!editingStudent || !editName.trim()) return;

    // Trigger reducer dispatch action to EDIT_STUDENT
    dispatch({
      type: 'EDIT_STUDENT',
      payload: {
        id: editingStudent.id,
        name: editName.trim(),
        grade: Number(editGrade),
        subject: editSubject,
        progress: Number(editProgress),
        parentContact: editContact.trim()
      }
    });

    setEditingStudent(null);
  };

  // Filtering students according to: 1. Search Query input, 2. Grade Filter choice
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (student.subject && student.subject.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesGrade = gradeFilter === 'All' || String(student.grade) === gradeFilter;

    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-8">
      
      {/* Page Heading Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Student Management Roster
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Displaying {filteredStudents.length} of {students.length} total students enrolled.
          </p>
        </div>

        {/* Dynamic ADD Student Button */}
        <button
          id="toggle-add-drawer-btn"
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-violet-600 hover:bg-violet-750 text-white rounded-xl text-sm font-semibold shadow-md active:bg-violet-800 transition-all cursor-pointer select-none"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? 'Cancel' : 'Enroll New Student'}
        </button>
      </div>

      {/* Add Student Slide-Down/Collapsible Form */}
      {isAdding && (
        <div 
          id="add-student-form-container" 
          className="bg-white dark:bg-zinc-900 border border-violet-100 dark:border-violet-950/40 rounded-3xl p-6 shadow-md animate-slide-down"
        >
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="w-5 h-5 text-violet-600" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Enroll New Student</h2>
          </div>

          <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label htmlFor="student-name-field" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Full Name
              </label>
              <input
                id="student-name-field"
                type="text"
                required
                placeholder="e.g. Samuel Kebede"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-1 w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-809 rounded-xl text-sm"
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="student-grade-field" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Current School Grade
              </label>
              <select
                id="student-grade-field"
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                className="mt-1 w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-809 rounded-xl text-sm"
              >
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <label htmlFor="student-subject-field" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Focus Subject
              </label>
              <select
                id="student-subject-field"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="mt-1 w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-809 rounded-xl text-sm"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="General Science">General Science</option>
                <option value="English Literature">English Literature</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <label htmlFor="student-progress-field" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Initial Academic Progress Rating (%)
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  id="student-progress-field"
                  type="range"
                  min="0"
                  max="100"
                  value={newProgress}
                  onChange={(e) => setNewProgress(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-semibold w-10 text-right">{newProgress}%</span>
              </div>
            </div>

            <div className="md:col-span-1">
              <label htmlFor="student-contact-field" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Parent/Guardian Phone Number
              </label>
              <input
                id="student-contact-field"
                type="tel"
                placeholder="e.g. +251-911-0000"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                className="mt-1 w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-809 rounded-xl text-sm"
              />
            </div>

            <div className="md:col-span-1 flex items-end">
              <button
                id="submit-new-student-btn"
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-md active:bg-emerald-800 transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Proceed & Register ID
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Action Center (Bonus Feature #1) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-808 rounded-3xl p-5 flex flex-col md:flex-row items-center gap-4 shadow-sm">
        
        {/* Search Input Bar (Bonus #1) */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input
            id="student-search-input"
            type="text"
            placeholder="Search students by full name or specific syllabus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 focus:bg-white border border-zinc-200 dark:border-zinc-800 focus:border-violet-500 rounded-xl text-sm outline-none transition-all"
          />
          {searchQuery && (
            <button
              id="clear-search-btn"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Grade Multi-Filter Select (Bonus #1) */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-800 pt-3 md:pt-0">
          <Filter className="text-zinc-400 w-4 h-4" />
          <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 whitespace-nowrap">Grade Range:</span>
          <select
            id="grade-filter-select"
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="flex-1 md:flex-none px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-semibold"
          >
            <option value="All">All Grades</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </div>
      </div>

      {/* Edit Student Modal Overlay (Bonus Feature #2) */}
      {editingStudent && (
        <div 
          id="edit-student-modal" 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl max-w-lg w-full mx-4 animate-scale-up">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-105 flex items-center gap-1.5">
                <BookOpen className="w-5 h-5 text-violet-600" />
                Edit Student Details (ID: #{editingStudent.id})
              </h2>
              <button 
                id="close-edit-modal"
                onClick={() => setEditingStudent(null)} 
                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdits} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  id="edit-student-name"
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mt-1 w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-808 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    School Grade
                  </label>
                  <select
                    id="edit-student-grade"
                    value={editGrade}
                    onChange={(e) => setEditGrade(e.target.value)}
                    className="mt-1 w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-808 rounded-xl text-sm text-zinc-800 dark:text-zinc-200"
                  >
                    <option value="6">Grade 6</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Syllabus Subject
                  </label>
                  <select
                    id="edit-student-subject"
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    className="mt-1 w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-808 rounded-xl text-sm text-zinc-800 dark:text-zinc-200"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="General Science">General Science</option>
                    <option value="English Literature">English Literature</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Academic Mastery Percentage ({editProgress}%)
                </label>
                <div className="mt-1.5 flex items-center gap-3">
                  <input
                    id="edit-student-progress"
                    type="range"
                    min="0"
                    max="100"
                    value={editProgress}
                    onChange={(e) => setEditProgress(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-semibold">{editProgress}%</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Parent/Guardian Emergency Contact
                </label>
                <input
                  id="edit-student-contact"
                  type="text"
                  value={editContact}
                  onChange={(e) => setEditContact(e.target.value)}
                  className="mt-1 w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                <button
                  id="cancel-edit-student-btn"
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="flex-1 py-2.5 px-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl text-sm font-semibold transition-colors border border-zinc-200 dark:border-transparent"
                >
                  Discard Edits
                </button>
                <button
                  id="submit-edit-student-btn"
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-750 text-white rounded-xl text-sm font-semibold transition-colors shadow-md"
                >
                  Save Corrections
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Student Cards Grid */}
      {filteredStudents.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-808 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
          <BookOpen className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <h3 className="font-bold text-lg text-zinc-700 dark:text-zinc-400 mb-1">
            No matching students found
          </h3>
          <p className="text-zinc-450 dark:text-zinc-500 text-sm">
            Try correcting your spelling filter, clearing your active search queue, or expanding the grade band criteria.
          </p>
          {(searchQuery || gradeFilter !== 'All') && (
            <button
              id="reset-all-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setGradeFilter('All');
              }}
              className="mt-4 text-xs font-semibold px-4 py-2 bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 rounded-xl transition-all"
            >
              Reset Search Parameters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="student-grid-deck">
          {filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onRemove={handleRemoveStudent}
              onEditClick={handleEditClick}
            />
          ))}
        </div>
      )}

    </div>
  );
}