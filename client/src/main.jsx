import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

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
import Contact from "./Pages/Contact/Contact.jsx";

import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import App from "./App.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Redirect root to auth */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* Public Route */}
      <Route path="/auth" element={<AuthForm />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/app" element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="quiz" element={<CareerQuiz />} />
          <Route path="explore-careers" element={<CareerExploration />} />
          <Route path="resources" element={<Resources />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
