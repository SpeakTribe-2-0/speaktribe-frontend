import React, { useState } from "react";

const HausaSentence = () => {
  const allSentences = [
    { native: "Ina zuwa makaranta", translation: "I am going to school", pronunciation: "Ee-na zoo-wa ma-ka-ran-ta" },
    { native: "Yaya kake?", translation: "How are you?", pronunciation: "Ya-ya ka-ke?" },
    { native: "Nagode", translation: "Thank you", pronunciation: "Na-go-de" },
    { native: "Don Allah ka bani ruwa", translation: "Please give me water", pronunciation: "Don Al-lah ka ba-ni roo-wa" },
    { native: "Ina son ka", translation: "I love you", pronunciation: "Ee-na son ka" },
    { native: "Menene sunanka?", translation: "What is your name?", pronunciation: "Me-ne-ne su-nan-ka?" },
    { native: "Sunana Ali", translation: "My name is Ali", pronunciation: "Su-na-na A-li" },
    { native: "Ina son cin abinci", translation: "I want to eat", pronunciation: "Ee-na son cheen a-bin-chi" },
    { native: "Yayi kyau", translation: "It is good", pronunciation: "Ya-yi kyau" },
    { native: "Ina barci", translation: "I am sleeping", pronunciation: "Ee-na bar-chi" },
    { native: "Don Allah jira", translation: "Please wait", pronunciation: "Don Al-lah jee-ra" },
    { native: "Ina karatu", translation: "I am reading", pronunciation: "Ee-na ka-ra-tu" },
    { native: "Ina kwana", translation: "Good morning", pronunciation: "Ee-na kwa-na" },
    { native: "Barka da yamma", translation: "Good evening", pronunciation: "Bar-ka da yam-ma" },
    { native: "Ina aiki", translation: "I am working", pronunciation: "Ee-na ai-ki" },
    { native: "Don Allah taimaka min", translation: "Please help me", pronunciation: "Don Al-lah tai-ma-ka min" },
    { native: "Ina farin ciki", translation: "I am happy", pronunciation: "Ee-na fa-rin chi-ki" },
    { native: "Ina zaune a Kano", translation: "I live in Kano", pronunciation: "Ee-na zau-ne a Ka-no" },
    { native: "Za ka iya taimaka min?", translation: "Can you help me?", pronunciation: "Za ka i-ya tai-ma-ka min?" },
    { native: "Ina son sayen abinci", translation: "I want to buy food", pronunciation: "Ee-na son sa-yen a-bin-chi" }
  ];

  const [quizSentences, setQuizSentences] = useState([]);
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    const shuffled = [...allSentences].sort(() => 0.5 - Math.random());
    setQuizSentences(shuffled.slice(0, 10));
    setCurrent(0);
    setFeedback("");
    setQuizStarted(true);
  };

  const handleAnswer = (option) => {
    if (option === quizSentences[current].translation) {
      setFeedback("✅ Correct!");
      setTimeout(() => {
        setFeedback("");
        setCurrent((prev) => prev + 1);
      }, 800);
    } else {
      setFeedback("❌ Try again!");
    }
  };

  // Generate answer options safely
  const generateOptions = (currentSentence) => {
    const wrongAnswers = allSentences
      .filter((s) => s.translation !== currentSentence.translation)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const options = [...wrongAnswers, currentSentence];
    return options.sort(() => 0.5 - Math.random());
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      {/* === Study Section === */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">📖 Learn Hausa Sentences</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {allSentences.map((s, i) => (
            <div
              key={i}
              className="p-4 border-[#9d9d9d33] border-1 rounded-xl bg-white shadow hover:shadow-lg transition"
            >
              <p className="text-lg font-semibold">{s.native}</p>
              <p className="text-gray-600 italic">{s.translation}</p>
              <p className="text-[#009688] font-semibold text-sm mt-1">🔊 {s.pronunciation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === Quiz Section === */}
      <div className="p-6 border rounded-2xl shadow-md bg-white">
        {!quizStarted ? (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">🎯 Test Your Knowledge</h3>
            <p className="text-gray-600">Take a 10-question quiz from the sentences above.</p>
            <button
              className="px-5 py-2 bg-[#009688] text-white rounded-lg hover:bg-[#519992]"
              onClick={startQuiz}
            >
              Start Quiz
            </button>
          </div>
        ) : current < quizSentences.length ? (
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-[#009688] h-2 rounded-full"
                style={{ width: `${((current + 1) / quizSentences.length) * 100}%` }}
              ></div>
            </div>

            <h3 className="text-lg font-semibold">
              Question {current + 1} of {quizSentences.length}
            </h3>
            <p className="mb-3 text-gray-700 text-lg">
              What does <span className="font-bold">{quizSentences[current].native}</span> mean?
            </p>

            <div className="grid gap-3">
              {generateOptions(quizSentences[current]).map((opt, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-lg border-[#9d9d9d33] border-2 transition ${
                    feedback === "✅ Correct!" && opt.translation === quizSentences[current].translation
                      ? "bg-[#009688] text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleAnswer(opt.translation)}
                >
                  {opt.translation}
                </button>
              ))}
            </div>
            {feedback && <p className="font-medium mt-3">{feedback}</p>}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">🎉 You completed the quiz!</h2>
            <p className="text-gray-700">Awesome job! You’ve answered all 10 questions correctly.</p>
            <button
              className="px-5 py-2 bg-[#009688] text-white rounded-lg hover:bg-blue-700"
              onClick={startQuiz}
            >
              🔄 Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HausaSentence;
