import { useState } from "react";

const TTSButton = ({ text }) => {
  const [audioUrl, setAudioUrl] = useState(null);

  const handleSpeak = async () => {
    const response = await fetch("http://localhost:5000/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, language: "Yoruba" }),
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);

    // Auto play
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div>
      <button onClick={handleSpeak} className="px-4 py-2 bg-green-600 text-white rounded">
        🔊 Hear Pronunciation
      </button>
      {audioUrl && <audio src={audioUrl} controls className="mt-2" />}
    </div>
  );
};

export default TTSButton;
