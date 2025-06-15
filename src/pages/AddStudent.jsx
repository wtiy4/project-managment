import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Nav from "../components/Navbar";

function AddUser() {
  const [userType, setUserType] = useState("student");
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    teacher: "",
  });
  const [teacherData, setTeacherData] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = userType === "student" ? studentData : teacherData;
    const url =
      userType === "student"
        ? "https://68219a0e259dad2655afc1ba.mockapi.io/project/students"
        : "https://684e4cb3f0c9c9848d27c816.mockapi.io/teachers";

    try {
      await axios.post(url, dataToSend);
      Swal.fire(
        "تمت الإضافة!",
        `${userType === "student" ? "الطالب" : "المعلم"} ${
          dataToSend.name
        } تمت إضافته بنجاح!`,
        "success"
      );
      userType === "student"
        ? setStudentData({ name: "", email: "", teacher: "" })
        : setTeacherData({ name: "", email: "" });
      navigate("/Admin");
    } catch (error) {
      Swal.fire("خطأ!", "حدث خطأ أثناء الإرسال، حاول مرة أخرى.", "error");
    }
  };

  const renderInput = (label, value, setValue, name, type = "text") => (
    <div>
      <label className="text-sm text-white mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder={`أدخل ${label}`}
        required
        name={name}
      />
    </div>
  );

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#0e0e1a] flex items-center justify-center px-4 py-10 text-white">
        <div className="w-full max-w-xl bg-[#1f1f2e]/80 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">
              {userType === "student" ? "إضافة طالب" : "إضافة معلم"}
            </h2>
            <select
              className="bg-white/10 text-white px-4 py-2 rounded-md border border-white/20 focus:outline-none"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="student">طالب</option>
              <option value="teacher">معلم</option>
            </select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {userType === "student" ? (
              <>
                {renderInput(
                  "اسم الطالب",
                  studentData.name,
                  (val) => setStudentData({ ...studentData, name: val }),
                  "name"
                )}
                {renderInput(
                  "البريد الإلكتروني",
                  studentData.email,
                  (val) => setStudentData({ ...studentData, email: val }),
                  "email",
                  "email"
                )}
                {renderInput(
                  "المعلم المسؤول",
                  studentData.teacher,
                  (val) => setStudentData({ ...studentData, teacher: val }),
                  "teacher"
                )}
              </>
            ) : (
              <>
                {renderInput(
                  "اسم المعلم",
                  teacherData.name,
                  (val) => setTeacherData({ ...teacherData, name: val }),
                  "name"
                )}
                {renderInput(
                  "البريد الإلكتروني",
                  teacherData.email,
                  (val) => setTeacherData({ ...teacherData, email: val }),
                  "email",
                  "email"
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition py-3 rounded-xl font-semibold tracking-wide"
            >
              {userType === "student" ? "سجّل الطالب" : "سجّل المعلم"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddUser;
