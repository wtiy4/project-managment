import React from "react";

function AddIdeaForm({ newIdea, setNewIdea, handleAddIdea }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-4">
        Submit a New Idea
      </h2>
      <form onSubmit={handleAddIdea} className="space-y-4">
        <textarea
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          placeholder="Share your innovative idea..."
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm resize-none focus:ring-indigo-500 focus:outline-none"
          rows="4"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#5C626D] text-white font-medium py-3 rounded-lg cursor-pointer"
        >
          Submit Idea
        </button>
      </form>
    </section>
  );
}

export default AddIdeaForm;
