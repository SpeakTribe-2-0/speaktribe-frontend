import React, { useState, useEffect } from "react";

const YorubaSentence = () => {
  const allSentences = [
    { native: "Mo n lọ si ile-iwe", translation: "I am going to school", pronunciation: "Mo n lo see ee-le-ee-we" },
    { native: "Bawo ni o se wa?", translation: "How are you?", pronunciation: "Ba-wo ni o se wa?" },
    { native: "O seun", translation: "Thank you", pronunciation: "O she-un" },
    { native: "Jowo fun mi ni omi", translation: "Please give me water", pronunciation: "Jo-wo fun mi ni omi" },
    { native: "Mo feran e", translation: "I love you", pronunciation: "Mo feh-ran eh" },
    { native: "Kini oruko re?", translation: "What is your name?", pronunciation: "Kee-nee oh-roo-koh reh?" },
    { native: "Oruko mi ni Tunde", translation: "My name is Tunde", pronunciation: "Oh-roo-koh mee nee Tunde" },
    { native: "Mo fe jeun", translation: "I want to eat", pronunciation: "Mo feh jeh-oon" },
    { native: "O dara", translation: "It is good", pronunciation: "Oh dah-rah" },
    { native: "Mo n sun", translation: "I am sleeping", pronunciation: "Mo n soon" },
    { native: "Jowo duro", translation: "Please wait", pronunciation: "Jo-wo doo-roh" },
    { native: "Mo n ka iwe", translation: "I am reading a book", pronunciation: "Mo n kah ee-weh" },
    { native: "E ku owuro", translation: "Good morning", pronunciation: "Eh koo oh-woo-roh" },
    { native: "E ku ale", translation: "Good evening", pronunciation: "Eh koo ah-leh" },
    { native: "Mo n ṣiṣẹ", translation: "I am working", pronunciation: "Mo n she-shay" },
    { native: "E jowo, e ran mi lowo", translation: "Please help me", pronunciation: "Eh jo-wo, eh ran mee lo-wo" },
    { native: "O n dun mi", translation: "I am happy", pronunciation: "Oh n doon mee" },
    { native: "Mo n gbe ni Lagos", translation: "I live in Lagos", pronunciation: "Mo n gbeh nee Lagos" },
    { native: "Se o le ran mi lowo?", translation: "Can you help me?", pronunciation: "Sheh oh leh ran mee lo-wo?" },
    { native: "Mo fe ra ounje", translation: "I want to buy food", pronunciation: "Mo feh rah oon-jeh" }
  ];

  const [quizSentences, setQuizSentences] = useState([]);
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  // simulate fetching
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5s fake loading
  }, []);

  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  const startQuiz = () => {
    const shuffled = shuffle(allSentences).slice(0, 10);

    const preparedQuiz = shuffled.map((q) => {
      const wrongOptions = shuffle(allSentences.filter((s) => s.translation !== q.translation)).slice(0, 3);
      const options = shuffle([q, ...wrongOptions]);
      return { ...q, options };
    });

    setQuizSentences(preparedQuiz);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[60vh]">
        <p className="text-lg font-semibold animate-pulse text-[#009688]">
          ⏳ Loading Yoruba Sentences...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      {/* === Study Section === */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">📖 Learn Yoruba Sentences</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {allSentences.map((s, i) => (
            <div
              key={i}
              className="p-4 border-[#9d9d9d33] border rounded-xl bg-white shadow hover:shadow-lg transition"
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
              className="px-5 py-2 bg-[#009688] text-white rounded-lg hover:bg-[#519992]"
              onClick={startQuiz}
            >
              Start Quiz
            </button>
          </div>
        ) : current < quizSentences.length ? (
          <div className="space-y-4">
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
              {quizSentences[current].options.map((opt, idx) => (
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
            <p className="text-gray-700">Awesome job! You’ve answered all 10 questions.</p>
            <button
              className="px-5 py-2 bg-[#009688] text-white rounded-lg hover:bg-blue-700"
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

export default YorubaSentence;
