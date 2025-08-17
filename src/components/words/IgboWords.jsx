import { useState } from "react";
import MatchingExercise from "./MatchingExercise";
import water from "../../assets/glass-of-water.png";
import { FaBook } from "react-icons/fa6";
import { GiGamepad } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";



/** Main Component */
const IgboWords = () => {
  const navigate = useNavigate()
  const [gameStats, setGameStats] = useState({ score: 0, streak: 0, total: 0, reset: () => { } });
  const [resetSignal, setResetSignal] = useState(false);


  const VOCAB = [
    {
      id: 1,
      word: "Mmiri",
      pronunciation: "m-mee-ree",
      meaning: "Water",
      image: water,
      eg: "Achọrọ m mmiri.",
      english: "I want water."
    },
    {
      id: 2,
      word: "Ụlọ",
      pronunciation: "oo-loh",
      meaning: "House/Home",
      image: water,
      eg: "Aga m n’ụlọ.",
      english: "I am going home."
    },
    {
      id: 3,
      word: "Nri",
      pronunciation: "n-ree",
      meaning: "Food",
      image: water,
      eg: "Achọrọ m nri.",
      english: "I want food."
    },
    {
      id: 4,
      word: "Akwụkwọ",
      pronunciation: "ah-kwoo-kwo",
      meaning: "Book",
      image: water,
      eg: "A na m agụ akwụkwọ.",
      english: "I am reading a book."
    },
    {
      id: 5,
      word: "Anụmanụ",
      pronunciation: "ah-noo-mah-noo",
      meaning: "Animal",
      image: water,
      eg: "Enwere anụmanụ n’ọhịa.",
      english: "There is an animal in the forest."
    },
    {
      id: 6,
      word: "Enyi",
      pronunciation: "en-yee",
      meaning: "Friend",
      image: water,
      eg: "Enyim dị ebe a.",
      english: "My friend is here."
    },
    {
      id: 7,
      word: "Ụlọakwụkwọ",
      pronunciation: "oo-loh-ah-kwoo-kwo",
      meaning: "School",
      image: water,
      eg: "Aga m n’ụlọakwụkwọ.",
      english: "I am going to school."
    },
  ];



  const handleReset = () => {
    if (gameStats.reset) gameStats.reset(); // call child reset
    setResetSignal(!resetSignal); // toggle signal
  };

  return (
    <div className="px-6 py-6 gap-9 flex border-t-2 border-[#9d9d9d33]">
      {/* Sidebar */}
      <div className=" w-[300px] flex flex-col justify-between gap-10 border-2 px-4 py-10 border-[#9d9d9d33] rounded-xl max-tablet:hidden">
        <div className=" flex flex-col gap-4 ">
          <div className=" flex items-center gap-4 cursor-pointer text-sm bg-[#0096880f] px-3 py-1 rounded">
            <FaBook color="#009688" size={20} />
            <p className="">Vocabulary</p>
          </div>
          <div className=" flex items-center gap-4 cursor-pointer text-sm bg-[#0096880f] px-3 py-1 rounded">
            <GiGamepad color="#009688" size={25} />
            <a href="#matching"><p className="">Exercises</p></a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm bg-[#0096880f] px-3 py-1 rounded">
            Score: {gameStats.score}/{gameStats.total}
          </span>
          <span className="text-sm bg-[#0096880f] px-3 py-1 rounded">
            🔥 Streak: {gameStats.streak}
          </span>
          <button
            onClick={handleReset}
            className="text-sm px-3 py-1 rounded bg-[#e8f5f5] text-[#009688] hover:bg-[#d4efef]"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className=" w-full ">
        <p className="font-semibold text-[27px] max-tablet:text-[25px] mb-6 text-center">📖 Igbo Vocabulary</p>

        {/* Vocabulary Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,2fr))] gap-6 mx-auto place-items-center w-full">
          {VOCAB.map(({ word, pronunciation, meaning, image, eg, english }, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="bg-white border border-[#88888833] rounded-xl w-[270px] px-4 py-6 shadow-sm" >
              <p className="text-[#009688] font-semibold text-lg">
                {word}
              </p>
              <p className="text-gray-500 text-sm italic">
                {pronunciation}</p>
              <p className="font-semibold">
                {meaning}
              </p>
              <div className="py-6 flex justify-center">
                <img src={image} alt={word} className="w-[70px]" />
              </div>
              <p className="text-gray-600 text-sm italic">
                {eg}
              </p>
              <p className="text-gray-600 text-sm">
                {english}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Matching Exercise */}
        <div id="matching">
          <MatchingExercise items={VOCAB} onGameUpdate={setGameStats} resetSignal={resetSignal} />
        </div>
      </div>
    </div>
  );
};


export default IgboWords;
