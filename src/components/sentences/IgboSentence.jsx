import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import allSentences from '../../utils/sentence/igboSentence';
import useProgress from '../../hooks/useProgress';

const IgboSentence = () => {
  const language = 'Igbo'; // Hardcode language
  const { saveProgress } = useProgress(language);

  const [quizSentences, setQuizSentences] = useState([]);
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  // simulate fetching
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5s fake loading
  }, []);

  const shuffle = arr => [...arr].sort(() => 0.5 - Math.random());

  const startQuiz = () => {
    const shuffled = shuffle(allSentences).slice(0, 10);

    const preparedQuiz = shuffled.map(q => {
      const wrongOptions = shuffle(allSentences.filter(s => s.translation !== q.translation)).slice(
        0,
        3
      );
      const options = shuffle([q, ...wrongOptions]);
      return { ...q, options };
    });

    setQuizSentences(preparedQuiz);
    setCurrent(0);
    setFeedback('');
    setQuizStarted(true);
  };

  const handleAnswer = option => {
    if (option === quizSentences[current].translation) {
      setFeedback('✅ Correct!');
      setTimeout(() => {
        setFeedback('');
        const next = current + 1;
        if (next === quizSentences.length) {
          saveProgress('Sentences', quizSentences.length, quizSentences.length);
        }
        setCurrent(next);
      }, 800);
    } else {
      setFeedback('❌ Try again!');
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center w-full h-[60vh]'>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className='text-lg font-semibold text-[#009688]'>
          ⏳ Loading Igbo Sentences...
        </motion.p>
      </div>
    );
  }

  return (
    <div className='width mx-auto p-6 space-y-10 '>
      {/* === Study Section === */}
      <div>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='text-3xl font-bold mb-6 text-center pt-24 max-mobile:text-[20px]'>
          📖 Learn Igbo Sentences
        </motion.h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {allSentences.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className='p-4 border-[#9d9d9d33] border rounded-xl bg-white shadow hover:shadow-lg transition'>
              <p className='text-lg font-semibold'>{s.native}</p>
              <p className='text-gray-600 italic'>{s.translation}</p>
              <p className='text-[#009688] font-semibold text-sm mt-1'>🔊 {s.pronunciation}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === Quiz Section === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='p-6 border rounded-2xl shadow-md bg-white'>
        {!quizStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-center space-y-4'>
            <h3 className='text-xl font-semibold'>🎯 Test Your Knowledge</h3>
            <p className='text-gray-600'>Take a 10-question quiz from the sentences above.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-5 py-2 bg-[#009688] text-white rounded-lg hover:bg-[#519992]'
              onClick={startQuiz}>
              Start Quiz
            </motion.button>
          </motion.div>
        ) : current < quizSentences.length ? (
          <motion.div
            key={current} // forces re-animation on each question
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='space-y-4'>
            <div className='w-full bg-gray-200 rounded-full h-2 mb-2'>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((current + 1) / quizSentences.length) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className='bg-[#009688] h-2 rounded-full'
              />
            </div>

            <h3 className='text-lg font-semibold'>
              Question {current + 1} of {quizSentences.length}
            </h3>
            <p className='mb-3 text-gray-700 text-lg'>
              What does <span className='font-bold'>{quizSentences[current].native}</span> mean?
            </p>

            <div className='grid gap-3'>
              {quizSentences[current].options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-4 py-2 rounded-lg border-[#9d9d9d33] border-2 transition ${
                    feedback === '✅ Correct!' &&
                    opt.translation === quizSentences[current].translation
                      ? 'bg-[#009688] text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => handleAnswer(opt.translation)}>
                  {opt.translation}
                </motion.button>
              ))}
            </div>
            {feedback && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='font-medium mt-3'>
                {feedback}
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='text-center space-y-4'>
            <h2 className='text-2xl font-bold text-green-600'>🎉 You completed the quiz!</h2>
            <p className='text-gray-700'>Awesome job! You’ve answered all 10 questions.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-5 py-2 bg-[#009688] text-white rounded-lg hover:bg-green-800'
              onClick={startQuiz}>
              🔄 Restart Quiz
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default IgboSentence;
