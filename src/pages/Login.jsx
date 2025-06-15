import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // تأكد من أنك تستخدم react-router-dom
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .get("https://684e4cb3f0c9c9848d27c816.mockapi.io/register")
      .then((res) => {
        const users = res.data;
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          localStorage.setItem("loggedInUser", JSON.stringify(user));

          if (user.role === "admin") navigate("/Admin");
          else if (user.role === "Teacher") navigate("/Teacher");
          else if (user.role === "Student") navigate("/Requests");
        } else {
          Swal.fire({
            title: "Login Failed",
            text: "Invalid email or password!",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-slate-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 relative">
        {/* Decorative Circles */}
        <div className="absolute -top-8 -left-8 w-20 h-20 bg-indigo-400 dark:bg-indigo-700 opacity-30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-purple-500 dark:bg-purple-800 opacity-20 rounded-full blur-2xl"></div>

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Log in
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="####@tuwaiq.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
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

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link to="/Signup">
            <span className="text-indigo-600 hover:underline cursor-pointer">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
