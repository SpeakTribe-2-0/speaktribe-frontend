import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/** Utility */
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const MatchingExercise = ({ items, onGameUpdate, resetSignal, navigateTo, word }) => {
  const navigate = useNavigate();
  const total = items.length;

  // prepare left & right lists
  const baseLeft = useMemo(
    () =>
      items.map(({ id, word, pronunciation }) => ({
        id,
        text: word,
        pron: pronunciation,
      })),
    [items]
  );

  const baseRight = useMemo(
    () =>
      items.map(({ id, meaning }) => ({
        id,
        text: meaning,
      })),
    [items]
  );

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

  // 🚀 send updates to parent
  useEffect(() => {
    if (onGameUpdate) {
      onGameUpdate({
        score: matched.length,
        streak,
        total,
        reset,
      });
    }
  }, [matched.length, streak, total]);

  // reset game
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

  // listen for reset signal from parent
  useEffect(() => {
    if (resetSignal) {
      reset();
    }
  }, [resetSignal]);

  // game completed
  useEffect(() => {
    if (matched.length === total && total > 0) {
      setDone(true);
      toast.success(`🎉 Nice! You matched all ${total} words!`);
    }
  }, [matched.length, total]);

  // handle match result
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
      setMatched((m) => [
        ...m,
        { id: pairId, leftText: l.text, rightText: r.text },
      ]);

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

  // click handlers
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

  // score + progress
  const score = matched.length;
  const progressPct = Math.round((score / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border-2 border-[#9d9d9d33] rounded-xl px-6 py-5 mt-8 flex flex-col gap-4"
    >
      {/* Header + stats */}
      <div className="flex justify-between items-center max-tablet:flex-col max-tablet:gap-3">
        <h2 className="font-semibold text-lg">🎮 Test Your Knowledge</h2>
        <div className="flex gap-2">
          <span className="text-sm bg-[#0096880f] px-3 py-1 rounded">
            Score: {score}/{total}
          </span>
          <span className="text-sm bg-[#0096880f] px-3 py-1 rounded">
            🔥 Streak: {streak}
          </span>
          <span className="text-sm bg-[#0096880f] px-3 py-1 rounded">
            🏆 Best: {bestStreak}
          </span>
          <button
            onClick={reset}
            className="text-sm px-3 py-1 rounded bg-[#e8f5f5] text-[#009688] hover:bg-[#d4efef]"
          >
            Reset
          </button>
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

      {!done ? (
        // Matching grid
        <div className="grid md:grid-cols-2 gap-5">
          {/* Yoruba Words */}
          <div>
            <h3 className="font-semibold mb-2">{word} Words</h3>
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
                    className={`px-3 py-2 rounded border text-left w-full ${
                      selectedLeft?.index === idx
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
          <div>
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
                      ...(wrongShake === item.id
                        ? { x: [-5, 5, -5, 5, 0] }
                        : {}),
                    }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => onClickRight(idx)}
                    className={`px-3 py-2 rounded border cursor-pointer w-full ${
                      selectedRight?.index === idx
                        ? "border-[#009688] bg-[#0096880f]"
                        : "border-gray-300 bg-white"
                    } ${
                      wrongShake === item.id ? "border-red-500 bg-red-50" : ""
                    }`}
                  >
                    {item.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        // ✅ When done show button
        <div className="flex flex-col items-center gap-4 py-6">
          <h3 className="text-xl font-semibold text-[#009688]">
            🎉 You’ve completed the quiz!
          </h3>
          <button
            onClick={() => navigate(navigateTo)}
            className="px-5 py-2 rounded-lg bg-[#009688] text-white hover:bg-[#00796b] transition"
          >
            👉 Go to Sentences
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default MatchingExercise;
