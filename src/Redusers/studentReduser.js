/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * REDUCERS IN REACT:
 * Explain: useReducer is a React hook used for complex state logic, similar to Redux.
 * It takes a "reducer" function and an initial state.
 * 
 * The reducer is a PURE function: `(state, action) => newState`.
 * - "state": representing the current state of our data.
 * - "action": an object describing what to do (action.type) and containing any data (action.payload).
 * 
 * Immutability: We MUST return a NEW state object. We never modify the original state directly!
 */

// Initial students to provide pre-populated data for a better user experience
export const initialStudents = [
  { id: 1, name: "Abel Tekle", grade: 8, subject: "Mathematics", progress: 85, parentContact: "+251-911-0102", joinedDate: "2026-01-15" },
  { id: 2, name: "Sara Belay", grade: 9, subject: "Physics", progress: 92, parentContact: "+251-912-0304", joinedDate: "2026-02-10" },
  { id: 3, name: "John Doe", grade: 8, subject: "Chemistry", progress: 78, parentContact: "+251-913-0506", joinedDate: "2026-03-01" },
  { id: 4, name: "Betty Kebede", grade: 10, subject: "Biology", progress: 88, parentContact: "+251-914-0708", joinedDate: "2026-03-12" },
  { id: 5, name: "Michael Wolde", grade: 11, subject: "Mathematics", progress: 65, parentContact: "+251-915-0909", joinedDate: "2026-04-05" }
];

export function studentReducer(state, action) {
  switch (action.type) {
    /**
     * CASE ADD_STUDENT:
     * We create a new array, generating a unique ID and appending the new student.
     * Always treat state as immutable (do not use state.push()!).
     */
    case "ADD_STUDENT": {
      const nextId = state.length > 0 ? Math.max(...state.map(s => s.id)) + 1 : 1;
      const newStudent = {
        id: nextId,
        name: action.payload.name,
        grade: Number(action.payload.grade),
        subject: action.payload.subject || "General Science",
        progress: action.payload.progress !== undefined ? action.payload.progress : 75,
        parentContact: action.payload.parentContact || "N/A",
        joinedDate: action.payload.joinedDate || new Date().toISOString().split('T')[0]
      };
      return [...state, newStudent];
    }

    /**
     * CASE REMOVE_STUDENT:
     * Filters out the student with the matching ID, returning a brand new list.
     */
    case "REMOVE_STUDENT": {
      return state.filter(student => student.id !== action.payload);
    }

    /**
     * CASE EDIT_STUDENT (Bonus Feature):
     * Maps through current students and updates the matching student's details, preserving other students.
     */
    case "EDIT_STUDENT": {
      return state.map(student => 
        student.id === action.payload.id ? { ...student, ...action.payload } : student
      );
    }

    // Default returns existing state if action type is unrecognized
    default:
      return state;
  }
}