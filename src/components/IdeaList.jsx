import React from "react";

function IdeaList({ ideas }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-4">Approved Ideas</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {ideas.length > 0 ? (
          ideas.map((item) => (
            <div
              key={item.id}
              className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 shadow-sm"
            >
              <p className="text-lg font-medium text-black">{item.idea}</p>
              <p className="text-sm text-green-600 mt-2">
                Status: {item.status}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No matching ideas found.</p>
        )}
      </div>
    </section>
  );
}

export default IdeaList;
