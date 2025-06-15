import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-[#1f1f2e]/70 backdrop-blur-md text-white shadow-md rounded-b-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide text-white">
          Admin Panel
        </div>

        <div className="hidden md:flex space-x-6 text-base font-medium">
          <Link
            to="/admin"
            className="hover:text-[#7c8ffe] transition duration-300"
          >
            Students
          </Link>
          <Link
            to="/ideas"
            className="hover:text-[#7c8ffe] transition duration-300"
          >
            Ideas
          </Link>
          <Link
            to="/addstudent"
            className="hover:text-[#7c8ffe] transition duration-300"
          >
            Add Student
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-4 py-2 rounded-full shadow hover:shadow-lg t text-sm md:text-base cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Nav;
