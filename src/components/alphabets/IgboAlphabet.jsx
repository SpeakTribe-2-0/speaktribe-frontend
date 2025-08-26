import React, { useState } from 'react';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { CiMicrophoneOn } from 'react-icons/ci';
import { PiSneakerMoveFill } from 'react-icons/pi';
import alphabets from '../../utils/alphabets/igboAlphabet ';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import volume from '../../assets/volume.png';
import useProgress from '../../hooks/useProgress';

const IgboAlphabet = () => {
  const language = 'Igbo'; // Hardcode language
  const { saveProgress } = useProgress(language);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const current = alphabets[selectedIndex];

  // Generate 10 random quiz questions
  const quizQuestions = React.useMemo(() => {
    let shuffled = [...alphabets].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10).map(q => {
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
  }, [showQuiz]);

  const handleSelect = (qIndex, value) => {
    setQuizAnswers(prev => ({ ...prev, [qIndex]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const allCorrect = submitted && quizQuestions.every((q, i) => quizAnswers[i] === q.correct);

  const playAudio = () => {
    const audio = new Audio('/src/assets/beep.mp3');
    audio.play();
  };

  //   const playAudio = () => {
  //   const audio = new Audio(`/audio/${current.letter}.mp3`);
  //   audio.play();
  // };

  return (
    <div className='border-[#9d9d9d33] border-t-2'>
      <div className='flex gap-3 width'>
        {/* Sidebar Alphabet List */}
        <div className='border-[#9d9d9d33] border-r-2 rounded w-[200px] p-5 pr-1 pl-0 flex flex-col gap-5'>
          {alphabets.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`cursor-pointer px-5 py-0.5 rounded-[6px] flex items-center gap-2 
                ${selectedIndex === index ? 'bg-[#0096872e]' : 'bg-transparent'}
              `}>
              <PiSneakerMoveFill />
              <p>{item.letter}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className='w-full px-10 max-tablet:px-6 max-mobile:px-0'>
          {/* Letter */}
          <div>
            <p className=' text-4xl font-bold my-4 text-[#262626] max-tablet:text-2xl'>
              Igbo Alphabets
            </p>
            <p
              onClick={playAudio}
              className='cursor-pointer flex w-full justify-center flex-col items-center text-7xl font-bold text-center text-[#009688] my-10 max-tablet:text-4xl'>
              {current.letter}
              <img
                className='w-[30px] hover:w-[33px] transition-all duration-500 ease-in-out'
                src={volume}
                alt='play sound'
              />
            </p>
          </div>

          {/* Pronunciation */}
          <div className='border-[#9d9d9d33] border-1 rounded-xl px-6 py-5 flex flex-col gap-3'>
            <p className='font-semibold text-[17px]'>Pronunciation</p>
            <div className='flex items-center gap-3'>
              <div className='rounded-full bg-[#0096874c] p-3'>
                <BsFillSpeakerFill size={20} color='#009688' />
              </div>
              <p className='font-semibold text-xl'>{current.pronunciation}</p>
            </div>
          </div>

          <hr className='my-8 border-[#9d9d9d33] border-1 rounded-4xl' />

          {/* Examples */}
          <div className='border-[#9d9d9d33] border-1 rounded-xl px-6 py-5 flex flex-col gap-3'>
            <p className='font-semibold text-[17px]'>Example Words</p>
            {current.examples.map((ex, idx) => (
              <div key={idx} className='flex items-center gap-4'>
                <img src={ex.image} alt={ex.word} className='w-[50px]' />
                <div>
                  <p>{ex.word}</p>
                  <p className='text-[#7a7a7a] text-[10px]'>{ex.meaning}</p>
                </div>
              </div>
            ))}
          </div>

          <hr className='my-8 border-[#9d9d9d33] border-1 rounded-4xl' />

          {/* Practice Exercises */}
          <div className='border-[#9d9d9d33] border-1 rounded-xl px-6 py-5 flex flex-col gap-3'>
            <div>
              <p className='font-semibold text-[17px] mb-3'>Practice Exercises</p>
              <div className='flex gap-2 items-center mb-2'>
                <CiMicrophoneOn size={20} color='#009688' />
                <p className='text-[14px]'>Match the Sound</p>
              </div>
              <p className='text-[#7a7a7a] text-[10px]'>
                Listen to the pronunciation and select the correct letter.
              </p>

              {/* Practice Options */}
              <div className='flex gap-5 text-3xl font-semibold mt-4'>
                {current.practiceOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (opt === current.letter) {
                        toast.success('🥳🎉 Correct!', { position: 'top-center' });
                      } else {
                        toast.error('❌ Try again!', { position: 'top-center' });
                      }
                    }}
                    className='w-full rounded-[8px] text-center py-2.5 cursor-pointer text-[#009688] border-2 border-[#009688] hover:bg-[#0096881a]'>
                    {opt}
                  </div>
                ))}
              </div>

              <p
                className='text-[#009688] text-[12px] mt-5 cursor-pointer'
                onClick={() => toast.info('🔄 Reset clicked!', { position: 'top-center' })}>
                Reset
              </p>
            </div>
            <ToastContainer />
          </div>

          <hr className='my-8 border-[#9d9d9d33] border-1 rounded-4xl' />

          {/* Cultural Context */}
          <div className='border-[#9d9d9d33] border-1 rounded-xl px-6 py-5 flex flex-col gap-3'>
            <p className='font-semibold text-[17px] mb-3'>Cultural Context</p>
            <p className='text-[#7a7a7a] text-[12px]'>{current.culturalContext}</p>
          </div>

          {/* Quiz Section */}
          <hr className='my-8 border-[#9d9d9d33] border-1 rounded-4xl' />
          {!showQuiz ? (
            <button
              onClick={() => setShowQuiz(true)}
              className='px-6 py-3 bg-[#009688] text-white rounded-lg shadow-md hover:bg-[#00796B]'>
              Start Quiz
            </button>
          ) : (
            <div className='mt-5'>
              <h2 className='text-xl font-bold mb-4'>Alphabet Pronunciation Quiz</h2>
              {quizQuestions.map((q, i) => (
                <div key={i} className='mb-4 p-4 border rounded-lg'>
                  <p className='font-semibold text-lg'>Letter: {q.letter}</p>
                  <div className='flex gap-3 mt-2'>
                    {q.options.map((opt, idx) => (
                      <label key={idx} className='flex items-center gap-2'>
                        <input
                          type='radio'
                          name={`q-${i}`}
                          value={opt}
                          checked={quizAnswers[i] === opt}
                          onChange={() => handleSelect(i, opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {submitted && (
                    <p
                      className={`mt-2 text-sm ${
                        quizAnswers[i] === q.correct ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {quizAnswers[i] === q.correct
                        ? '✅ Correct'
                        : `❌ Wrong (Answer: ${q.correct})`}
                    </p>
                  )}
                </div>
              ))}

              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700'>
                  Submit Quiz
                </button>
              ) : (
                <div className='mt-4'>
                  <p className='text-lg font-bold'>
                    You got {quizQuestions.filter((q, i) => quizAnswers[i] === q.correct).length} /{' '}
                    {quizQuestions.length} correct.
                  </p>
                  {allCorrect ? (
                    <button
                      onClick={() => {
                        saveProgress('Alphabet', quizQuestions.length, quizQuestions.length);
                        navigate('/igbo-word');
                      }}
                      className='mt-3 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700'>
                      🎉 Congrats! Go to Words
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowQuiz(false);
                        setSubmitted(false);
                        setQuizAnswers({});
                      }}
                      className='mt-3 px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700'>
                      Retry Quiz
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IgboAlphabet;
