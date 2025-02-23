import { createBrowserRouter } from "react-router-dom";
import Main from "../MainLayout/Main";
import AllTask from "../Pages/AllTask";
import CompletedTask from "../Pages/CompletedTask";
import Home from "../Pages/Home";
import ImportantTask from "../Pages/ImportantTask";
import IncompletedTask from "../Pages/IncompletedTask";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        children: [
          {
            path: "/allTask",
            element: <AllTask></AllTask>,
          },
          {
            path: "/importentTask",
            element: <ImportantTask></ImportantTask>,
          },
          {
            path: "/completedTask",
            element: <CompletedTask></CompletedTask>,
          },
          {
            path: "/incompletedTask",
            element: <IncompletedTask></IncompletedTask>,
          },
        ],
      },
    ],
  },
  {
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
]);
