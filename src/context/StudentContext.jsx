import { createContext, useContext, useReducer, useEffect } from 'react';

// Simple initial data
const initialStudents = [
  { id: 1, name: "Abel Tekle", grade: 8, subject: "Mathematics", progress: 85, parentContact: "+251-911-0102", joinedDate: "2026-01-15" },
  { id: 2, name: "Sara Belay", grade: 9, subject: "Physics", progress: 92, parentContact: "+251-912-0304", joinedDate: "2026-02-10" }
];

// Simple reducer
function studentReducer(state, action) {
  switch (action.type) {
    case "ADD_STUDENT":
      const nextId = state.length > 0 ? Math.max(...state.map(s => s.id)) + 1 : 1;
      return [...state, { ...action.payload, id: nextId }];
    case "REMOVE_STUDENT":
      return state.filter(student => student.id !== action.payload);
    case "EDIT_STUDENT":
      return state.map(student => 
        student.id === action.payload.id ? { ...student, ...action.payload } : student
      );
    default:
      return state;
  }
}

// Create context
const StudentContext = createContext(null);

// Provider component
export function StudentProvider({ children }) {
  const [students, dispatch] = useReducer(studentReducer, initialStudents);

  useEffect(() => {
    localStorage.setItem('npt_students', JSON.stringify(students));
  }, [students]);

  return (
    <StudentContext.Provider value={{ students, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
}

// Custom hook
export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
}