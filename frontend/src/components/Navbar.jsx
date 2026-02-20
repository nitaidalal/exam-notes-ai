import { useSelector, useDispatch } from "react-redux";
import { selectUser, clearUser } from "../redux/userSlice";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {FaPlusCircle} from 'react-icons/fa';
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";


//  import logout icon 
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const credits = user ? user.credits : 0;
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCreditsDropdownOpen, setIsCreditsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
        setIsCreditsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
          withCredentials: true
        });
        dispatch(clearUser());
        toast.success('Logged out successfully!');
        navigate('/auth');
      } catch (error) {
        console.error('Logout error:', error);
        toast.error('Failed to logout');
      }
    }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
     className="sticky w-full top-0 z-50 bg-white backdrop-blur-lg bg-opacity-90 border-b border-gray-200 shadow-lg">
      <div className="w-full max-w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-14">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo Section */}
          <div
          onClick={() => navigate('/')}
           className="flex  items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden">
              <img
                src="/logo.png"
                alt="ExamNotesAi Logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent  transition-transform duration-300">
                ExamNotesAi
              </h1>
              <p className="text-xs text-gray-500 font-medium hidden sm:block">
                Your AI Study Companion
              </p>
            </div>
          </div>

          {/* Right Section - Credits & Profile */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Credits Badge */}
            <div
              onClick={() => {
                setIsCreditsDropdownOpen(!isCreditsDropdownOpen);
                setIsProfileDropdownOpen(false);
              }}
              className="relative group hidden sm:block "
              title="Your total Credits"
            >
              <div className="relative cursor-pointer bg-gradient-to-r from-blue-50 to-purple-50 hover:bg-emerald-300 px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 border-2 border-transparent bg-clip-padding rounded-full hover:border-emerald-400 transition-all duration-300 shadow-md hover:shadow-lg">
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                  <div className="flex items-center gap-0">
                    <span className="text-lg sm:text-xl md:text-2xl">💎</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-800">
                      {credits}
                    </span>
                  </div>
                  <div>
                    <FaPlusCircle className="text-base sm:text-lg md:text-xl text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative "  ref={dropdownRef} title="Profile">
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  setIsCreditsDropdownOpen(false);
                }}
                className="flex items-center gap-1 sm:gap-2 md:gap-3 p-1 pr-2 sm:pr-3 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300 shadow-md hover:shadow-xl group"
              >
                <div className="relative">
                  <div className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full overflow-hidden border-2 border-white shadow-lg ring-2 ring-gray-200 group-hover:ring-emerald-400 transition-all duration-300">
                    {user?.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {user?.name || "User"}
                  </p>
                </div>
                <svg
                  className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-transform duration-300 ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Credits Dropdown */}
              {isCreditsDropdownOpen && (
                <div className="absolute right-0 sm:right-auto sm:left-0 md:left-auto md:right-20 lg:right-24 mt-3 w-48 sm:w-52 md:w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn">
                  <div className="p-4 flex flex-col gap-2 bg-gradient-to bg-white border-t-4 border-emerald-500 text-gray-800">
                    <p className="text-sm font-semibold">
                      You have{" "}
                      <span className="font-extrabold text-emerald-600">
                        {credits}
                      </span>{" "}
                      credits
                    </p>
                    <p className="text-xs text-gray-600">
                      Use credits to generate AI notes,diagrams & PDFs
                    </p>
                    <button
                      onClick={() => navigate('/pricing')}
                      className="bg-emerald-500 hover:bg-emerald-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer text-white">
                      Buy More Credits
                    </button>
                  </div>
                </div>
              )}

              {/*profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 sm:w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn z-50">
                  <div className="bg-white border-t-4 border-emerald-500 p-4 text-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                        {user?.profilePic ? (
                          <img
                            src={user.profilePic}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-lg">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-600">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="w-full text-left px-4 py-3 cursor-pointer rounded-lg hover:bg-emerald-50 transition-colors duration-200 flex items-center gap-3 group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        👤
                      </span>
                      <span className="text-gray-700 font-medium group-hover:text-emerald-600">
                        Profile
                      </span>
                    </button>

                    <button
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="w-full text-left px-4 py-3 cursor-pointer rounded-lg hover:bg-emerald-50 transition-colors duration-200 flex items-center gap-3 group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        ⚙️
                      </span>
                      <span className="text-gray-700 font-medium group-hover:text-emerald-600">
                        Settings
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        navigate('/pricing');
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors duration-200 flex items-center gap-3 group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        💎
                      </span>
                      <span className="text-gray-700 font-medium group-hover:text-emerald-600">
                        Buy Credits
                      </span>
                    </button>

                    <div className="border-t border-gray-200 my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-lg cursor-pointer hover:bg-red-50 transition-colors duration-200 flex items-center gap-3 group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        <FiLogOut className="text-red-600" />
                      </span>
                      <span className="text-red-600 font-medium group-hover:font-semibold">
                        Logout
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
