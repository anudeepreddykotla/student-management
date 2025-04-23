import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../api/students";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const EditStudentForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getStudentById(id);
        data.dob = data.dob?.slice(0, 10);
        setForm(data);
      } catch (err) {
        toast.error("Unable to load student");
        console.error(err);
        navigate("/students");
      }
    })();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateStudent(id, form);
      toast.success("Student updated successfully!");
      navigate("/students");
    } catch (err) {
      toast.error("Update failed – see console");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!form)
    return (
      <div className="flex h-60 items-center justify-center">
        <span className="animate-pulse text-gray-500">Loading…</span>
      </div>
    );

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-semibold text-indigo-700">Edit Student</h2>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-white p-6 shadow">
        <div>
          <label className="mb-1 block font-medium">Student ID</label>
          <input
            name="studentId"
            value={form.studentId}
            readOnly
            className="w-full cursor-not-allowed rounded border bg-gray-100 px-3 py-2"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
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

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
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

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
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

export default EditStudentForm;
