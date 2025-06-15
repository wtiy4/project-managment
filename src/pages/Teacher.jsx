import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useParams } from "react-router";
import Nav from "../components/Navbar";

function Teacher() {
  const [students, setStudents] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://68219a0e259dad2655afc1ba.mockapi.io/project/students?teacherId=${id}`
      )
      .then((res) => setStudents(res.data));

    axios
      .get(
        `https://68219a0e259dad2655afc1ba.mockapi.io/project/ideas?teacherId=${id}`
      )
      .then((res) =>
        setIdeas(res.data.filter((idea) => idea.status === "Pending"))
      );
  }, [id]);

  const handleApproveIdea = (ideaId) => {
    Swal.fire({
      title: "هل أنت متأكد من الموافقة على هذه الفكرة؟",
      showCancelButton: true,
      confirmButtonText: "نعم، وافق",
      cancelButtonText: "إلغاء",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .put(
            `https://68219a0e259dad2655afc1ba.mockapi.io/project/ideas/${ideaId}`,
            {
              status: "Approved",
            }
          )
          .then(() => {
            setIdeas((prev) => prev.filter((idea) => idea.id !== ideaId));
            Swal.fire(
              "تمت الموافقة!",
              "تمت الموافقة على الفكرة بنجاح.",
              "success"
            );
          });
      }
    });
  };

  const handleRejectIdea = (ideaId) => {
    Swal.fire({
      title: "سبب الرفض",
      input: "text",
      inputPlaceholder: "اكتب سبب الرفض هنا",
      showCancelButton: true,
      confirmButtonText: "رفض",
    }).then((res) => {
      if (res.isConfirmed && res.value) {
        axios
          .put(
            `https://68219a0e259dad2655afc1ba.mockapi.io/project/ideas/${ideaId}`,
            {
              status: "Rejected",
              rejectionReason: res.value,
            }
          )
          .then(() => {
            setIdeas((prev) => prev.filter((idea) => idea.id !== ideaId));
            Swal.fire("تم الرفض!", "تم رفض الفكرة مع ذكر السبب.", "error");
          });
      }
    });
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#0f172a] px-4 py-10 text-white flex flex-col items-center">
        <div className="w-full max-w-6xl bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-8">
            لوحة تحكم المعلم
          </h1>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-2">
              الطلاب تحت إدارتك
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-center bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
                <thead className="bg-gradient-to-r from-[#676ea1] to-[#2B39A0] text-white">
                  <tr>
                    <th className="p-4">اسم الطالب</th>
                    <th className="p-4">البريد الإلكتروني</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item) => (
                    <tr key={item.id} className="hover:bg-white/10 transition">
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">{item.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-2">
              أفكار الطلاب بانتظار الموافقة
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-center bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
                <thead className="bg-gradient-to-r from-[#676ea1] to-[#2B39A0] text-white">
                  <tr>
                    <th className="p-4">الفكرة</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {ideas.map((item) => (
                    <tr key={item.id} className="hover:bg-white/10 transition">
                      <td className="p-4">{item.idea}</td>
                      <td className="p-4">{item.status}</td>
                      <td className="p-4 space-x-2">
                        <button
                          onClick={() => handleApproveIdea(item.id)}
                          className="text-green-500 hover:text-green-600 font-semibold"
                        >
                          <FaCheck className="inline-block mr-1" />
                          موافقة
                        </button>
                        <button
                          onClick={() => handleRejectIdea(item.id)}
                          className="text-red-500 hover:text-red-600 font-semibold"
                        >
                          <FaTimes className="inline-block mr-1" />
                          رفض
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {ideas.length === 0 && (
                <p className="text-center text-white/70 mt-6">
                  لا توجد أفكار بانتظار الموافقة حالياً.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacher;
