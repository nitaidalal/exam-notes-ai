import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FiCheckCircle } from "react-icons/fi";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const features = [
    {
      title: "50 free credit to start",
      description:
        "Start with 50 free credits to generate high-quality notes, charts, and summaries for your exams. No credit card required.",
    },
    {
      title: "Exam notes in seconds",
      description:
        "Auto-generate practice questions, flash cards, and visual mind maps tailored to your class.",
    },
    {
      title: "Charts & Graphs",
      description:
        "Visualize your study materials with interactive charts and graphs that make complex concepts easier to understand and remember.",
    },
  ];

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // Sign in with Firebase
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;
      const profilePic = user.photoURL;

      // Send data to backend
      const backendResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, {
        name,
        email,
        profilePic,
      }, {
        withCredentials: true, 
      });

      const data = await backendResponse.data;

      if (data.success) {
        // Save user to Redux store (which also saves to localStorage)
        dispatch(setUser(data.user));
        toast.success(`Welcome ${data.user.name}!`);
        // Redirect to home page
        navigate('/');
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-teal-200 rounded-full blur-3xl opacity-30"></div>

      {/* HERO */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-16 text-center"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 border border-emerald-500 rounded-full text-xs font-semibold"
        >
          ✨ AI Note-Making Platform
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight"
        >
          Study smarter.
          <span className="text-emerald-600"> Not longer.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Auto-generate structured notes, mind maps, and revision tools in
          seconds. Designed for serious students.
        </motion.p>
      </motion.section>

      {/* MAIN CONTENT */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT CARD */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100"
        >
          <h3 className="text-2xl font-bold text-gray-900">Welcome back 👋</h3>

          <p className="mt-3 text-gray-600 text-sm">
            Sign in with Google to access your personalized AI study hub.
          </p>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="mt-8 w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-pulse">Signing in...</span>
            ) : (
              <>
                <FcGoogle className="text-2xl" />
                Continue with Google
              </>
            )}
          </button>

          <div className="mt-8 text-sm text-gray-500">
            By continuing, you agree to our Terms & Privacy Policy.
          </div>
        </motion.div>

        {/* RIGHT FEATURES */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: index * 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{once:true}}
              className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102"
            >
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <FiCheckCircle className="text-emerald-600 text-xl" />
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-gray-900">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
  
};

export default Auth;
