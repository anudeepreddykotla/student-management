import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddStudentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/students', formData);
      toast.success('Student added successfully');
      navigate('/students');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add student');
    }
  };

  return (
    <div className="container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          key !== '_id' && (
            <div key={key}>
              <label>{key}:</label>
              <input
                type={key === 'dob' ? 'date' : key === 'isActive' ? 'checkbox' : 'text'}
                name={key}
                value={key === 'isActive' ? undefined : formData[key]}
                checked={key === 'isActive' ? formData[key] : undefined}
                onChange={handleChange}
                required={key !== 'isActive'}
              />
            </div>
          )
        ))}
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;