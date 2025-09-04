import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import allSentences from "../../utils/sentence/yorubaSentence";
import useProgress from "../../hooks/useProgress";

const YorubaSentence = () => {
  const language = "Yoruba";
  const { saveProgress } = useProgress(language);

  const [quizSentences, setQuizSentences] = useState([]);
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  const startQuiz = () => {
    const shuffled = shuffle(allSentences).slice(0, 10);
    const preparedQuiz = shuffled.map((q) => {
      const wrongOptions = shuffle(
        allSentences.filter((s) => s.translation !== q.translation)
      ).slice(0, 3);
      const options = shuffle([q, ...wrongOptions]);
      return { ...q, options };
    });
    setQuizSentences(preparedQuiz);
    setCurrent(0);
    setFeedback("");
    setQuizStarted(true);
  };

  const handleAnswer = (option) => {
    if (option === quizSentences[current].translation) {
      setFeedback("✅ Correct!");
      setTimeout(() => {
        setFeedback("");
        const next = current + 1;
        if (next === quizSentences.length) {
          saveProgress("Sentences", quizSentences.length, quizSentences.length);
        }
        setCurrent(next);
      }, 800);
    } else {
      setFeedback("❌ Try again!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#009688]/5 via-white to-[#009688]/10 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto bg-gradient-to-r from-[#009688] to-[#007a6e] rounded-full flex items-center justify-center"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-white text-2xl"
            >
              📚
            </motion.span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xl font-semibold text-[#009688]"
          >
            Loading Yoruba Sentences...
          </motion.p>
          <div className="flex space-x-1 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 bg-[#009688] rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#009688]/5 via-white to-[#009688]/10">
      <div className="max-w-7xl mx-auto p-6 pt-24 space-y-16">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
            <motion.span
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >
              📖
            </motion.span>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#009688] to-[#007a6e] bg-clip-text text-transparent">
              Learn Yoruba Sentences
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Master beautiful Yoruba sentences with interactive learning cards and engaging quizzes. 
            Dive into the rich linguistic heritage of the Yoruba people.
          </p>
        </motion.div>

        {/* Study Cards Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Study Cards</h2>
            <div className="text-sm text-gray-500 bg-white/60 px-3 py-1 rounded-full">
              {allSentences.length} sentences available
            </div>
          </div>

          <div className="relative">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#009688]/5 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#009688]/5 to-transparent z-10 pointer-events-none" />
            
            <div className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
              {allSentences.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  onClick={() => setSelectedCard(selectedCard === i ? null : i)}
                  className="min-w-[300px] sm:min-w-[360px] md:min-w-[420px] snap-center cursor-pointer group"
                >
                  <div className="relative rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#009688] transform translate-x-16 -translate-y-16" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-[#009688] transform -translate-x-12 translate-y-12" />
                    </div>
                    
                    <div className="relative p-8 space-y-6">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#009688] bg-[#009688]/10 px-3 py-1 rounded-full">
                          Sentence #{i + 1}
                        </span>
                        <motion.div
                          animate={{ rotate: selectedCard === i ? 180 : 0 }}
                          className="text-gray-400 group-hover:text-[#009688] transition-colors"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10l5 5 5-5z"/>
                          </svg>
                        </motion.div>
                      </div>

                      {/* Native Text */}
                      <div className="space-y-2">
                        <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                          {s.native}
                        </p>
                        <div className="h-0.5 w-16 bg-gradient-to-r from-[#009688] to-transparent rounded-full" />
                      </div>

                      {/* Translation */}
                      <p className="text-lg text-gray-600 italic leading-relaxed">
                        {s.translation}
                      </p>

                      {/* Pronunciation - Expandable */}
                      <AnimatePresence>
                        {selectedCard === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-gray-100">
                              <div className="flex items-center space-x-3 p-4 bg-[#009688]/5 rounded-2xl">
                                <div className="w-10 h-10 bg-[#009688] rounded-full flex items-center justify-center">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600 font-medium">Pronunciation</p>
                                  <p className="text-[#009688] font-semibold">
                                    {s.pronunciation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quiz Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#009688]/5 to-[#007a6e]/5 rounded-3xl transform rotate-1" />
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {!quizStarted ? (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-center space-y-8"
              >
                {/* Quiz Header */}
                <div className="space-y-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#009688] to-[#007a6e] rounded-full shadow-lg"
                  >
                    <span className="text-3xl text-white">🎯</span>
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Test Your Knowledge
                  </h3>
                  <p className="text-lg text-gray-600 max-w-md mx-auto">
                    Challenge yourself with a 10-question quiz featuring the sentences you've just studied.
                  </p>
                </div>

                {/* Quiz Features */}
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {[
                    { icon: "⚡", title: "Quick Quiz", desc: "10 questions only" },
                    { icon: "🎲", title: "Random Order", desc: "Different each time" },
                    { icon: "📊", title: "Progress Tracking", desc: "Save your results" }
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="text-center p-6 rounded-2xl bg-gray-50/50 hover:bg-[#009688]/5 transition-all duration-300"
                    >
                      <div className="text-3xl mb-3">{feature.icon}</div>
                      <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Start Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#009688] to-[#007a6e] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                  onClick={startQuiz}
                >
                  <span>Start Quiz</span>
                  <motion.svg
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </motion.svg>
                </motion.button>
              </motion.div>
            ) : current < quizSentences.length ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Progress Bar */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Question {current + 1} of {quizSentences.length}
                      </span>
                      <span className="text-sm font-medium text-[#009688]">
                        {Math.round(((current + 1) / quizSentences.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${((current + 1) / quizSentences.length) * 100}%`,
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="bg-gradient-to-r from-[#009688] to-[#007a6e] h-full rounded-full shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="text-center space-y-6">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                      What does this sentence mean?
                    </h3>
                    <div className="inline-block p-6 bg-gradient-to-r from-[#009688]/10 to-[#007a6e]/10 rounded-2xl">
                      <p className="text-2xl md:text-3xl font-bold text-[#009688]">
                        {quizSentences[current].native}
                      </p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid gap-4 max-w-2xl mx-auto">
                    {quizSentences[current].options.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative px-6 py-4 rounded-2xl border-2 transition-all duration-300 font-medium text-left group ${
                          feedback === "✅ Correct!" &&
                          opt.translation === quizSentences[current].translation
                            ? "bg-gradient-to-r from-[#009688] to-[#007a6e] text-white border-[#009688] shadow-lg"
                            : "bg-white hover:bg-gray-50 border-gray-200 hover:border-[#009688]/50 hover:shadow-md"
                        }`}
                        onClick={() => handleAnswer(opt.translation)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            feedback === "✅ Correct!" &&
                            opt.translation === quizSentences[current].translation
                              ? "bg-white/20 text-white"
                              : "bg-gray-100 text-gray-600 group-hover:bg-[#009688]/10 group-hover:text-[#009688]"
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="flex-1">{opt.translation}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Feedback */}
                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center"
                      >
                        <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold text-lg shadow-lg ${
                          feedback.includes("✅") 
                            ? "bg-green-100 text-green-700 border border-green-200" 
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}>
                          <span>{feedback}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-8"
              >
                {/* Success Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-lg"
                >
                  <span className="text-4xl text-white">🎉</span>
                </motion.div>

                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-green-600">
                    Congratulations!
                  </h2>
                  <p className="text-xl text-gray-700 max-w-md mx-auto">
                    You've completed the quiz! Your Yoruba sentence knowledge is growing stronger.
                  </p>
                </div>

                {/* Stats */}
                <div className="inline-flex items-center space-x-8 px-8 py-4 bg-gray-50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#009688]">{quizSentences.length}</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="w-px h-12 bg-gray-300" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#009688]">100%</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </div>

                {/* Restart Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#009688] to-[#007a6e] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                  onClick={startQuiz}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                  </svg>
                  <span>Take Quiz Again</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default YorubaSentence;