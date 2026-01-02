import { GraduationCap, Menu, X } from "lucide-react";
import { useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/authSlice.js";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropDownOpen,setIsDropDownOpen]=useState(false);
  const {user,token} = useSelector(state=>state.auth);
  
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const handleLogout= async ()=>{
    console.log("Logged out successfully");
    await dispatch(logoutUser()).unwrap();
  }
  useEffect(()=>{
    if(!token){
      navigate("/auth",{replace:true})
    }
  },[token,navigate]);

  const checkProfile=async()=>{
    navigate("/app/profile")
    setIsDropDownOpen(false)
  }

  return (
    <header className="sticky top-0 shadow-md z-50">
      <nav className="bg-white lg:block flex h-20 lg:px-6 py-4 mx-auto">
        <div className="flex flex-wrap justify-center lg:justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <div className="flex items-center gap-2" >
            <GraduationCap className="w-8 h-8" />
            <span className="text-2xl font-semibold">CareerCompass</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden justify-between gap-2 items-center w-full lg:flex lg:w-auto ">
            <li>
              <NavLink to="/app/home" className={({isActive})=> 
                `block py-3 pr-5 pl-5 rounded-lg hover:bg-gray-300 ${isActive? "text-white bg-black":"text-black bg-white"}`} >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/app/dashboard" className={({isActive})=> 
                `block py-3 pr-5 pl-5 rounded-lg hover:bg-gray-300 ${isActive? "text-white bg-black":"text-black bg-white"}`} >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/app/quiz" className={({isActive})=> 
                `block py-3 pr-5 pl-5 rounded-lg hover:bg-gray-300 ${isActive? "text-white bg-black":"text-black bg-white"}`} >
                Career Quiz
              </NavLink>
            </li>
            <li>
              <NavLink to="/app/explore-careers" className={({isActive})=> 
                `block py-3 pr-5 pl-5 rounded-lg hover:bg-gray-300 ${isActive? "text-white bg-black":"text-black bg-white"}`} >
                Explore Careers
              </NavLink>
            </li>
            <li>
              <NavLink to="/app/resources" className={({isActive})=> 
                `block py-3 pr-5 pl-5 rounded-lg hover:bg-gray-300 ${isActive? "text-white bg-black":"text-black bg-white"}`} >
                Resources
              </NavLink>
            </li>
            <li>
              <NavLink to="/app/contact" className={({isActive})=> 
                `block py-3 pr-5 pl-5 rounded-lg hover:bg-gray-300 ${isActive? "text-white bg-black":"text-black bg-white"}`} >
                Contact Us
              </NavLink>
            </li>
            
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-2xl cursor-pointer " 
                onClick={()=>setIsDropDownOpen(!isDropDownOpen)}>
                  {user?.avatar? (
                    <img 
                      src={user.avatar} 
                      alt={user?.fullname?.charAt(0).toUpperCase() || "U"} 
                      className="rounded-full w-12 h-12"
                    />
                  ):(
                     <span>{user?.fullname?.charAt(0).toUpperCase() || "U"}</span>
                  )}
              </div>

              {isDropDownOpen && (
                <div className="absolute flex flex-col items-center bg-black text-white mt-2 rounded-lg shadow-lg border z-50"> 
                  <div className="flex flex-col py-3 pr-5 pl-5  w-full rounded-lg hover:bg-gray-300 overflow-hidden">
                    <p>{user.fullname}</p>
                    <p>{user.email}</p>
                  </div>

                  <button onClick={handleLogout} className="block py-3 pr-5 pl-5 w-full rounded-lg hover:bg-gray-300">
                    Logout
                  </button>
                </div>
              )}
            </div>
            {/* <li>
              <NavLink to="/dashboard" className={({isActive})=> 
                `block py-3 pr-5 pl-5 rounded-lg hover:bg-gray-300 ${isActive? "text-white bg-black":"text-black bg-white"}`} >
                Dashboard
              </NavLink>
            </li> */}
          </ul>
          

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden  p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          {/* Mobile Navigation */}
        </div>
        <div className={`${mobileMenuOpen ? "block" : "hidden" }`}>
          <ul className="flex flex-col rounded-lg bg-black text-white gap-2 ">
              <li>
                <NavLink to="/app/home" className="block py-2 px-4 rounded-lg hover:bg-gray-300" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/dashboard" className="block py-2 px-4 rounded-lg hover:bg-gray-300" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/quiz" className="block py-2 px-4 rounded-lg hover:bg-gray-300" onClick={() => setMobileMenuOpen(false)}>
                  Career Quiz
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/explore-careers" className="block py-2 px-4 rounded-lg hover:bg-gray-300" onClick={() => setMobileMenuOpen(false)}>
                  Explore Careers
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/resources" className="block py-2 px-4 rounded-lg hover:bg-gray-300" onClick={() => setMobileMenuOpen(false)}>
                  Resources
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/contact" className="block py-2 px-4 rounded-lg hover:bg-gray-300" onClick={() => setMobileMenuOpen(false)}>
                  Contact Us
                </NavLink>
              </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}