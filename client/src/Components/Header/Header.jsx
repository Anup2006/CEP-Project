import { GraduationCap, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/authSlice.js";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logged out successfully");
    await dispatch(logoutUser()).unwrap();
    setIsDropDownOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth", { replace: true });
    }
  }, [token, navigate]);

  const checkProfile = () => {
    navigate("/app/profile");
    setIsDropDownOpen(false);
    setMobileMenuOpen(false);
  };

  // Common function to determine dashboard link
  const dashboardLink = user?.role === "admin" ? "/app/admindashboard" : "/app/dashboard";

  return (
    <header className="sticky top-0 shadow-md z-50">
      <nav className="bg-white flex flex-wrap justify-between items-center h-20 lg:px-6 px-4 mx-auto max-w-screen-3xl">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8" />
          <span className="text-2xl font-semibold">CareerCompass</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-2">
          <li>
            <NavLink
              to="/app/home"
              className={({ isActive }) =>
                `block py-3 px-5 rounded-lg hover:bg-gray-300 ${
                  isActive ? "text-white bg-black" : "text-black bg-white"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={dashboardLink}
              className={({ isActive }) =>
                `block py-3 px-5 rounded-lg hover:bg-gray-300 ${
                  isActive ? "text-white bg-black" : "text-black bg-white"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/quiz"
              className={({ isActive }) =>
                `block py-3 px-5 rounded-lg hover:bg-gray-300 ${
                  isActive ? "text-white bg-black" : "text-black bg-white"
                }`
              }
            >
              Career Quiz
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/explore-careers"
              className={({ isActive }) =>
                `block py-3 px-5 rounded-lg hover:bg-gray-300 ${
                  isActive ? "text-white bg-black" : "text-black bg-white"
                }`
              }
            >
              Explore Careers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/resources"
              className={({ isActive }) =>
                `block py-3 px-5 rounded-lg hover:bg-gray-300 ${
                  isActive ? "text-white bg-black" : "text-black bg-white"
                }`
              }
            >
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/contact"
              className={({ isActive }) =>
                `block py-3 px-5 rounded-lg hover:bg-gray-300 ${
                  isActive ? "text-white bg-black" : "text-black bg-white"
                }`
              }
            >
              Contact Us
            </NavLink>
          </li>

          {/* User Dropdown */}
          <div className="relative">
            <div
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-2xl cursor-pointer"
              onClick={() => setIsDropDownOpen(!isDropDownOpen)}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.fullname?.charAt(0).toUpperCase() || "U"}
                  className="rounded-full w-12 h-12"
                />
              ) : (
                <span>{user?.fullname?.charAt(0).toUpperCase() || "U"}</span>
              )}
            </div>

            {isDropDownOpen && (
              <div className="absolute right-0 flex flex-col bg-black text-white mt-2 rounded-lg shadow-lg border z-50 w-48">
                <div
                  className="flex flex-col py-3 px-5 rounded-lg hover:bg-gray-700 cursor-pointer"
                  onClick={checkProfile}
                >
                  <p className="font-semibold">{user.fullname}</p>
                  <p className="text-sm">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block py-3 px-5 w-full text-left rounded-lg hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden ${mobileMenuOpen ? "block" : "hidden"} bg-black text-white`}
      >
        <ul className="flex flex-col gap-2 p-4">
          <li>
            <NavLink
              to="/app/home"
              className="block py-2 px-4 rounded-lg hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={dashboardLink}
              className="block py-2 px-4 rounded-lg hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/quiz"
              className="block py-2 px-4 rounded-lg hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Career Quiz
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/explore-careers"
              className="block py-2 px-4 rounded-lg hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Careers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/resources"
              className="block py-2 px-4 rounded-lg hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/contact"
              className="block py-2 px-4 rounded-lg hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block py-2 px-4 w-full text-left rounded-lg hover:bg-gray-700"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
