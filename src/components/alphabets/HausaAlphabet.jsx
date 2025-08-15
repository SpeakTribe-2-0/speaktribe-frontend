import React, { useState } from 'react';
import { BsFillSpeakerFill } from "react-icons/bs";
import { CiMicrophoneOn } from "react-icons/ci";
import { PiSneakerMoveFill } from "react-icons/pi";
import alphabets from '../../utils/HausaAlphabet ';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HausaAlphabet = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const current = alphabets[selectedIndex];

  return (
    <div className='border-[#9d9d9d33] border-t-2'>
      <div className='flex gap-3 width'>

        {/* Sidebar Alphabet List */}
        <div className="border-[#9d9d9d33] border-r-2 rounded w-[200px] p-5 pr-1 pl-0 flex flex-col gap-5">
          {alphabets.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`cursor-pointer px-5 py-0.5 rounded-[6px] flex items-center gap-2 
                ${selectedIndex === index ? "bg-[#0096872e]" : "bg-transparent"}
              `}
            >
              <PiSneakerMoveFill />
              <p>{item.letter}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className='w-full px-10'>

          {/* Letter */}
          <div>
            <p className='text-7xl font-bold text-center text-[#009688] my-10'>
              {current.letter}
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

          <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />

          {/* Examples */}
          <div className='border-[#9d9d9d33] border-1 rounded-xl px-6 py-5 flex flex-col gap-3'>
            <p className='font-semibold text-[17px]'>Example Words</p>
            {current.examples.map((ex, idx) => (
              <div key={idx} className='flex items-center'>
                <img src={ex.image} alt={ex.word} className='w-[60px]' />
                <div>
                  <p>{ex.word}</p>
                  <p className='text-[#7a7a7a] text-[10px]'>{ex.meaning}</p>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />

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
                        toast.success("🥳🎉 Correct!", { position: "top-center" });
                      } else {
                        toast.error("❌ Try again!", { position: "top-center" });
                      }
                    }}
                    className='w-full rounded-[8px] text-center py-2.5 cursor-pointer text-[#009688] border-2 border-[#009688] hover:bg-[#0096881a]'
                  >
                    {opt}
                  </div>
                ))}
              </div>

              <p
                className='text-[#009688] text-[12px] mt-5 cursor-pointer'
                onClick={() => toast.info("🔄 Reset clicked!", { position: "top-center" })}
              >
                Reset
              </p>
            </div>

            {/* Toastify container */}
            <ToastContainer />
          </div>


          <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />

          {/* Cultural Context */}
          <div className='border-[#9d9d9d33] border-1 rounded-xl px-6 py-5 flex flex-col gap-3'>
            <p className='font-semibold text-[17px] mb-3'>Cultural Context</p>
            <p className='text-[#7a7a7a] text-[12px]'>{current.culturalContext}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HausaAlphabet;
