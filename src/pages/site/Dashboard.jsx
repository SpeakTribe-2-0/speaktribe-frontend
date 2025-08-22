import SideBar from '../../components/SideBar'
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [progress, setProgress] = useState({ section: "Alphabet", completed: 0 });

  useEffect(() => {
    const savedProgress = localStorage.getItem("progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  return (
    <div className="  bg-amber-500">
      <SideBar />
    <div className="p-6 bg-green-500">
      {/* Progress Card */}
      <div className="bg-white shadow-md rounded-2xl p-5 mb-6">
        <h2 className="text-lg font-semibold">Your Progress</h2>
        <p className="text-gray-500">Current Section: <span className="font-bold">{progress.section}</span></p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress.completed}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{progress.completed}% Completed</p>
      </div>

      {/* Learning Options (Alphabet, Words, Sentences) */}
      <div className="grid grid-cols-3 gap-4">
        {["Alphabet", "Words", "Sentences"].map((section, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl shadow-md cursor-pointer text-center 
              ${progress.section === section ? "bg-green-100 border border-green-400" : "bg-white"}`}
          >
            <h3 className="font-semibold">{section}</h3>
            {progress.section === section && <p className="text-green-600 text-sm mt-1">Currently Learning</p>}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
