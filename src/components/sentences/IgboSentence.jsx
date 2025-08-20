import React, { useState, useMemo } from "react";

const IgboSentence = () => {
  const allSentences = [
    { native: "Kedu ka ị mere?", translation: "How are you?", pronunciation: "Ke-du ka ee me-re?" },
    { native: "A na m ekele gị", translation: "I greet you", pronunciation: "A na m e-ke-le gi" },
    { native: "Kedu aha gị?", translation: "What is your name?", pronunciation: "Ke-du a-ha gi?" },
    { native: "Aha m bụ Chinedu", translation: "My name is Chinedu", pronunciation: "A-ha m bu Chi-ne-du" },
    { native: "Ị si ebee?", translation: "Where are you from?", pronunciation: "Ee si e-be-e?" },
    { native: "A bịa m si Enugu", translation: "I am from Enugu", pronunciation: "A bi-a m si E-nu-gu" },
    { native: "Biko nyere m aka", translation: "Please help me", pronunciation: "Bi-ko nye-re m a-ka" },
    { native: "Daalu", translation: "Thank you", pronunciation: "Daa-lu" },
    { native: "Ka ọ dị", translation: "Goodbye", pronunciation: "Ka o di" },
    { native: "Ị ga-esi nri?", translation: "Will you cook?", pronunciation: "Ee ga-e-si nri?" },
    { native: "Ee, aga m esi nri", translation: "Yes, I will cook", pronunciation: "Ee, a-ga m e-si nri" },
    { native: "M na-aga ahịa", translation: "I am going to the market", pronunciation: "M na-a-ga a-hia" },
    { native: "Nne m nọ n'ụlọ", translation: "My mother is at home", pronunciation: "N-ne m no n'u-lo" },
    { native: "anyị ga-ahụ echi", translation: "We will see tomorrow", pronunciation: "A-nye ga-a-hu e-chi" },
    { native: "Nwanne m nwoke", translation: "My brother", pronunciation: "Nwa-nne m nwo-ke" },
    { native: "Nwanne m nwanyị", translation: "My sister", pronunciation: "Nwa-nne m nwa-nye" },
    { native: "anyị hụrụ gị n'anya", translation: "We love you", pronunciation: "A-nye hu-re gi n'a-nya" },
    { native: "Ị ga-abịa?", translation: "Will you come?", pronunciation: "Ee ga-a-bi-a?" },
    { native: "Ee, aga m abịa", translation: "Yes, I will come", pronunciation: "Ee, a-ga m a-bi-a" },
    { native: "Abụghị m aghọta", translation: "I don’t understand", pronunciation: "A-bu-ghi m a-gho-ta" },
  ];

  const [quizSentences, setQuizSentences] = useState([]);
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const startQuiz = () => {
    const shuffled = shuffle(allSentences);
    setQuizSentences(shuffled.slice(0, 10));
    setCurrent(0);
    setFeedback("");
    setQuizStarted(true);
  };

  const handleAnswer = (option) => {
    if (option === quizSentences[current].translation) {
      setFeedback("✅ Correct!");
      setTimeout(() => {
        setFeedback("");
        setCurrent((prev) => prev + 1);
      }, 800);
    } else {
      setFeedback("❌ Try again!");
    }
  };

  // Build stable, unique options for the current question
  const options = useMemo(() => {
    if (!quizStarted || !quizSentences.length) return [];
    const correct = quizSentences[current];

    // Wrong pool: exclude the exact correct item AND any duplicate translations
    const wrongPool = allSentences.filter(
      (s) => s.translation !== correct.translation
    );

    // Pick up to 3 unique wrong translations
    const uniqueWrongTranslations = Array.from(new Set(wrongPool.map((s) => s.translation)))
      .slice(0); // clone

    const wrongChoices = shuffle(uniqueWrongTranslations)
      .slice(0, 3)
      .map((t) => wrongPool.find((s) => s.translation === t));

    // Combine and shuffle
    return shuffle([...wrongChoices, correct]);
  }, [quizStarted, quizSentences, current]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      {/* === Study Section === */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">📖 Learn Igbo Sentences</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {allSentences.map((s, i) => (
            <div
              key={i}
              className="p-4 border-[#9d9d9d33] border-1 rounded-xl bg-white shadow hover:shadow-lg transition"
            >
              <p className="text-lg font-semibold">{s.native}</p>
              <p className="text-gray-600 italic">{s.translation}</p>
              <p className="text-[#009688] font-semibold text-sm mt-1">🔊 {s.pronunciation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === Quiz Section === */}
      <div className="p-6 border rounded-2xl shadow-md bg-white">
        {!quizStarted ? (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">🎯 Test Your Knowledge</h3>
            <p className="text-gray-600">Take a 10-question quiz from the sentences above.</p>
            <button
              className="px-5 py-2 bg-[#009688] text-white rounded-lg hover:bg-purple-700"
              onClick={startQuiz}
            >
              Start Quiz
            </button>
          </div>
        ) : current < quizSentences.length ? (
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-[#009688] h-2 rounded-full"
                style={{ width: `${((current + 1) / quizSentences.length) * 100}%` }}
              ></div>
            </div>

            <h3 className="text-lg font-semibold">
              Question {current + 1} of {quizSentences.length}
            </h3>
            <p className="mb-3 text-gray-700 text-lg">
              What does <span className="font-bold">{quizSentences[current].native}</span> mean?
            </p>

            <div className="grid gap-3">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-lg border-[#9d9d9d33] border-2 transition ${
                    feedback === "✅ Correct!" && opt.translation === quizSentences[current].translation
                      ? "bg-[#009688] text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleAnswer(opt.translation)}
                >
                  {opt.translation}
                </button>
              ))}
            </div>
            {feedback && <p className="font-medium mt-3">{feedback}</p>}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">🎉 You completed the quiz!</h2>
            <p className="text-gray-700">Awesome job! You’ve answered all 10 questions correctly.</p>
            <button
              className="px-5 py-2 bg-[#009688] text-white rounded-lg hover:bg-purple-700"
              onClick={startQuiz}
            >
              🔄 Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IgboSentence;
