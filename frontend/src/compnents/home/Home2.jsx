import React from "react";

const Home2 = () => {
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center py-16 px-6">
      {/* Features Section */}
      <h2 className="text-4xl font-bold text-gray-900 mb-10">Features</h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-12 text-center max-w-5xl">
        {/* Mood Log */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7429/7429687.png"  // Emoji icon for Mood Tracker
            alt="Mood Log"
            className="h-20 w-20 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">Mood Tracker</h3>
          <p className="text-gray-600 mt-2">
            Log your moods and track them over time with an interactive graph, gaining insights into your emotional well-being.
          </p>
        </div>

        {/* AI Therapist */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4494/4494172.png"  // AI related icon
            alt="AI Therapist"
            className="h-20 w-20 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">AI Therapist</h3>
          <p className="text-gray-600 mt-2">
            Engage in meaningful conversations with an AI that understands your emotions and helps you work through challenges in a non-judgmental space.
          </p>
        </div>

        {/* Quiz on Mental Health */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3460/3460312.png"  // Quiz related icon
            alt="Meditation"
            className="h-20 w-20 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">Quiz on Mental Health</h3>
          <p className="text-gray-600 mt-2">
            Test your knowledge on mental health with a quiz that helps you better understand emotional well-being and offers insights into improving your mental health habits.
          </p>
        </div>

        {/* Anonymous Sharing */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3584/3584509.png"  // Anonymous sharing icon
            alt="Resources"
            className="h-20 w-20 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">Anonymous Sharing</h3>
          <p className="text-gray-600 mt-2">
            Share your thoughts and experiences in a safe, anonymous space, where you can connect with others and receive support without fear of judgment or exposure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home2;
