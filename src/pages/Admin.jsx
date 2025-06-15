import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus, FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Nav from "../components/Navbar";

function Admin() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStudentPage, setCurrentStudentPage] = useState(0);
  const [currentTeacherPage, setCurrentTeacherPage] = useState(0);
  const rowsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://68219a0e259dad2655afc1ba.mockapi.io/project/students")
      .then((res) => {
        setStudents(res.data);
      });
    axios
      .get("https://684e4cb3f0c9c9848d27c816.mockapi.io/teachers")
      .then((res) => {
        setTeachers(res.data);
      });
  }, []);

  const paginate = (data, currentPage) => {
    const start = currentPage * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  };

  const filteredData = (data) =>
    data.filter((item) =>
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const confirmDelete = (type, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This will permanently delete the ${type}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const url =
          type === "student"
            ? `https://68219a0e259dad2655afc1ba.mockapi.io/project/students/${id}`
            : `https://684e4cb3f0c9c9848d27c816.mockapi.io/teachers/${id}`;
        axios.delete(url).then(() => {
          type === "student"
            ? setStudents((prev) => prev.filter((x) => x.id !== id))
            : setTeachers((prev) => prev.filter((x) => x.id !== id));
          Swal.fire("Deleted!", `${type} has been deleted.`, "success");
        });
      }
    });
  };

  const renderTable = (data, type) => (
    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-10">
      <h2 className="text-white text-xl font-semibold mb-4 border-b border-white/20 pb-2">
        {type === "student" ? "Students List" : "Teachers List"}
      </h2>
      <table className="w-full text-white text-sm">
        <thead>
          <tr className="bg-white/10 text-left">
            <th className="p-3 rounded-tl-lg">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3 text-center rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginate(
            filteredData(data),
            type === "student" ? currentStudentPage : currentTeacherPage
          ).map((item) => (
            <tr key={item.id} className="hover:bg-white/10 transition">
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.email}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => confirmDelete(type, item.id)}
                  className="text-red-400 hover:text-red-300 cursor-pointer"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() =>
            type === "student"
              ? setCurrentStudentPage((prev) => Math.max(prev - 1, 0))
              : setCurrentTeacherPage((prev) => Math.max(prev - 1, 0))
          }
          className="bg-white/10 text-white p-2 rounded hover:bg-white/20"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() =>
            type === "student"
              ? setCurrentStudentPage((prev) =>
                  prev + 1 < Math.ceil(filteredData(data).length / rowsPerPage)
                    ? prev + 1
                    : prev
                )
              : setCurrentTeacherPage((prev) =>
                  prev + 1 < Math.ceil(filteredData(data).length / rowsPerPage)
                    ? prev + 1
                    : prev
                )
          }
          className="bg-white/10 text-white p-2 rounded hover:bg-white/20"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] to-[#1b1b2f] text-white">
      <Nav />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-full max-w-xs">
            <CiSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by email..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => navigate("/addstudent")}
            className="flex items-center bg-gradient-to-tr from-blue-700 to-indigo-500 hover:from-blue-600 hover:to-indigo-400 text-white px-4 py-2 rounded-lg shadow-lg transition ml-4 cursor-pointer"
          >
            <FaPlus className="mr-2 " /> Add Entry
          </button>
        </div>

        {renderTable(students, "student")}
        {renderTable(teachers, "teacher")}
      </div>
    </div>
  );
}

export default Admin;
