import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/students/${id}`);
        setFormData(res.data);
      } catch (error) {
        toast.error('Failed to load student data');
      }
    };
    fetchStudent();
  }, [id]);

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
      await axios.put(`http://localhost:3001/students/${id}`, formData);
      toast.success('Student updated successfully');
      navigate('/students');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Update failed');
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Edit Student</h2>
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
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudentForm;