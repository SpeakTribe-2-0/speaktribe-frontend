import { useState } from "react";

function Demo() {
  const [text, setText] = useState("Ẹ káárọ̀"); // Yoruba: Good morning
  const [audioUrl, setAudioUrl] = useState(null);

  const handleSpeak = async () => {
    try {
      const response = await fetch("http://localhost:5000/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const err = await response.json();
        alert("Error: " + err.error);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      new Audio(url).play(); // Auto play
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" pt-56">
      <h1>SpeakTribe TTS Demo 🎙️</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
      <button
        onClick={handleSpeak}
        style={{ marginLeft: "10px", padding: "8px" }}
      >
        🔊 Speak
      </button>

      {audioUrl && (
        <div style={{ marginTop: "20px" }}>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
}

export default Demo;
