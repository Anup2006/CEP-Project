import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./Pages/Home/Home.jsx";
import CareerQuiz from "./Pages/Career-Quiz/CareerQuiz.jsx";
import CareerExploration from "./Pages/Career-Exploration/CareerExploration.jsx";
import Resources from "./Pages/Resources/Resources.jsx";
import AuthForm from "./Pages/AuthLanding/AuthForm.jsx";
import Info from "./Pages/Dashboard/Info.jsx";
import ForgetPassword from "./Pages/AuthLanding/ForgetPassword.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import UpdateProfile from "./Pages/Dashboard/UpdateProfile.jsx"
import Dashboard from "./Pages/Dashboard/Dashboard.jsx"

import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import CreateCareer from "./Pages/Admin/CreateCareer.jsx";
import CreateVideo from "./Pages/Admin/CreateVideo.jsx";

const GoogleAuthWrapper=()=>{
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthForm/>
    </GoogleOAuthProvider>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Redirect root to auth */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* Public Route */}
      <Route path="/auth" element={<GoogleAuthWrapper/>} />
      <Route path="/auth/signupDetails" element={<Info/>}/>
      <Route path="/auth/forgetPassword" element={<ForgetPassword/>}/>

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/app" element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="quiz" element={<CareerQuiz />} />
          <Route path="explore-careers" element={<CareerExploration />} />
          <Route path="resources" element={<Resources />} />
          <Route path="contact" element={<Contact />} />
          <Route path="update-profile" element={<UpdateProfile/>} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="admindashboard" element={<AdminDashboard/>} />
          <Route path="admin/createCareer" element={<CreateCareer/>} />
          <Route path="admin/createVideo" element={<CreateVideo/>} />
          <Route path="admin/career/update/:id/:slug" element={<CreateCareer />} />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer position="top-right" autoClose={3000} theme="dark"/>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
