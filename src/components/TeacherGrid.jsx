import React from "react";

function TeacherGrid({ teachers }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
        Our Teachers
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <p className="font-semibold text-gray-800">👤 {teacher.name}</p>
            <p className="text-gray-600 mt-1">📧 {teacher.email}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TeacherGrid;
