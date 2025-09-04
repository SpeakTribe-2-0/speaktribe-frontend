import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, BookOpen, MessageCircle, Trophy, Target, CheckCircle } from 'lucide-react';
import VOCAB from '../../utils/words/yorubaWords';
import useProgress from '../../hooks/useProgress';
import Confetti from 'react-confetti';

const YorubaWords = () => {
  const language = 'Yoruba';
  const { saveProgress, languageProgress, loadAllProgress } = useProgress(language);
  const navigate = useNavigate();

  const wordsPerDay = 5;
  const totalDays = Math.ceil(VOCAB.length / wordsPerDay);

  const [dayIndex, setDayIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [particles, setParticles] = useState([]);

  // Load progress on mount
  useEffect(() => {
    loadAllProgress();
  }, []);

  // Set day index from saved progress
  useEffect(() => {
    if (languageProgress?.Words?.completedDays !== undefined) {
      setDayIndex(languageProgress.Words.completedDays);
    }
  }, [languageProgress]);

  // Get current day's words
  const dailyWords = VOCAB.slice(dayIndex * wordsPerDay, dayIndex * wordsPerDay + wordsPerDay);
  const currentWord = dailyWords[currentCardIndex] || VOCAB[0];

  // Generate quiz when quiz is shown
  useEffect(() => {
    if (showQuiz && !quizQuestions.length) {
      const currentBatch = VOCAB.slice(dayIndex * wordsPerDay, dayIndex * wordsPerDay + wordsPerDay);
      const newQuiz = currentBatch.map((word) => {
        const options = [word.meaning];
        while (options.length < 4) {
          const randomWord = VOCAB[Math.floor(Math.random() * VOCAB.length)];
          if (!options.includes(randomWord.meaning)) {
            options.push(randomWord.meaning);
          }
        }
        return {
          word: word.word,
          pronunciation: word.pronunciation,
          image: word.image,
          correct: word.meaning,
          options: options.sort(() => 0.5 - Math.random()),
        };
      });
      setQuizQuestions(newQuiz);
    }
  }, [showQuiz, dayIndex]);

  // Create celebration particles
  const createParticles = () => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  };

  const playPronunciation = (word, index) => {
    setIsPlaying(index);
    setTimeout(() => setIsPlaying(null), 1000);
    // Implement actual audio playback here
  };

  const handleQuizSelect = (questionIndex, option) => {
    if (submitted) return;
    setQuizAnswers({ ...quizAnswers, [questionIndex]: option });
  };

  const handleQuizSubmit = () => {
    let correctCount = 0;
    quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);

    if (correctCount === quizQuestions.length) {
      setShowCelebration(true);
      createParticles();
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const updateProgress = async (newDayIndex) => {
    await saveProgress("Words", newDayIndex, totalDays);
    window.dispatchEvent(
      new CustomEvent("progressUpdate", {
        detail: { language, section: "Words", completedDays: newDayIndex, totalDays },
      })
    );
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizQuestions([]);
    setSubmitted(false);
    setScore(0);
    setCurrentCardIndex(0);
    setShowCelebration(false);
    setParticles([]);
  };

  const handleNextDay = async () => {
    if (dayIndex === totalDays - 1) {
      await updateProgress(dayIndex + 1);
      navigate("/yoruba-sentence");
    } else {
      const newDay = dayIndex + 1;
      setDayIndex(newDay);
      await updateProgress(newDay);
      resetQuiz();
    }
  };

  const allQuizCorrect = submitted && score === quizQuestions.length;

  return (
    <div className="pt-24 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen relative overflow-hidden">
      {/* Celebration Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, scale: 0, x: `${particle.x}vw`, y: `${particle.y}vh` }}
            animate={{ opacity: 0, scale: 1, y: `${particle.y - 20}vh`, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, delay: particle.delay }}
            className="fixed pointer-events-none text-2xl z-50"
          >
            {['🎉', '⭐', '🌟', '✨', '🎊'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Success Confetti */}
      {showCelebration && <Confetti />}

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl">
          {!showQuiz ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                  <BookOpen className="text-[#009688]" size={40} />
                  Yoruba Words — Day {dayIndex + 1} / {totalDays}
                </h1>
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2 max-w-md mx-auto">
                    <span>Words Progress</span>
                    <span>{Math.round(((dayIndex + 1) / totalDays) * 100)}%</span>
                  </div>
                  <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((dayIndex + 1) / totalDays) * 100}%` }}
                      transition={{ duration: 0.8 }}
                      className="bg-gradient-to-r from-[#009688] to-emerald-500 h-3 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Vocabulary Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCardIndex}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                  transition={{ duration: 0.6, ease: "backOut" }}
                  className="relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-3xl max-w-2xl mx-auto shadow-2xl overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="absolute top-0 left-0 right-0 h-2 "></div>
                  
                  {/* Card Number */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-[#009688] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {currentCardIndex + 1}
                  </div>

                  <div className="p-8">
                    {/* Progress for current day */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Today's Words</span>
                        <span className='text-white'>{currentCardIndex +  1} / {dailyWords.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentCardIndex + 1) / dailyWords.length) * 100}%` }}
                          transition={{ duration: 0.5 }}
                          className="bg-[#009688] h-2 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Word & Pronunciation */}
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <h3 className="text-[#009688] font-bold text-4xl">{currentWord.word}</h3>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => playPronunciation(currentWord.word, currentCardIndex)}
                          className={`p-3 rounded-full transition-all shadow-lg ${
                            isPlaying === currentCardIndex
                              ? 'bg-[#009688] text-white animate-pulse'
                              : 'bg-white text-[#009688] border-2 border-[#009688] hover:bg-[#009688] hover:text-white'
                          }`}
                        >
                          <Volume2 size={20} />
                        </motion.button>
                      </div>
                      <p className="text-gray-500 text-lg italic font-medium bg-gray-100 px-4 py-2 rounded-full inline-block mb-2">
                        {currentWord.pronunciation}
                      </p>
                      <p className="font-semibold text-gray-800 text-2xl">{currentWord.meaning}</p>
                    </div>

                    {/* Image */}
                    <div className="flex justify-center mb-6 bg-gradient-to-br from-[#e0f2f1] to-[#f1f8e9] rounded-2xl p-6">
                      <motion.img
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        src={currentWord.image}
                        alt={currentWord.word}
                        className="w-32 h-32 object-cover rounded-xl shadow-lg"
                      />
                    </div>

                    {/* Examples */}
                    <div className="space-y-4 bg-gray-50 rounded-2xl p-6">
                      <div className="flex items-start gap-3">
                        <MessageCircle className="text-[#009688] mt-1" size={18} />
                        <div>
                          <p className="text-gray-700 font-medium">Example:</p>
                          <p className="text-gray-600 italic">{currentWord.eg}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Target className="text-emerald-500 mt-1" size={18} />
                        <div>
                          <p className="text-gray-700 font-medium">English:</p>
                          <p className="text-gray-600">{currentWord.english}</p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentCardIndex(prev => Math.max(prev - 1, 0))}
                        disabled={currentCardIndex === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                          currentCardIndex === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-[#009688] border-2 border-[#009688] hover:bg-[#009688] hover:text-white shadow-lg hover:shadow-xl'
                        }`}
                      >
                        <ChevronLeft size={20} />
                        Previous
                      </motion.button>

                      {currentCardIndex === dailyWords.length - 1 ? (
                        <motion.button
                          onClick={() => setShowQuiz(true)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-lg"
                        >
                          <Trophy size={24} />
                          Take Quiz Challenge!
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentCardIndex(prev => Math.min(prev + 1, dailyWords.length - 1))}
                          className="flex items-center gap-2 px-6 py-3 bg-[#009688] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:bg-[#00796b]"
                        >
                          Next Word
                          <ChevronRight size={20} />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-3xl p-8 border max-w-4xl mx-auto"
            >
              {/* Quiz Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#009688] to-emerald-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3">
                  <Trophy className="text-[#009688]" size={32} />
                  Day {dayIndex + 1} Quiz Challenge!
                </h2>
                <p className="text-gray-600">Test your knowledge of today's words</p>
              </div>

              {/* Quiz Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Quiz Progress</span>
                  <span>{Object.keys(quizAnswers).length}/{quizQuestions.length} answered</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(Object.keys(quizAnswers).length / quizQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-[#009688] to-emerald-500 h-3 rounded-full"
                  />
                </div>
              </div>

              {/* Quiz Questions */}
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
                      className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
                        isCorrect
                          ? "border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg"
                          : isWrong
                          ? "border-red-400 bg-gradient-to-r from-red-50 to-pink-50 shadow-lg"
                          : isAnswered
                          ? "border-[#009688] bg-gradient-to-r from-teal-50 to-cyan-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-[#009688] hover:shadow-md"
                      }`}
                    >
                      {/* Question Header */}
                      <div className="flex items-center justify-between p-6 pb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg ${
                            isCorrect ? "bg-green-500" : isWrong ? "bg-red-500" : "bg-gradient-to-r from-[#009688] to-emerald-600"
                          }`}>
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-[#009688]">{q.word}</h4>
                            <p className="text-sm text-gray-500 italic">{q.pronunciation}</p>
                          </div>
                        </div>
                        
                        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                          <img src={q.image} alt={q.word} className="w-full h-full object-cover" />
                        </div>
                      </div>

                      {/* Result Icon */}
                      <AnimatePresence>
                        {submitted && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="absolute top-4 right-4"
                          >
                            {isCorrect ? (
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                <CheckCircle className="text-white" size={20} />
                              </div>
                            ) : isWrong ? (
                              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white text-sm">✗</span>
                              </div>
                            ) : null}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Answer Options */}
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 mb-4 font-medium">What does this word mean?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.options.map((opt, idx) => {
                            const isSelected = quizAnswers[i] === opt;
                            const isCorrectOption = submitted && opt === q.correct;
                            const isWrongSelection = submitted && isSelected && opt !== q.correct;

                            return (
                              <motion.label
                                key={idx}
                                whileHover={!submitted ? { scale: 1.02, y: -2 } : {}}
                                whileTap={!submitted ? { scale: 0.98 } : {}}
                                className={`relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 font-medium ${
                                  isCorrectOption
                                    ? "border-green-400 bg-gradient-to-r from-green-100 to-green-50 text-green-800 shadow-md"
                                    : isWrongSelection
                                    ? "border-red-400 bg-gradient-to-r from-red-100 to-red-50 text-red-800 shadow-md"
                                    : isSelected
                                    ? "border-[#009688] bg-gradient-to-r from-teal-100 to-cyan-50 text-teal-800 shadow-sm"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-[#009688] hover:bg-gray-50"
                                } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                              >
                                {/* Custom Radio */}
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                  isSelected
                                    ? isCorrectOption
                                      ? "border-green-500 bg-green-500"
                                      : isWrongSelection
                                      ? "border-red-500 bg-red-500"
                                      : "border-[#009688] bg-[#009688]"
                                    : "border-gray-300"
                                }`}>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-2 h-2 bg-white rounded-full"
                                    />
                                  )}
                                </div>

                                <input
                                  type="radio"
                                  name={`question-${i}`}
                                  value={opt}
                                  checked={isSelected}
                                  onChange={() => handleQuizSelect(i, opt)}
                                  className="sr-only"
                                  disabled={submitted}
                                />

                                <span className="flex-1">{opt}</span>

                                {/* Option Status */}
                                {submitted && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1 * idx }}
                                  >
                                    {isCorrectOption ? (
                                      <span className="text-green-600 text-lg">✅</span>
                                    ) : isWrongSelection ? (
                                      <span className="text-red-600 text-lg">❌</span>
                                    ) : null}
                                  </motion.div>
                                )}
                              </motion.label>
                            );
                          })}
                        </div>

                        {/* Question Feedback */}
                        <AnimatePresence>
                          {submitted && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className={`mt-4 p-4 rounded-xl border-l-4 ${
                                isCorrect
                                  ? "bg-green-50 border-green-400 text-green-800"
                                  : "bg-red-50 border-red-400 text-red-800"
                              }`}
                            >
                              {isCorrect ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl">🎉</span>
                                  <p className="font-semibold">Perfect! You got it right!</p>
                                </div>
                              ) : (
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xl">💪</span>
                                    <p className="font-semibold">Keep learning! You're improving!</p>
                                  </div>
                                  <p className="text-sm">
                                    Correct answer: <span className="font-bold">{q.correct}</span>
                                  </p>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Submit/Results Section */}
              <div className="mt-8 text-center">
                {!submitted ? (
                  <motion.button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-10 py-4 rounded-xl font-bold text-lg transition-all ${
                      Object.keys(quizAnswers).length === quizQuestions.length
                        ? "bg-gradient-to-r from-[#009688] to-emerald-600 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    🚀 Submit Quiz Answers!
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    {/* Score Display */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border">
                      <div className="text-center">
                        <div className="text-6xl mb-4">
                          {allQuizCorrect ? "🏆" : score >= quizQuestions.length / 2 ? "🎉" : "💪"}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-3">
                          Score: {score}/{quizQuestions.length}
                        </h3>
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(score / quizQuestions.length) * 100}%` }}
                            transition={{ duration: 1 }}
                            className={`h-4 rounded-full ${
                              allQuizCorrect ? 'bg-green-500' : 'bg-[#009688]'
                            }`}
                          />
                        </div>
                        <p className="text-gray-600 text-lg">
                          {allQuizCorrect
                            ? "Amazing! You're mastering Yoruba words!"
                            : score >= quizQuestions.length / 2
                            ? "Great progress! You're learning well!"
                            : "Keep practicing! Every attempt makes you stronger!"
                          }
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      {allQuizCorrect ? (
                        <motion.button
                          onClick={handleNextDay}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                          <CheckCircle size={24} />
                          {dayIndex === totalDays - 1 ? "🎊 Complete Words & Go to Sentences!" : "🌟 Unlock Next Day!"}
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={resetQuiz}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                          🔄 Try Again & Master This Day!
                        </motion.button>
                      )}
                    </div>
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

export default YorubaWords;