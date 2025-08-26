import { useState, useMemo, useEffect } from 'react';
import MatchingExercise from './MatchingExercise';
import VOCAB from '../../utils/words/hausaWords';
import { FaBook } from 'react-icons/fa6';
import { GiGamepad } from 'react-icons/gi';
import { motion } from 'framer-motion';

/** Main Component */
const HausaWords = () => {
  const language = 'Hausa'; // Hardcode language

  const [gameStats, setGameStats] = useState({ score: 0, streak: 0, total: 0, reset: () => {} });
  const [resetSignal, setResetSignal] = useState(false);

  // ⏳ Fake loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5s delay
    return () => clearTimeout(timer);
  }, []);

  // 🎲 pick 10 random items from VOCAB
  const quizItems = useMemo(() => {
    const shuffled = [...VOCAB].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [resetSignal]);

  const handleReset = () => {
    if (gameStats.reset) gameStats.reset(); // call child reset
    setResetSignal(!resetSignal); // toggle signal to reshuffle
  };

  return (
    <div className='px-6 py-6 gap-9 flex border-t-2 border-[#9d9d9d33]'>
      {/* Sidebar (always visible) */}
      <div className='w-[300px] flex flex-col justify-between gap-10 border-2 px-4 py-10 border-[#9d9d9d33] rounded-xl max-tablet:hidden'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4 cursor-pointer text-sm bg-[#0096880f] px-3 py-1 rounded'>
            <FaBook color='#009688' size={20} />
            <p>Vocabulary</p>
          </div>
          <div className='flex items-center gap-4 cursor-pointer text-sm bg-[#0096880f] px-3 py-1 rounded'>
            <GiGamepad color='#009688' size={25} />
            <a href='#matching'>
              <p>Exercises</p>
            </a>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-sm bg-[#0096880f] px-3 py-1 rounded'>
            Score: {gameStats.score}/{gameStats.total}
          </span>
          <span className='text-sm bg-[#0096880f] px-3 py-1 rounded'>
            🔥 Streak: {gameStats.streak}
          </span>
          <button
            onClick={handleReset}
            className='text-sm px-3 py-1 rounded bg-[#e8f5f5] text-[#009688] hover:bg-[#d4efef]'>
            Reset
          </button>
        </div>
      </div>

      {/* Main content (loading or content) */}
      <div className='w-full'>
        {loading ? (
          <div className='flex items-center justify-center h-[70vh]'>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className='w-12 h-12 border-4 border-[#009688] border-t-transparent rounded-full'
            />
          </div>
        ) : (
          <>
            <p className='font-semibold text-[27px] max-tablet:text-[25px] mb-6 text-center'>
              📖 Hausa Vocabulary
            </p>

            {/* Vocabulary Grid */}
            <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,2fr))] gap-6 mx-auto place-items-center w-full'>
              {VOCAB.map(({ word, pronunciation, meaning, image, eg, english }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className=' border border-[#88888833] rounded-xl w-[270px] h-[300px] bg-white px-4 py-6 shadow-sm'>
                  <p className='text-[#009688] font-semibold text-lg'>{word}</p>
                  <p className='text-gray-500 text-sm italic'>{pronunciation}</p>
                  <p className='font-semibold'>{meaning}</p>
                  <div className='py-6 flex justify-center h-[150px]'>
                    <img src={image} alt={word} className='w-[70px] shadow-2xl rounded' />
                  </div>
                  <p className='text-gray-600 text-sm italic'>{eg}</p>
                  <p className='text-gray-600 text-sm'>{english}</p>
                </motion.div>
              ))}
            </div>

            {/* Matching Exercise */}
            <div id='matching'>
              <MatchingExercise
                items={quizItems}
                onGameUpdate={setGameStats}
                resetSignal={resetSignal}
                navigateTo='/hausa-sentence'
                word={language}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HausaWords;
