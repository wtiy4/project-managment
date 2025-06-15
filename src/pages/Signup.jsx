import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // تأكد من استخدام react-router-dom
import axios from "axios";
import Swal from "sweetalert2";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role] = useState("Student");

  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;

    if (!email) {
      isValid = false;
      Swal.fire({
        title: "Error!",
        text: "Email is required",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      isValid = false;
      Swal.fire({
        title: "Error!",
        text: "Email is invalid",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } else if (!email.includes("tuwaiq")) {
      isValid = false;
      Swal.fire({
        title: "Error!",
        text: 'Email must contain "tuwaiq"',
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
    if (!password) {
      isValid = false;
      Swal.fire({
        title: "Error!",
        text: "Password is required",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } else if (password.length < 4) {
      isValid = false;
      Swal.fire({
        title: "Error!",
        text: "Password should be at least 4 characters",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
    if (!username) {
      isValid = false;
      Swal.fire({
        title: "Error!",
        text: "Username is required",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } else if (username.length < 4) {
      isValid = false;
      Swal.fire({
        title: "Error!",
        text: "Username must be at least 4 characters long.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post("https://684e4cb3f0c9c9848d27c816.mockapi.io/register", {
          email,
          password,
          username,
          role,
        })
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Registration successful!",
            icon: "success",
            confirmButtonText: "Okay",
          });
          navigate("/login");
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-slate-300 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-500 relative">
      {/* دوائر ضبابية زخرفية */}
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-indigo-400 dark:bg-indigo-700 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-purple-500 dark:bg-purple-800 opacity-20 rounded-full blur-3xl"></div>

      <div className="bg-white dark:bg-gray-900 max-w-md w-full p-8 rounded-xl shadow-lg relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@Tuwaiq.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
