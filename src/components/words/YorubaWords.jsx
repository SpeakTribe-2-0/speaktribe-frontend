import React, { useEffect, useMemo, useState } from "react";
import water from "../../assets/glass-of-water.png";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

/** Utility */
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/** Yoruba Vocabulary Data */
const VOCAB = [
  { id: "omi", word: "Ọmi", pronunciation: "oh-mee", meaning: "Water", image: water, eg: "Mo fẹ omi.", english: "I want water." },
  { id: "ile", word: "Ilé", pronunciation: "ee-leh", meaning: "House", image: water, eg: "Mo nlọ si ile.", english: "I am going home." },
  { id: "ounje", word: "Ọúnjẹ", pronunciation: "oh-oon-jeh", meaning: "Food", image: water, eg: "Mo fẹ ounjẹ.", english: "I want food." },
  { id: "iwe", word: "Ìwé", pronunciation: "ee-weh", meaning: "Book", image: water, eg: "Mo ka iwe.", english: "I read a book." },
  { id: "eranko", word: "Ẹranko", pronunciation: "eh-ranh-koh", meaning: "Animal", image: water, eg: "Eranko wa ni igbo.", english: "An animal is in the forest." },
];

/** Matching Game Component */
const MatchingExercise = ({ items }) => {
  const total = items.length;

  const baseLeft = useMemo(() => items.map(({ id, word, pronunciation }) => ({ id, text: word, pron: pronunciation })), [items]);
  const baseRight = useMemo(() => items.map(({ id, meaning }) => ({ id, text: meaning })), [items]);

  const [left, setLeft] = useState(() => shuffle(baseLeft));
  const [right, setRight] = useState(() => shuffle(baseRight));
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [done, setDone] = useState(false);
  const [wrongShake, setWrongShake] = useState(null);

  useEffect(() => {
    if (matched.length === total && total > 0) {
      setDone(true);
      toast.success(`🎉 Nice! You matched all ${total} words!`);
    }
  }, [matched.length, total]);

  const reset = () => {
    setLeft(shuffle(baseLeft));
    setRight(shuffle(baseRight));
    setMatched([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setAttempts(0);
    setStreak(0);
    setDone(false);
    setWrongShake(null);
  };

  const handlePairResult = (isCorrect, pairId, leftIndex, rightIndex) => {
    setAttempts((a) => a + 1);

    if (isCorrect) {
      setStreak((s) => {
        const ns = s + 1;
        setBestStreak((b) => Math.max(b, ns));
        return ns;
      });

      const l = left[leftIndex];
      const r = right[rightIndex];
      setMatched((m) => [...m, { id: pairId, leftText: l.text, rightText: r.text }]);

      setLeft((arr) => arr.filter((_, i) => i !== leftIndex));
      setRight((arr) => arr.filter((_, i) => i !== rightIndex));

      setSelectedLeft(null);
      setSelectedRight(null);
      toast.success("✅ Correct Match!");
    } else {
      setStreak(0);
      setWrongShake(pairId);
      toast.error("❌ Wrong match, try again!");

      setTimeout(() => setWrongShake(null), 600);
    }
  };

  const onClickLeft = (idx) => {
    if (done) return;
    if (selectedLeft?.index === idx) {
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft({ index: idx, id: left[idx].id });
  };

  const onClickRight = (idx) => {
    if (done) return;

    if (selectedLeft) {
      const pairId = left[selectedLeft.index].id;
      const isCorrect = pairId === right[idx].id;
      handlePairResult(isCorrect, pairId, selectedLeft.index, idx);
      return;
    }

    if (selectedRight?.index === idx) {
      setSelectedRight(null);
      return;
    }
    setSelectedRight({ index: idx, id: right[idx].id });
  };

  const score = matched.length;
  const progressPct = Math.round((score / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border border-[#9d9d9d33] rounded-xl px-6 py-5 mt-8 flex flex-col gap-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">🎮 Test Your Knowledge</h2>
        <div className="flex gap-2">
          <span className="text-sm bg-[#0096880f] px-3 py-1 rounded">Score: {score}/{total}</span>
          <span className="text-sm bg-[#0096880f] px-3 py-1 rounded">🔥 Streak: {streak}</span>
          <button onClick={reset} className="text-sm px-3 py-1 rounded bg-[#e8f5f5] text-[#009688] hover:bg-[#d4efef]">Reset</button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-[#eef3f3] rounded overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.5 }}
          className="h-2 bg-[#009688] rounded"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Yoruba Words */}
        <div>
          <h3 className="font-semibold mb-2">Yoruba Words</h3>
          <div className="grid gap-3">
            <AnimatePresence>
              {left.map((item, idx) => (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: selectedLeft?.index === idx ? 1.05 : 1,
                  }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => onClickLeft(idx)}
                  className={`px-3 py-2 rounded border text-left w-full ${selectedLeft?.index === idx
                      ? "border-[#009688] bg-[#0096880f]"
                      : "border-gray-300 bg-white"
                    }`}
                >
                  <p className="font-medium">{item.text}</p>
                  <p className="text-xs text-gray-500 italic">{item.pron}</p>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* English Meanings */}
        <div className="">
          <h3 className="font-semibold mb-2">English Meanings</h3>
          <div className="grid gap-3">
            <AnimatePresence>
              {right.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: selectedRight?.index === idx ? 1.05 : 1,
                    ...(wrongShake === item.id ? { x: [-5, 5, -5, 5, 0] } : {})
                  }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => onClickRight(idx)}
                  className={`px-3 py-2 rounded border cursor-pointer w-full ${selectedRight?.index === idx
                      ? "border-[#009688] bg-[#0096880f]"
                      : "border-gray-300 bg-white"
                    } ${wrongShake === item.id ? "border-red-500 bg-red-50" : ""}`}
                >
                  {item.text}
                </motion.div>

              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/** Main Component */
const YorubaWords = () => {
  return (
    <div className="px-6 py-6">
      <p className="font-semibold text-[27px] max-tablet:text-[25px] mb-6">📖 Yoruba Vocabulary</p>

      {/* Vocabulary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-fit mx-auto">
        {VOCAB.map(({ word, pronunciation, meaning, image, eg, english }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-[#88888833] rounded-xl w-[270px] px-4 py-6 shadow-sm"
          >
            <p className="text-[#009688] font-semibold text-lg">{word}</p>
            <p className="text-gray-500 text-sm italic">{pronunciation}</p>
            <p className="font-semibold">{meaning}</p>

            <div className="py-6 flex justify-center">
              <img src={image} alt={word} className="w-[70px]" />
            </div>

            <p className="text-gray-600 text-sm italic">{eg}</p>
            <p className="text-gray-600 text-sm">{english}</p>
          </motion.div>
        ))}
      </div>

      {/* Matching Exercise */}
      <MatchingExercise items={VOCAB} />
    </div>
  );
};

export default YorubaWords;
