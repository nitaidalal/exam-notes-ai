import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FiCheckCircle } from "react-icons/fi";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import toast from "react-hot-toast";
import axios from "axios";

const Auth = () => {
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
        withCredentials: true, // Important to include cookies in the request
      });

      const data = await backendResponse.data;

      if (data.success) {
        toast.success(`Welcome ${data.user.name}!`);
        // You can store user data in context/redux or redirect to home
        console.log("User data:", data.user);
        // TODO: Redirect to home page or save user to state
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google");
    }
  }

  return (
    <div className=" min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">

      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" mx-auto mt-6 flex max-w-6xl flex-col gap-6 rounded-3xl border border-white/60 bg-linear-to-r from-gray-800 to-slate-900  p-10 text-center shadow-xl backdrop-blur-lg md:flex-row md:items-center md:justify-between md:text-left"
      >
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
            <span className=" text-blue-600">✨</span>
            AI note-making platform
          </p>
          <h1 className="text-4xl font-semibold text-slate-100 md:text-2xl">
            ExamNotesAi helps you learn twice as fast with AI-crafted insights.
          </h1>
        </div>
      </motion.header>

      <main className=" max-w-7xl mx-auto grid  gap-14 px-6 py-10 grid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-10 shadow-2xl backdrop-blur"
        >
        

          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-green-700">
                Access in under 60 seconds
              </span>
              <h3 className="mt-4 text-3xl font-semibold text-slate-900">
                Sign in to unlock your personalised study hub.
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Connect your Google account to sync across devices, keep notes
                private, and resume right where you left off.
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className=" flex w-full items-center justify-center gap-3 rounded-full px-5 py-3 text-lg font-semibold text-white bg-gray-800 hover:bg-gray-900 active:scale-105  shadow-lg transition  duration-350 cursor-pointer hover:shadow-xl "
            >
              <FcGoogle className="text-2xl" />
              Sign in with Google
            </button>

            <div className="rounded-2xl border border-white/70 bg-white/60 p-4 text-xs text-slate-500">
              <p className="font-medium text-slate-600">What you get:</p>
              <ul className="mt-2 space-y-1">
                <li>• 50 free credits for high-quality exam notes & charts.</li>
                <li>• Smart revision timelines and streak tracking.</li>
                <li>• Export to PDF instantly.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* right content */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-10"
        >
          {features.map((feature, index) => (
            <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
             key={index} className="flex bg-gray-800 rounded-md items-start p-3 shadow-md gap-4">
              <FiCheckCircle className="text-green-500 text-2xl mt-1" />
              <div>
                <h4 className="text-xl font-semibold text-white">
                  {feature.title}
                </h4>
                <p className="mt-1 text-sm text-slate-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Auth;
