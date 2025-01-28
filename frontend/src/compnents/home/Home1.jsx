import React from "react";

const Home1 = () => {
  return (
    <div className="relative min-h-screen bg-white text-gray-800">
      {/* Navbar */}

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16 lg:py-24">
        {/* Left Side (Logo & Branding) */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative">
            {/* Increase the size of the logo */}
            <img
              src="/images/logo.jpg" // Adjust the path based on your image location
              alt="Brand Logo"
              className="w-60 h-60 object-contain" // Adjusted size
            />
          </div>
        </div>

        {/* Right Side (Main Content) */}
        <div className="text-center md:text-left">
          <h2 className="text-5xl font-bold text-gray-900">Your Healing Guide.</h2>
          <p className="mt-4 text-gray-700 text-lg max-w-xl leading-relaxed">
          Discover a safe space dedicated to your mental and emotional health.
           Our platform offers confidential support through mood tracking, insightful quizzes,
            and a compassionate AI therapist, empowering you to take control of your well-being. 
          Experience holistic self-care in a welcoming community, where your peace of mind matters. 
            
          </p>
          <div className="mt-6">
            <a href="/aboutus" className="text-lg font-semibold text-gray-900 hover:underline">
              About Us →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home1;
