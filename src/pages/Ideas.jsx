import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import Nav from "../components/Navbar";

function Ideas() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    axios
      .get("https://68219a0e259dad2655afc1ba.mockapi.io/project/ideas")
      .then((res) => {
        setIdeas(res.data);
      });
  }, []);

  const handleRejectIdea = (id) => {
    axios
      .delete(`https://68219a0e259dad2655afc1ba.mockapi.io/project/ideas/${id}`)
      .then(() => {
        setIdeas(ideas.filter((idea) => idea.id !== id));
        Swal.fire(
          "Rejected",
          "The idea has been rejected and removed",
          "success"
        );
      });
  };

  const handleApproveIdea = (id) => {
    Swal.fire("Approved!", "The idea has been approved.", "success");
    axios
      .put(`https://68219a0e259dad2655afc1ba.mockapi.io/project/ideas/${id}`, {
        status: "Approved",
      })
      .then(() => {
        setIdeas(
          ideas.map((idea) =>
            idea.id === id ? { ...idea, status: "Approved" } : idea
          )
        );
      });
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#0e0e1a] text-white font-sans">
        <div className="max-w-7xl mx-auto p-4">
          <div className="w-full my-6 bg-[#1f1f2e] backdrop-blur-md bg-opacity-70 p-6 rounded-xl shadow-xl">
            <div className="mb-4 border-b pb-2">
              <h2 className="text-2xl font-semibold text-center">Ideas</h2>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-white text-left border-separate border-spacing-y-3">
                <thead>
                  <tr className="bg-[#2e2e47]">
                    <th className="px-4 py-3 rounded-l-lg">Idea</th>
                    <th className="px-4 py-3 text-center rounded-r-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ideas.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#3d3d5c] transition duration-200 rounded-lg"
                    >
                      <td className="px-4 py-2">{item.idea}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleApproveIdea(item.id)}
                          className="text-green-400 hover:text-green-300 mr-4"
                        >
                          <FaCheck className="inline-block mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectIdea(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <FaTimes className="inline-block mr-1" />
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ideas;
