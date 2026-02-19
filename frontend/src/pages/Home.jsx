import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, clearUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Home = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Welcome to ExamNotesAi</h1>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 font-semibold"
            >
              Logout
            </button>
          </div>

          {user && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
              <div className="flex items-center gap-4">
                {user.profilePic && (
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                  />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
                  <p className="text-slate-600">{user.email}</p>
                  <div className="mt-3  flex flex-col sm:flex-row gap-4">
                    <div className="bg-white px-4 py-2 rounded-full shadow">
                      <span className="text-sm font-semibold text-emerald-600">
                        Credits: {user.credits}
                      </span>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full shadow">
                      <span className="text-sm font-semibold text-slate-600">
                        Status: {user.isCreditAvailable ? '✅ Active' : '❌ Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          
        </div>
      </div>
    </div>
  )
}

export default Home
