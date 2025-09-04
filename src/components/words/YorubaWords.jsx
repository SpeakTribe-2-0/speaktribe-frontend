// pages/YorubaWords.js
import { useState, useMemo, useEffect } from 'react';
import MatchingExercise from './MatchingExercise';
import VOCAB from '../../utils/words/yorubaWords';
import { FaBook, FaArrowRight, FaFire } from 'react-icons/fa';
import { GiGamepad } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

const YorubaWords = () => {
  const language = 'Yoruba';
  const [gameStats, setGameStats] = useState({ score: 0, streak: 0, total: 0, reset: () => {} });
  const [resetSignal, setResetSignal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Shuffle and pick 10 random items
  const quizItems = useMemo(() => {
    const shuffled = [...VOCAB].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [resetSignal]);

  const handleReset = () => {
    if (gameStats.reset) gameStats.reset();
    setResetSignal(!resetSignal);
    setCurrentCardIndex(0); // Reset flashcard too
  };

  const handleNext = () => {
    setCurrentCardIndex((prev) => (prev + 1) % VOCAB.length);
  };

  const currentWord = VOCAB[currentCardIndex];

  return (
    <div className="px-6 py-6 gap-9 flex border-t-2 border-[#9d9d9d33] pt-24 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-[300px] flex flex-col justify-between gap-8 border-2 px-5 py-8 border-[#9d9d9d33] rounded-2xl max-tablet:hidden bg-white shadow-sm">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4 text-sm bg-[#0096880f] px-4 py-2 rounded-xl">
            <FaBook color="#009688" size={20} />
            <p className="font-medium text-gray-700">Vocabulary</p>
          </div>
          <div className="flex items-center gap-4 text-sm bg-[#0096880f] px-4 py-2 rounded-xl">
            <GiGamepad color="#009688" size={22} />
            <a href="#matching" className="font-medium text-gray-700">Exercises</a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <span className="text-green-800 text-sm font-semibold flex items-center gap-1">
              ✅ Score: {gameStats.score}/{gameStats.total}
            </span>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
            <span className="text-orange-800 text-sm font-semibold flex items-center gap-1">
              <FaFire /> Streak: {gameStats.streak}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="text-sm px-4 py-2 rounded-lg bg-[#e8f5f5] text-[#009688] font-medium hover:bg-[#d4efef] transition-colors"
          >
            🔄 Reset All
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-14 h-14 border-6 border-[#009688] border-t-transparent rounded-full shadow-lg"
            />
          </div>
        ) : (
          <>
            {/* Flashcard Section */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">📖 Yoruba Vocabulary</h1>
              <p className="text-gray-600">Swipe or click "Next" to explore words</p>
            </div>

            <motion.div
              key={currentWord.word}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mx-auto max-w-2xl overflow-hidden mb-12"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-500">Word {currentCardIndex + 1} of {VOCAB.length}</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentCardIndex + 1) / VOCAB.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#009688] h-2 rounded-full"
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-5xl font-black text-[#009688] mb-2">{currentWord.word}</p>
                <p className="text-lg text-gray-500 italic mb-1">"{currentWord.pronunciation}"</p>
                <p className="text-2xl font-semibold text-gray-700 mb-6">{currentWord.meaning}</p>

                <div className="bg-gray-50 rounded-2xl p-6 mb-6 flex justify-center">
                  <img
                    src={currentWord.image}
                    alt={currentWord.word}
                    className="w-32 h-32 object-contain rounded-xl shadow-sm"
                  />
                </div>

                <p className="text-sm text-gray-600 italic mb-2">Example: {currentWord.eg}</p>
                <p className="text-sm text-gray-600">English: {currentWord.english}</p>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#009688] to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Next Word <FaArrowRight />
                </button>
              </div>
            </motion.div>

            {/* Matching Exercise */}
            <div id="matching" className="mt-10">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🎮 Practice What You've Learned</h2>
              <p className="text-center text-gray-600 mb-8">Match the Yoruba word to its meaning and pronunciation!</p>
              <MatchingExercise
                items={quizItems}
                onGameUpdate={setGameStats}
                resetSignal={resetSignal}
                navigateTo="/yoruba-sentence"
                word={language}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default YorubaWords;