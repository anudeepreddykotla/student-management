import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './components/HomePage';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import EditStudentForm from './components/EditStudentForm';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Optional: your styling

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav style={{ padding: '10px', background: '#f0f0f0' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/students" style={{ marginRight: '10px' }}>Student List</Link>
          <Link to="/add">Add Student</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add" element={<AddStudentForm />} />
          <Route path="/edit/:id" element={<EditStudentForm />} />
        </Routes>

        {/* Toast Container */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;