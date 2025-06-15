import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 via-indigo-200 to-indigo-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="relative w-full max-w-4xl mx-auto px-6 py-16 rounded-2xl shadow-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
        {/* Decorative Circles */}
        <div className="absolute w-36 h-36 bg-indigo-300 dark:bg-indigo-600 opacity-30 rounded-full -top-10 -left-10 blur-2xl"></div>
        <div className="absolute w-24 h-24 bg-purple-400 dark:bg-purple-700 opacity-20 rounded-full -bottom-8 -right-8 blur-2xl"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Students' graduation's projects
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            A simple site for managing students' graduation's projects by their
            teachers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/Login">
              <button className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-300 cursor-pointer">
                Log In to Your Account
              </button>
            </Link>
            <Link to="/Signup">
              <button className="w-full sm:w-auto px-6 py-3 border-2 border-indigo-600 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium hover:bg-indigo-100 dark:hover:bg-gray-800 transition duration-300 cursor-pointer">
                Create New Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
