import React, { useState, useEffect } from "react";
import { BsFillSpeakerFill } from "react-icons/bs";
import alphabets from "../../utils/alphabets/yorubaAlphabet";
import { useNavigate } from "react-router-dom";
import volume from "../../assets/volume.png";
import soundwave from "../../assets/sound.png";
import useProgress from "../../hooks/useProgress";
import { motion, AnimatePresence } from "framer-motion";

const YorubaAlphabet = () => {
  const language = "Yoruba";
  const { saveProgress } = useProgress(language);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dayIndex, setDayIndex] = useState(0); // track which day (5 alphabets)
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const batchSize = 5;
  const totalDays = Math.ceil(alphabets.length / batchSize);

useEffect(() => {
  const savedDayProgress = localStorage.getItem(`progress_Yoruba_Alphabet`);

  if (savedDayProgress) {
    try {
      const parsedProgress = JSON.parse(savedDayProgress);
      setDayIndex(parsedProgress.score); // assuming `score` is a property
    } catch (error) {
      console.error("Failed to parse saved progress", error);
    }
  }
}, []);

  // Slice 5 alphabets for today
  const dailyBatch = alphabets.slice(dayIndex * batchSize, dayIndex * batchSize + batchSize);
  const current = dailyBatch[selectedIndex];

  // Quiz generation (only from today’s 5 letters)
  const quizQuestions = React.useMemo(() => {
    let shuffled = [...dailyBatch].sort(() => 0.5 - Math.random());
    return shuffled.map((q) => {
      const options = [q.pronunciation];
      while (options.length < 4) {
        const rand =
          alphabets[Math.floor(Math.random() * alphabets.length)].pronunciation;
        if (!options.includes(rand)) options.push(rand);
      }
      return {
        letter: q.letter,
        correct: q.pronunciation,
        options: options.sort(() => 0.5 - Math.random()),
      };
    });
  }, [showQuiz, dayIndex]);

  const handleSelect = (qIndex, value) => {
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: value }));
  };

  const handleSubmit = () => setSubmitted(true);

  const allCorrect =
    submitted &&
    quizQuestions.every((q, i) => quizAnswers[i] === q.correct);

  const playAudio = (sound) => {
    const audio = new Audio(sound);
    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <div className="pt-24 bg-[#f9fafb] min-h-screen">
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
                {/* Header */}
                <h1 className="text-3xl font-bold text-[#262626] mb-4">
                  Yoruba Alphabets — Day {dayIndex + 1} / {totalDays}
                </h1>

                {/* Letter */}
                <div
                  onClick={() => playAudio(current.sound)}
                  className="cursor-pointer flex flex-col items-center justify-center my-8"
                >
                  <span className="text-7xl font-extrabold text-[#009688] mb-3">
                    {current.letter}
                  </span>
                </div>

                {/* Pronunciation */}
                <div className="bg-[#e0f2f1] rounded-xl px-6 py-4 flex items-center justify-between gap-3 shadow-sm mb-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-[#009688] p-3">
                      <BsFillSpeakerFill size={20} color="#fff" />
                    </div>
                    <p className="font-semibold text-xl text-[#004d40]">
                      {current.pronunciation}
                    </p>
                  </div>
                  <img
                    onClick={() => playAudio(current.sound)}
                    className="w-10 cursor-pointer"
                    src={isPlaying ? soundwave : volume}
                    alt="play sound"
                  />
                </div>

                {/* Examples */}
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
                        <img
                          src={ex.image}
                          alt={ex.word}
                          className="w-14 rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{ex.word}</p>
                          <p className="text-gray-500 text-sm">{ex.meaning}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Cultural Context */}
                <div className="bg-white border border-[#42424230] rounded-xl px-6 py-5 shadow-sm mb-6">
                  <p className="font-semibold text-lg mb-2">Cultural Context</p>
                  <p className="text-gray-600 text-sm">{current.culturalContext}</p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() =>
                      setSelectedIndex((prev) => Math.max(prev - 1, 0))
                    }
                    disabled={selectedIndex === 0}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      selectedIndex === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#009688] text-white hover:bg-[#00796B]"
                    }`}
                  >
                    Previous
                  </button>

                  {selectedIndex === dailyBatch.length - 1 ? (
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => setShowQuiz(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                      >
                        Take Quiz
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setDayIndex((prev) => prev + 1);
                          setSelectedIndex(0);
                           saveProgress(
                          "Alphabet",
                          dayIndex + 1,
                          totalDays
                        );
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-[#009688] text-white rounded-lg shadow-md hover:bg-[#00796B] transition"
                        disabled={dayIndex === totalDays - 1} // disable continue on last day
                      >
                        {dayIndex === totalDays - 1
                          ? "Completed"
                          : "Continue Learning"}
                      </motion.button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setSelectedIndex((prev) =>
                          Math.min(prev + 1, dailyBatch.length - 1)
                        )
                      }
                      className="px-6 py-2 bg-[#009688] text-white rounded-lg font-semibold hover:bg-[#00796B] transition-all"
                    >
                      Next
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">
                Day {dayIndex + 1} Quiz
              </h2>
              {quizQuestions.map((q, i) => (
                <div
                  key={i}
                  className="mb-4 p-4 border rounded-lg hover:shadow-sm transition"
                >
                  <p className="font-semibold text-lg">Letter: {q.letter}</p>
                  <div className="flex flex-col gap-2 mt-2">
                    {q.options.map((opt, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${
                          quizAnswers[i] === opt
                            ? "bg-[#e0f2f1] border-[#009688]"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${i}`}
                          value={opt}
                          checked={quizAnswers[i] === opt}
                          onChange={() => handleSelect(i, opt)}
                          className="accent-[#009688]"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {submitted && (
                    <p
                      className={`mt-2 text-sm ${
                        quizAnswers[i] === q.correct
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {quizAnswers[i] === q.correct
                        ? "✅ Correct"
                        : `❌ Wrong (Answer: ${q.correct})`}
                    </p>
                  )}
                </div>
              ))}

              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-[#009688] text-white rounded-lg shadow-md hover:bg-[#00796B] transition"
                >
                  Submit Quiz
                </button>
              ) : (
                <div className="mt-4">
                  <p className="text-lg font-bold">
                    You got{" "}
                    {
                      quizQuestions.filter(
                        (q, i) => quizAnswers[i] === q.correct
                      ).length
                    }{" "}
                    / {quizQuestions.length} correct.
                  </p>
                  {allCorrect ? (
                    <button
                      onClick={() => {
                        saveProgress(
                          "Alphabet",
                          dayIndex + 1,
                          totalDays
                        );

                        console.log(dayIndex, totalDays);

                        if (dayIndex === totalDays - 1) {
                          // LAST DAY → redirect to Words section
                          navigate("/yoruba-word");
                        } else {
                          // Not last day → unlock next day
                          setDayIndex((prev) => prev + 1);
                          setShowQuiz(false);
                          setSelectedIndex(0);
                          setQuizAnswers({});
                          setSubmitted(false);
                        }
                      }}
                      className="mt-3 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                    >
                      {dayIndex === totalDays - 1
                        ? "🎉 Congrats! Go to Words"
                        : "🎉 Congrats! Unlock Next Day"}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowQuiz(false);
                        setSubmitted(false);
                        setQuizAnswers({});
                        setSelectedIndex(0);
                      }}
                      className="mt-3 px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700"
                    >
                      Retry Day & Quiz
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

export default YorubaAlphabet;
