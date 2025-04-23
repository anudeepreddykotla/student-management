import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStudents, deleteStudent } from "../api/students"; 
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import CSS

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getStudents();         
        setStudents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    // Show confirmation toast before deleting
    const confirmDelete = window.confirm("Delete this student?");
    if (confirmDelete) {
      try {
        await deleteStudent(id);                         
        setStudents((prev) => prev.filter((s) => s._id !== id));
        toast.success('Student deleted successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } catch (err) {
        toast.error('Delete failed – see console', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <span className="animate-pulse text-gray-500">Loading…</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-indigo-700">
          Student Records
        </h2>
        <button
          onClick={() => navigate("/students/add")}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          ➕ Add Student
        </button>
      </header>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-indigo-50">
            <tr>
              {[
                "ID",
                "First Name",
                "Last Name",
                "Email",
                "DOB",
                "Dept.",
                "Enroll Year",
                "Active",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2 text-left font-semibold text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {students.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-3 py-2 font-mono">{s.studentId}</td>
                <td className="px-3 py-2">{s.firstName}</td>
                <td className="px-3 py-2">{s.lastName}</td>
                <td className="px-3 py-2">
                  <a
                    href={`mailto:${s.email}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {s.email}
                  </a>
                </td>
                <td className="px-3 py-2">{new Date(s.dob).toLocaleDateString()}</td>
                <td className="px-3 py-2">{s.department}</td>
                <td className="px-3 py-2">{s.enrollmentYear}</td>
                <td className="px-3 py-2">{s.isActive ? "✅" : "❌"}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link
                      to={`/students/${s._id}/edit`}
                      className="rounded border border-indigo-600 px-3 py-1 text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="rounded border border-red-600 px-3 py-1 text-red-600 transition hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Toastify container for showing notifications */}
      <ToastContainer />
    </div>
  );
};

export default StudentList;
