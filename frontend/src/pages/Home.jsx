
import Navbar from '../components/Navbar'

const Home = () => {

  return (
    <div className="min-h-screen  bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <Navbar />

      <div className='grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-6 py-16'>
        {/* left side (headline about ExamNotesAi) */}
        <div className="flex flex-col gap-4 items-start justify-center py-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <h1 className="text-3xl  sm:text-4xl md:text-5xl lg:text-6xl font-bold  bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Your AI Study Companion
          </h1>
          <p className=" text-gray-700 max-w-screen-md">
            Generate exam-focused notes, project documentation, flow diagrams and revision-ready content in seconds. Designed for students who want to study smarter, not harder.
          </p>
          <button className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>

        {/* right side (picture) */}
        <div className="hidden md:flex justify-center items-center hover:scale-105 transition-transform duration-300">
          <img
            src="home.png"
            alt="AI Study Companion"
            className="w-full max-w-md h-auto rounded-xl shadow-lg border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
}

export default Home
