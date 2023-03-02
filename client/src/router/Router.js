import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../scenes/home/Home";
import Login from "../scenes/login/Login";
import Registration from "../scenes/registration/Registration";
import AdminPage from "../scenes/admin page/AdminPage";
import StudentPage from "../scenes/student page/StudentPage";
import PublicPage from "../scenes/public page/PublicPage";
import CheckAuth from "../utils/auth.js";
import Courses from "../scenes/student page/Courses";
import Post from "../scenes/student page/Post";
import ClassShedule from "../scenes/public page/ClassShedule";
import NewPost from "../scenes/public page/NewPost";
import CertificateUpload from "../scenes/public page/CertificateUpload";
import AdminPublics from "../scenes/admin page/AdminPublics";
import AdminStudents from "../scenes/admin page/AdminStudent";
import AdminPosts from "../scenes/admin page/AdminPosts";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/admin",
        children: [
          {
            index: true,
            element: (
              <CheckAuth>
                <AdminPage />
              </CheckAuth>
            ),
          },

          {
            path: "/admin/publicList",
            element: (
              <CheckAuth>
                <AdminPublics />
              </CheckAuth>
            ),
          },

          {
            path: "/admin/studentList",
            element: (
              <CheckAuth>
                <AdminStudents />
              </CheckAuth>
            ),
          },

          {
            path: "/admin/adminPosts",
            element: (
              <CheckAuth>
                <AdminPosts />
              </CheckAuth>
            ),
          },
        ],
      },
      {
        path: "/student",
        children: [
          {
            index: true,
            element: (
              <CheckAuth>
                <StudentPage />
              </CheckAuth>
            ),
          },
          {
            path: "/student/courses",
            element: (
              <CheckAuth>
                <Courses />
              </CheckAuth>
            ),
          },
          {
            path: "/student/post",
            element: (
              <CheckAuth>
                <Post />
              </CheckAuth>
            ),
          },
        ],
      },
      {
        path: "/public",
        children: [
          {
            index: true,
            element: (
              <CheckAuth>
                <PublicPage />
              </CheckAuth>
            ),
          },
          {
            path: "/public/sheduleCourses",
            element: (
              <CheckAuth>
                <ClassShedule />
              </CheckAuth>
            ),
          },
          {
            path: "/public/certificateUpload",
            element: (
              <CheckAuth>
                <CertificateUpload />{" "}
              </CheckAuth>
            ),
          },
          {
            path: "/public/addPost",
            element: (
              <CheckAuth>
                <NewPost />
              </CheckAuth>
            ),
          },
        ],
      },
    ],
  },
]);
