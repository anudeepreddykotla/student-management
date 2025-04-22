import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import HomePage from './pages/Home';
import StudentList from './pages/StudentList';
import AddStudentForm from './pages/AddStudentForm';
import EditStudentForm from './pages/EditStudentForm';
import './App.css'; // Import your CSS file

function App() {
  // Example function to show toast notification
  const showSuccessToast = () => {
    toast.success("Student added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored", // Optional to apply themed toast
    });
  };

  const showErrorToast = () => {
    toast.error("There was an error. Please try again.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/add" element={<AddStudentForm />} />
        <Route path="/students/:id/edit" element={<EditStudentForm />} />
      </Routes>

      {/* Add ToastContainer here to show the notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;