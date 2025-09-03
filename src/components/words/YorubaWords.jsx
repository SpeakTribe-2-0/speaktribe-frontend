// pages/YorubaAlphabet.js
import React, { useState, useEffect } from "react";
import { BsFillSpeakerFill } from "react-icons/bs";
import alphabets from "../../utils/alphabets/yorubaAlphabet";
import { useNavigate } from "react-router-dom";
import volume from "../../assets/volume.png";
import soundwave from "../../assets/sound.png";
import useProgress from "../../hooks/useProgress";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const YorubaAlphabet = () => {
  const language = "Yoruba";
  const { saveProgress, languageProgress, loadAllProgress } = useProgress(language);
  const navigate = useNavigate();

  const batchSize = 5;
  const totalDays = Math.ceil(alphabets.length / batchSize);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dayIndex, setDayIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [particles, setParticles] = useState([]);

  // Load progress from Supabase on mount
  useEffect(() => {
    if (languageProgress?.Alphabet?.currentDay !== undefined) {
      setDayIndex(languageProgress.Alphabet.currentDay);
    }
  }, [languageProgress]);

  const dailyBatch = alphabets.slice(dayIndex * batchSize, dayIndex * batchSize + batchSize);
  const current = dailyBatch[selectedIndex];

  // Generate quiz when quiz is shown
  useEffect(() => {
    if (showQuiz && !quizQuestions.length) {
      const newQuiz = dailyBatch.map((q) => {
        const options = [q.pronunciation];
        while (options.length < 4) {
          const rand = alphabets[Math.floor(Math.random() * alphabets.length)].pronunciation;
          if (!options.includes(rand)) options.push(rand);
        }
        return {
          letter: q.letter,
          correct: q.pronunciation,
          options: options.sort(() => 0.5 - Math.random()),
        };
      });
      setQuizQuestions(newQuiz);
    }
  }, [showQuiz, dailyBatch]);

  const createParticles = () => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  };

  const handleSelect = (qIndex, option) => {
    if (submitted) return;
    setQuizAnswers({ ...quizAnswers, [qIndex]: option });
  };

  const handleSubmit = () => {
    let newScore = 0;
    quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) newScore++;
    });
    setScore(newScore);
    setSubmitted(true);

    if (newScore === quizQuestions.length) {
      setShowCelebration(true);
      createParticles();
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const allCorrect = submitted && score === quizQuestions.length;

  const playAudio = (sound) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const audio = new Audio(sound);
    setCurrentAudio(audio);
    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizQuestions([]);
    setSubmitted(false);
    setScore(0);
    setSelectedIndex(0);
    setShowCelebration(false);
    setParticles([]);
  };

  return (
    <div className="pt-24 bg-[#f9fafb] min-h-screen relative overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 1.5, y: `${p.y - 30}vh`, x: `${p.x}vw` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, delay: p.delay }}
            className="fixed pointer-events-none text-2xl z-50"
          >
            {["🎉", "⭐", "✨", "🎊", "🌟"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </AnimatePresence>

      {showCelebration && <Confetti recycle={false} numberOfPieces={300} />}

      <div className="flex justify-center px-4">
        <div className="w-full max-w-2xl">
          {!showQuiz ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-white shadow-lg rounded-2xl p-6"
              >
                <h1 className="text-3xl font-bold text-[#262626] mb-4 text-center">
                  Yoruba Alphabets — Day {dayIndex + 1} / {totalDays}
                </h1>

                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(((dayIndex + 1) / totalDays) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#009688] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((dayIndex + 1) / totalDays) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div
                  onClick={() => playAudio(current.sound)}
                  className="cursor-pointer flex flex-col items-center my-8"
                >
                  <span className="text-7xl font-extrabold text-[#009688]">{current.letter}</span>
                </div>

                <div className="bg-[#e0f2f1] rounded-xl px-6 py-4 flex items-center justify-between shadow-sm mb-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#009688] p-3">
                      <BsFillSpeakerFill size={20} color="#fff" />
                    </div>
                    <p className="font-semibold text-xl text-[#004d40]">{current.pronunciation}</p>
                  </div>
                  <img
                    onClick={() => playAudio(current.sound)}
                    className="w-10 cursor-pointer"
                    src={isPlaying ? soundwave : volume}
                    alt="play sound"
                  />
                </div>

                <div className="bg-white border border-[#42424230] rounded-xl px-6 py-5 shadow-sm mb-6">
                  <p className="font-semibold text-lg mb-3">Example Words</p>
                  <div className="grid gap-4">
                    {current.examples.map((ex, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <img src={ex.image} alt={ex.word} className="w-14 rounded-lg" />
                        <div>
                          <p className="font-medium">{ex.word}</p>
                          <p className="text-gray-500 text-sm">{ex.meaning}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-[#42424230] rounded-xl px-6 py-5 shadow-sm mb-6">
                  <p className="font-semibold text-lg mb-2">Cultural Context</p>
                  <p className="text-gray-600 text-sm">{current.culturalContext}</p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => setSelectedIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={selectedIndex === 0}
                    className={`px-6 py-2 rounded-lg font-semibold ${
                      selectedIndex === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#009688] text-white hover:bg-[#00796B]"
                    }`}
                  >
                    Previous
                  </button>

                  {selectedIndex === dailyBatch.length - 1 ? (
                    <motion.button
                      onClick={() => setShowQuiz(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg font-bold"
                    >
                      🎮 Take Quiz Challenge!
                    </motion.button>
                  ) : (
                    <button
                      onClick={() =>
                        setSelectedIndex((prev) => Math.min(prev + 1, dailyBatch.length - 1))
                      }
                      className="px-6 py-2 bg-[#009688] text-white rounded-lg font-semibold hover:bg-[#00796B]"
                    >
                      Next
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-3xl p-8 border"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#009688] to-emerald-600 bg-clip-text text-transparent">
                  🎮 Day {dayIndex + 1} Quiz Challenge!
                </h2>
                <p className="text-gray-600">Test your knowledge!</p>
              </div>

              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Object.keys(quizAnswers).length}/{quizQuestions.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(Object.keys(quizAnswers).length / quizQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-[#009688] to-emerald-500 h-3 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {quizQuestions.map((q, i) => {
                  const isAnswered = quizAnswers[i] !== undefined;
                  const isCorrect = submitted && quizAnswers[i] === q.correct;
                  const isWrong = submitted && quizAnswers[i] && quizAnswers[i] !== q.correct;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`relative rounded-2xl border-2 ${
                        isCorrect
                          ? "border-green-400 bg-gradient-to-r from-green-50 to-emerald-50"
                          : isWrong
                          ? "border-red-400 bg-gradient-to-r from-red-50 to-pink-50"
                          : isAnswered
                          ? "border-[#009688] bg-gradient-to-r from-teal-50 to-cyan-50"
                          : "border-gray-200 bg-white hover:border-[#009688]"
                      }`}
                    >
                      <div className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        isCorrect ? "bg-green-500" : isWrong ? "bg-red-500" : "bg-gradient-to-r from-[#009688] to-emerald-600"
                      }`}>
                        {i + 1}
                      </div>

                      <AnimatePresence>
                        {submitted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute top-4 right-4"
                          >
                            {isCorrect ? (
                              <span className="text-green-500 text-2xl">✅</span>
                            ) : (
                              <span className="text-red-500 text-2xl">❌</span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="p-6 pt-16">
                        <div className="text-center mb-6">
                          <div className={`inline-block p-6 rounded-2xl text-5xl font-black ${
                            isCorrect 
                              ? "bg-green-500 text-white" 
                              : isWrong 
                              ? "bg-red-500 text-white" 
                              : "bg-gradient-to-r from-[#009688] to-emerald-600 text-white"
                          }`}>
                            {q.letter}
                          </div>
                          <p className="mt-3 text-sm text-gray-600">How do you pronounce this?</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {q.options.map((opt, idx) => {
                            const isSelected = quizAnswers[i] === opt;
                            const isCorrectOption = submitted && opt === q.correct;

                            return (
                              <motion.label
                                key={idx}
                                whileHover={!submitted ? { scale: 1.05 } : {}}
                                whileTap={!submitted ? { scale: 0.95 } : {}}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  isCorrectOption
                                    ? "border-green-400 bg-green-100 text-green-800"
                                    : isSelected && submitted
                                    ? "border-red-400 bg-red-100 text-red-800"
                                    : isSelected
                                    ? "border-[#009688] bg-teal-100"
                                    : "border-gray-200 hover:border-[#009688]"
                                }`}
                              >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  isSelected ? "border-[#009688] bg-[#009688]" : "border-gray-300"
                                }`}>
                                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <input
                                  type="radio"
                                  name={`q-${i}`}
                                  value={opt}
                                  checked={isSelected}
                                  onChange={() => handleSelect(i, opt)}
                                  className="sr-only"
                                  disabled={submitted}
                                />
                                <span>{opt}</span>
                              </motion.label>
                            );
                          })}
                        </div>

                        {submitted && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-4 p-4 rounded-xl ${
                              isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                            }`}
                          >
                            {isCorrect ? (
                              <p>🎉 Perfect! Correct pronunciation!</p>
                            ) : (
                              <p>💡 Correct: <strong>{q.correct}</strong></p>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                {!submitted ? (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 rounded-xl font-bold ${
                      Object.keys(quizAnswers).length === quizQuestions.length
                        ? "bg-gradient-to-r from-[#009688] to-emerald-600 text-white shadow-lg"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    🚀 Submit Answers
                  </motion.button>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <h3 className="text-2xl font-bold mb-2">
                        Score: {score}/{quizQuestions.length}
                      </h3>
                      <p className="text-gray-600">
                        {allCorrect ? "🏆 Perfect! You're amazing!" : "💪 Great effort!"}
                      </p>
                    </div>

                    {allCorrect ? (
                      <motion.button
                        onClick={() => {
                          saveProgress("Alphabet", dayIndex + 1, totalDays);
                          if (dayIndex === totalDays - 1) {
                            navigate("/yoruba-word");
                          } else {
                            setDayIndex(dayIndex + 1);
                            resetQuiz();
                          }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg"
                      >
                        {dayIndex === totalDays - 1 ? "🎊 Go to Words!" : "🌟 Unlock Next Day!"}
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={resetQuiz}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold shadow-lg"
                      >
                        🔄 Try Again
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YorubaAlphabet;