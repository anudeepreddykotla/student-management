import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../api/students";
import { toast } from "react-toastify";  // Import the toast function
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const empty = {
  studentId: "",
  firstName: "",
  lastName: "",
  email: "",
  dob: "",
  department: "",
  enrollmentYear: new Date().getFullYear(),
  isActive: true,
};

const AddStudentForm = () => {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addStudent(form);
      toast.success("Student added successfully!");  // Success toast
      navigate("/students");
    } catch (err) {
      toast.error("Save failed – check console");  // Error toast
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-semibold text-indigo-700">
        Add Student
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl bg-white p-6 shadow"
      >
        {/* ID */}
        <div>
          <label className="mb-1 block font-medium">Student ID</label>
          <input
            required
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            pattern="[A-Za-z0-9]+"
          />
        </div>

        {/* First / Last */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium">First Name</label>
            <input
              required
              minLength={2}
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Last Name</label>
            <input
              required
              minLength={2}
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        {/* Email / DOB */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium">Email</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Date of Birth</label>
            <input
              required
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        {/* Dept / Enroll Year */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium">Department</label>
            <input
              required
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Enrollment Year</label>
            <input
              required
              type="number"
              min={2000}
              max={new Date().getFullYear()}
              name="enrollmentYear"
              value={form.enrollmentYear}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        {/* Active */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="h-4 w-4"
          />
          Active student
        </label>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/students")}
            className="rounded border border-gray-400 px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
