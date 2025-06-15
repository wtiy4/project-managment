import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Ideas from "../pages/Ideas";
import AddStudent from "../pages/AddStudent";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Teacher from "../pages/Teacher";
import MainPage from "../pages/MainPage";
import Requests from "../pages/Requests";
import Admin from "../pages/Admin";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "Signup", element: <Signup /> },
      { path: "Login", element: <Login /> },
      { path: "Requests", element: <Requests /> },
      { path: "Teacher", element: <Teacher /> },
      { path: "Admin", element: <Admin /> },
      { path: "AddStudent", element: <AddStudent /> },
      { path: "Ideas", element: <Ideas /> },
    ],
  },
]);

function Routers() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default Routers;
