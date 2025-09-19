import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
import { FaLeaf, FaWater, FaMountain } from "react-icons/fa";
import Loader from "react-js-loader";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const questions = [
  "How often do you wake up feeling refreshed and well-rested?",
  "How often do you feel little interest or pleasure in doing things?",
  "How often do you feel nervous, anxious, or on edge?",
  "How often do you have trouble relaxing?",
  "How often do you feel irritable or short-tempered?",
  "How often do you feel fatigued or have little energy?",
  "How often do you feel bad about yourself, or that you are a failure or have let yourself or your family down?",
  "How often do you find it hard to finish tasks because of a lack of motivation or focus?",
  "How often do you feel afraid, as if something awful might happen?",
  "How often do you feel disconnected from the people around you or your surroundings?",
  "How often do you feel easily annoyed or irritable?",
"How often do you experience difficulty remembering things or organizing your thoughts?",
"How often do you feel overly worried about small, everyday things?",
"How often do you wake up in the middle of the night and find it hard to go back to sleep?",
"How often do you avoid starting new tasks because they feel too overwhelming?",
]

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const Quiz = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `You are a mental health and wellness assistant. Analyze the following quiz responses and provide insights.\n\n${questions.map((q, i) => `${i + 1}. ${q}: ${answers[i]}`).join("\n")}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = await response.text();

      // Replace *word* with <strong>word</strong>
      text = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

      setResult(text);
    } catch (error) {
      console.error("Error analyzing answers:", error);
      setResult("An error occurred while analyzing the answers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Mental Health Quiz</h1>
          {!loading && !result && (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xl mb-4 text-gray-700">{`${currentQuestion + 1}. ${questions[currentQuestion]}`}</p>
              <div className="space-y-3">
                {options.map((option, optionIndex) => (
                  <motion.button
                    key={optionIndex}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleChange(option)}
                    className={`w-full p-3 text-left rounded-lg  ${
                      answers[currentQuestion] === option
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300"
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 bg-pink-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </motion.button>
                {currentQuestion === questions.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-pink-600 text-white rounded-full"
                  >
                    Submit
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    disabled={!answers[currentQuestion]}
                    className="px-6 py-2 bg-pink-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader type="spinner-cub" bgColor={"#4B0082"} color={"#FFFFFF"} title={"spinner-cub"} size={100} />
            </div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-6 bg-white rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Analysis Result</h2>
              <p className="text-gray-700 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: result }}></p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Quiz;
