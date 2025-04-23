import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
    <section className="w-full max-w-2xl sm:max-w-xl md:max-w-2xl lg:max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="mb-4 text-center text-3xl font-semibold tracking-tight text-indigo-700">
        Student Management System
      </h1>

      <p className="mb-8 text-center text-gray-600">
        Quickly add students or review existing records with the buttons below.
      </p>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        <Link
          to="/students/add"
          className="inline-block rounded-xl border border-indigo-600 bg-indigo-600 px-6 py-3 text-center text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          ➕ Add Student
        </Link>

        <Link
          to="/students"
          className="inline-block rounded-xl border border-gray-300 bg-white px-6 py-3 text-center text-gray-800 transition hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
        >
          📋 View Students
        </Link>
      </div>
    </section>
  </main>
);

export default HomePage;
